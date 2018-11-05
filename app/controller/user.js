exports.hello = async function (ctx,next) {
	// let allUsers = await User.find()
	// await ctx.render('layout',{
	// 	// users: allUsers
	// })
  ctx.body = '网页成功部署'
}