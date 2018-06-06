const fs = require('fs');
const path = require('path');

class StatsWriterPlugin {
  constructor(opts = {}) {
    this.filename = opts.filename;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const stats = compilation.getStats().toJson();
      var json = JSON.stringify(stats, null, 2);
      const outputDirectory = path.dirname(this.filename);
      try {
        fs.mkdirSync(outputDirectory);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }
      }
      fs.writeFileSync(this.filename, json);
      callback();
    });
  }
}

exports.StatsWriterPlugin = StatsWriterPlugin;
