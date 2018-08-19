const koa = require('koa');
const app = new koa();
const views = require('koa-views');
const { resolve } = require('path');
const { connect, initSchemas, initAdmin } = require('./database/init');
const mongoose = require('mongoose');
const router = require('./routes');

; (async () => {
    await connect();

    initSchemas();
    initAdmin();
    //require('./tasks/movie');
    require('./tasks/api');

})();

app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    /* await ctx.render('index', {
        you: 'Luke',
        me: 'Novak'
    }); */
})
app.listen(3000);