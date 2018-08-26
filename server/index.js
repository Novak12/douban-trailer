const koa = require('koa');
const app = new koa();
const { resolve } = require('path');
const { connect, initSchemas, initAdmin } = require('./database/init');
const R = require('ramda');

const Bundler = require('parcel-bundler');
const views = require('koa-views');
const serve = require('koa-static');


const MIDDLEWARES = ['router'];

const useMiddleWares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        ))(MIDDLEWARES)
}
const r = path => resolve(__dirname, path);

const bundler = new Bundler(r('../src/index.html'), {
    publicUrl: '/',
    watch: true
});

; (async () => {
    await connect();

    initSchemas();
    initAdmin();
    //require('./tasks/movie');
    //require('./tasks/api');   
    //require('./tasks/trailer'); 
    require('./tasks/qiniu'); 
    /* await bundler.bundle();
    app.use(serve(r('../dist')));
    app.use(views(r('../dist')), {
        extension: 'html'
    }); */

    //await useMiddleWares(app);

    app.listen(4000);
})();



