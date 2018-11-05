const Koa = require('koa2');
const app = new Koa();
const router = require('./routes')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const views = require('koa-views')
const helmet = require("koa-helmet")
const http = require("http")


let {
	STATIC_PATH
} = process.env
app.use(
	views(path.join(__dirname, './resource/views'), {
  		extension: 'ejs'
	})
)

app.use(helmet())

// 解析参数
app.use(bodyParser()) 

app.use(static(path.join( __dirname,  STATIC_PATH)))

app.use(router.routes(),router.allowedMethods())

const server = http.createServer(app.callback());
const io = require('socket.io')(server)
io.on('connection', function (socket) {
  socket.on('write', function (data) {
    // socket.emit('read', { data })
    io.sockets.emit('read', { data })
  });
})
server.listen(3000, function(){
  console.log('listening on *:3000');
})
module.exports = app