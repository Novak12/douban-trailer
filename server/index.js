const koa = require('koa');
const app = new koa();
const { htmlTpl, ejsTpl } = require('./tpl')
const ejs = require('ejs');

app.use((ctx, next) => {
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = ejs.render(ejsTpl, {
        you: 'Luke',
        me: 'Novak'
    });
})
app.listen(3000);