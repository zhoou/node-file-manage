const multer = require('koa-multer')
const fs = require('fs')

const destination = './uploads'
// ensure directory exists
fs.existsSync(destination) || fs.mkdirSync(destination)

// 配置
const storage = multer.diskStorage({
  // 文件保存路径
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  }, 
  filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");  
      cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]); 
  }
})

const upload = multer({storage: storage})

module.exports = upload