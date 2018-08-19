const mongoose = require('mongoose');
const db = 'mongodb://localhost/douban-trailer';
const glob = require('glob');
const { resolve } = require('path');

mongoose.Promise = global.Promise;

exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}

exports.initAdmin = async () => {
    const User = mongoose.model('User');
    let user1 = await User.findOne({
        username: 'Novak'
    });
    if (!user1) {
        const user = new User({
            username: 'Novak',
            email: 'novak@a.com',
            password: '123456'
        });
        await user.save();
    }

}

exports.connect = () => {
    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV != 'production') {
            mongoose.set('debug', true);
        }

        mongoose.connect(db);

        mongoose.connection.on('disconnected', () => {
            maxConnectTimes++;
            if (maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                throw new Error('数据库挂了！！')
            }
        })

        mongoose.connection.on('error', err => {
            maxConnectTimes++;
            if (maxConnectTimes < 5) {
                mongoose.connect(db);
            } else {
                throw new Error('数据库挂了！！')
            }
        })

        mongoose.connection.on('open', () => {
            /* const Dog = mongoose.model('Dog', { name: String })
            const dog = new Dog({ name: '阿尔法' })
            dog.save().then(() => {
                console.log('wang')
            }) */

            resolve();
            console.log('mongodb connected successfully!');
        })
    })

}