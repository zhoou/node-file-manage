// module require
const http = require('http')
const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const servePath = require('koa-static')
const morgan = require('koa-morgan')
const rfs = require('rotating-file-stream')
const views = require('koa-views')

// file require
const config = require('./config')
const routers = require('./router')

// 文件夹监听
const fileWatcher = require('./controllers/fileTransform')
fileWatcher.start();

const app = new Koa()

app.use(servePath(path.join(__dirname, 'public')))

const logDirectory = path.join(__dirname, 'logs')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))

app.use(views(__dirname + '/views', {
  map: {
    html: 'ejs'
  }
}));

routers(app)

app.on('error', (err, ctx) => {
  console.error('server error', err);
});

app.listen(config.port)
console.log("Server is listening 3000...")