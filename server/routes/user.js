const { checkPassword } = require('../service/user')
const { get, post, put, controller } = require('../lib/decorator')

@controller('/api/v0/user')
export class userController {
    @post('/')
    async login(ctx, next) {
        const { email, password } = ctx.query;
        const matchData = await checkPassword(email, password);
        if (!matchData.user) {
            return (ctx.body = {
                success: false,
                err:'用户不存在'
            })
        }
        if (matchData.match) {
            return (ctx.body = {
                success: true
            })
        }

        return (ctx.body={
            success:false,
            err:'密码不正确'
        })
    }
}
