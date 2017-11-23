/**
 * 监听temp文件夹，并将temp文件夹下的文件转移到destination文件夹下
 */

const events = require('events');
const util = require('util');
const fs = require('fs');

const watchDir = './src/files/temp'
const processDir = './src/files/destination'

function Watcher (watchDir, processDir) {
  this.watchDir = watchDir;
  this.processDir = processDir;
}

Watcher.prototype.watch = function () {
  var watcher = this;
  fs.readdir(this.watchDir, function (err, files) {
    if (err) throw err;
    for (var index in files) {
      watcher.emit('process', files[index])
    }
  })
}

Watcher.prototype.start = function () {
  console.log("start watching......")
  var watcher = this;
  fs.watchFile(this.watchDir, function() {
    watcher.watch();
  })
}

util.inherits(Watcher, events.EventEmitter); // 相当于 Watcher.prototype = new events.EventEmitter();

const watcher = new Watcher(watchDir, processDir);

watcher.on('process', function process(file) {
  let watchFile = this.watchDir + '/' + file;
  let processFile = this.processDir + '/' + Date.parse(new Date()) + '-' + file.toLowerCase();

  fs.rename(watchFile, processFile, function (err) {
    if (err) throw err;
  })
})

watcher.start();