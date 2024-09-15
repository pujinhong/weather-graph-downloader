const Router = require("koa-router");
const util = require("./util");
const fs = require('fs');  
const axios = require('axios');  


const myCheerio = require('cheerio');


const myURL = 'http://www.nmc.cn/publish/satellite/FY4A-true-color.htm'
const rootDir = "./"


const router = new Router(); 


router
.get("/", function (ctx, next) {
  ctx.body = "./index.html";
}) 


.get( "/start", async function (ctx, next) {
  try {
    console.log(ctx.request.url,"拉取近期云图地址",new Date());
    let html = await util.request(myURL);  
    let $ = myCheerio.load(html, { decodeEntities: false });
    let lst =[];
    $('#timeWrap').children().each((index,element)=>{
      let imgInfo = $(element).data()
      imgInfo.img = imgInfo.img.replace("/medium/","/")
      lst.push(imgInfo);
    });

    try {
      // 保存图片
      let dir = rootDir+"/img"
      util.makeDir(dir)
      lst.forEach(item=>{
        let fileName = item.img.substring(item.img.indexOf("/WXBL/")+6,item.img.indexOf(".JPG"))
        util.downloadImg( item.img,dir, fileName)
      })

    } catch (error) {
      
    }


    ctx.body = lst; 

  } catch (err) {
    ctx.body = err; 
  }
}) 


module.exports = router;
