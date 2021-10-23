import axios from "axios";
import CONFIG from "../config";
// import { message } from "antd";

// interface RespData {
//   success: boolean;
//   errorCode: number;
//   msg?: string;
//   data?: any;
//   [key: string]: any;
// }


const httpInstance = axios.create({
  timeout: 60000,
  baseURL: CONFIG.http.baseURL,
});

Object.setPrototypeOf(httpInstance, axios);

httpInstance.interceptors.request.use(
  function (config) {
    const method = config.method;
    const data: { [k: string]: any } = {};

    if (method === "post" || method === "put") {
      if (config.data instanceof FormData) {
        for (let key in data) {
          config.data.append(key, data[key]);
        }
      } else {
        config.data = Object.assign(data, config.data);
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// httpInstance.interceptors.response.use(
//   function (res) {
//     const headers = res.config.headers;
//     const data: RespData = res.data;
//     if (data.success && headers.successAlert) {
//       message.success(data.msg ?? "Success");
//     }

//     return res;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

export default httpInstance;
