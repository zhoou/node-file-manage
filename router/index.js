const Router = require('koa-router')
const router = new Router();
const fileUploads = require('../controllers/fileUploads')

module.exports = app => {
  router.get('/', async (ctx, next) => {
    await ctx.render('uploadFiles', {
      title: 'hello'
    })
  });

  // 文件上传
  router.post('/uploadFile', fileUploads.single('file'), (ctx, next) => {
    ctx.body = {
      code: 200,
      message: '上传成功！'
    }
  })

  app.use(router.routes()).use(router.allowedMethods()) 
}