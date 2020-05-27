import config from './config.js';
let url_config = config.url_config
import request from './server.js';

const api = {}

// 提醒设置信息
const feedbackLogin = `${url_config}/feedBack/feedbackLogin`;
api.feedbackLogin = params => request({url:feedbackLogin,method:'POST'}, params);

// 提醒修改
const remidSet = `${url_config}/app/updateRemindByNumber`;
api.remidSet = params => request({url:remidSet,method:'POST'}, params);

//获取问题类型
const problemType = `${url_config}/feedBack/problemType`;
api.problemType = params => request({url:problemType,method:'POST'}, params);

//查询问题反馈列表
const backMessage = `${url_config}/feedBack/backMessage`;
api.backMessage = params => request({url:backMessage,method:'POST'}, params);

//提交
const customerBack = `${url_config}/feedBack/customerBack`;
api.customerBack = params => request({url:customerBack,method:'POST'}, params);

//问题反馈回复信息
const chatRecord = `${url_config}/feedBack/chatRecord`;
api.chatRecord = params => request({url:chatRecord,method:'POST'}, params);

//问题反馈详情
const customerFeedBackDetails = `${url_config}/feedBack/customerFeedBackDetails`;
api.customerFeedBackDetails = params => request({url:customerFeedBackDetails,method:'POST'}, params);

//回复
const serviceBack = `${url_config}/feedBack/serviceBack`;
api.serviceBack = params => request({url:serviceBack,method:'POST'}, params);

//已解决
const serviceResolved = `${url_config}/feedBack/serviceResolved`;
api.serviceResolved = params => request({url:serviceResolved,method:'POST'}, params);








export default api;