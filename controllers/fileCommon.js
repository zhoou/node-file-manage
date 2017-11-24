const fs = require('fs')

const fileUtil = {
  // ensure directory exists
  isFolderExistAndCreate: function (path) {
    if (!path || path.length === '') return;
    fs.existsSync(path) || fs.mkdirSync(path)
  }
}

module.exports = fileUtil;