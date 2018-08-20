const koa = require('koa');
const app = new koa();
const { resolve } = require('path');
const serve=require('koa-static');

app.use(serve(resolve(__dirname,'./')));

app.listen(4000);