const koa = require('koa');
const app = new koa();
const { normal } = require('./tpl')

app.use((ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = normal;
})
app.listen(3000);