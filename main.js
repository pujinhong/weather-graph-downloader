const Koa = require("koa");
const app = new Koa();
const router = require("./api");
const sys = require("./config/sys.config.json");
const cors = require('koa2-cors')
 

console.log("启动 《中央气象台卫星云图获取》 后台服务");
console.log("监听端口："+ sys.port);

app.use(cors()) 
// 中间件
app.use(async (ctx, next) => {
  await next();
})

// 路由
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(sys.port);

