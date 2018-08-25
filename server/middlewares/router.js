const { Route } = require('../lib/decorator');
const { resolve } = require('path');

export const router = async app => {
    const apiPath = resolve(__dirname, '../routes');
    console.log('router')
    const router = new Route(app, apiPath);
    router.init();
}