const fs = require('fs');

async function ensureMigrationFile(rc) {
  let stat = fs.promises.stat(rc);
  try {
    await stat;
  } catch {
    await fs.promises.writeFile(rc, EMPTY_RC);
  }
}

exports.ensureMigrationFile = ensureMigrationFile;
