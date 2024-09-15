const myRequest = require("request");
const fs = require('fs');  
const axios = require('axios'); 

//增加浏览器标识
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36",
};

const request = (url) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: url,
      encoding: null,
      headers: headers,
    };
    myRequest(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        //throw new Error(response.statusText)
        reject("error===");
      }
    });
  });
};

const makeDir = (dir) =>{
    if(!fs.existsSync(dir)){
      fs.mkdir(dir,err =>{
        console.log(err);
      })
    }
}



const downloadImg = (url, dir, index) => {

  axios.get(url, {
      // 设置返回的类型是二进制
      responseType:'arraybuffer',
  }).then(res =>{
      // 下载当前图片文件到文件夹中
      fs.writeFile(`${dir}/${index}.png`, res.data, 'binary', (err)=>{
          if(err){
              console.log(`${index} error`,err);
          }else{
              console.log(`${index} finish`); 
          }
      })
      
  })
}

module.exports = {
  request,
  downloadImg,
  makeDir
};
