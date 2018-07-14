const koa = require('koa');
const app=new koa();

app.use((ctx,next)=>{
    ctx.body='电影首页';
})
app.listen(3000);