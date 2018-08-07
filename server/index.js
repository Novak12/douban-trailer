const koa = require('koa');
const app = new koa();
const views = require('koa-views');
const { resolve } = require('path');
const { connect } = require('./database/init');

; (async () => {
    await connect();
})();

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'Luke',
        me: 'Novak'
    });
})
app.listen(3000);