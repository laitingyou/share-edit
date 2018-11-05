var home = require('koa-router')()
var user = require('../app/controller/user')


home.get('/', user.hello)
home.get('*', function(ctx){
	ctx.body = '无匹配路由'
})
module.exports = home