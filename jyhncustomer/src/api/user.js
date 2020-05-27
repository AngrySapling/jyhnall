import config from './config.js';
let url_config = config.url_config
import request from './server.js';

const api = {}

// 用户登录
const feedbackLogin = `${url_config}/feedBack/feedbackLogin`;
api.feedbackLogin = params => request({url:feedbackLogin,method:'POST'}, params);

//用户注册注册
const register = `${url_config}/feedBack/register`;
api.register = params => request({url:register,method:'POST'}, params);

//验证码请求
const getPhoneCode = `${url_config}/app/getPhoneCode`;
api.getPhoneCode = params => request({url:getPhoneCode,method:'POST'}, params);

//忘记密码
const forgetPassword = `${url_config}/feedBack/forgetPassword`;
api.forgetPassword = params => request({url:forgetPassword,method:'POST'}, params);

//个人信息
const personMessage = `${url_config}/feedBack/personMessage`;
api.personMessage = params => request({url:personMessage,method:'POST'}, params);

//修改密码
const changePassword = `${url_config}/feedBack/changePassword`;
api.changePassword = params => request({url:changePassword,method:'POST'}, params);

export default api;