const koa = require('koa');
const app = new koa();
const { resolve } = require('path');
const { connect, initSchemas, initAdmin } = require('./database/init');
const R = require('ramda');
const MIDDLEWARES = ['router']


    ; (async () => {
        await connect();

        initSchemas();
        initAdmin();
        //require('./tasks/movie');
        //require('./tasks/api');
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

        await useMiddleWares(app);
    })();



app.listen(3000);