const fs = require("fs");
const csv = require("csv-parser");
const pool = require("../db");

exports.uploadCSV = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ message: "No file uploaded" });

  let processed = 0, skipped = 0, failed = 0;
  const batchSize = 1000;
  let batch = [];

  const stream = fs.createReadStream(file.path)
    .pipe(csv());

  stream.on("data", (row) => {
    const { name, email, phone, company, tags } = row;


    if (!name || !email || !phone || !company) {
      skipped++;
      return;
    }

    batch.push([name, email, phone, company, tags]);

    if (batch.length >= batchSize) {
      stream.pause();
      insertBatch(batch)
        .then(({ inserted, skippedCount }) => {
          processed += inserted;
          skipped += skippedCount;
          batch = [];
          stream.resume();
        })
        .catch(() => {
          failed += batch.length;
          batch = [];
          stream.resume();
        });
    }
  });

  stream.on("end", async () => {

    if (batch.length > 0) {
      try {
        const { inserted, skippedCount } = await insertBatch(batch);
        processed += inserted;
        skipped += skippedCount;
      } catch (err) {
        failed += batch.length;
      }
    }

    fs.unlinkSync(file.path); 
    res.json({
      total: processed + skipped + failed,
      processed,
      skipped,
      failed,
    });
  });

  stream.on("error", (err) => {
    fs.unlinkSync(file.path);
    res.status(500).json({ message: "Error reading CSV", error: err.message });
  });
};

async function insertBatch(batch) {
  const values = [];
  const params = [];

  batch.forEach((row, index) => {
    const offset = index * 5;
    values.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5})`);
    params.push(...row);
  });

  const query = `
    INSERT INTO customers (name, email, phone, company, tags)
    VALUES ${values.join(", ")}
    ON CONFLICT (email) DO NOTHING
    RETURNING email
  `;

  try {
    const result = await pool.query(query, params);
    const inserted = result.rowCount;
    const skippedCount = batch.length - inserted;

    return { inserted, skippedCount };
  } catch (err) {
    console.error("Batch insert failed", err);
    throw err;
  }
}
