/*
 * @Author: your name
 * @Date: 2021-11-30 10:58:56
 * @LastEditTime: 2021-11-30 11:45:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \es-project\fe\index.js
 */
const ENDPOINT = "http://localhost:8001";
function baseRequest(options) {
  const url = options.url || "/";
  return fetch(`${ENDPOINT}${url.startsWith("/") ? url : `/${url}`}`, {
    method: options.method ?? "get",
    credentials:'include',
    headers: Object.assign(
      {
        "Content-type": "application/json",
      },
      options.headers ?? {}
    ),
    body: options.method === "get" ? null : JSON.stringify(options.data),
  })
    .then(resp => resp.json())
    .then(res => {
      if (res.datatus === 401) {
        //TODO login status
        return Promise.reject({ msg: res.msg });
      }
      if (res.status === 200 || res.status === 0) {
        return Promise.resolve(res);
      }

      //   通用 toast 处理
      alert(res.msg ?? "请求失败");
      return Promise.reject({ msg: res.msg ?? "请求失败", data: res.data });
    });
}

const request = ["get", "post"].reduce((req, method) => {
  req[method] = (url, data = {}, options = {}) => {
    return baseRequest(Object.assign({ url, data, method }, options));
  };
  return req;
}, {});


document.getElementById("login").onclick = function () {
 request.post("/api/login", { username: "admin", password: "admin" }).then(res=>{
      document.getElementById('body').innerText = JSON.stringify(res)
    });
};

document.getElementById("request").onclick = function () {
    request.get("/api/json").then(res=>{
         document.getElementById('body').innerText = JSON.stringify(res)
       });
   };
   