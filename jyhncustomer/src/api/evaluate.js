import config from './config.js';
let url_config = config.url_config
import request from './server.js';

const api = {}

// 用户评价提交
const saveCustomerScore = `${url_config}/feedBack/saveCustomerScore`;
api.saveCustomerScore = params => request({url:saveCustomerScore,method:'POST'}, params);

//用户评价
const customerScoreList = `${url_config}/feedBack/customerScoreList`;
api.customerScoreList = params => request({url:customerScoreList,method:'POST'}, params);

//追加评价
const additionalEvaluation = `${url_config}/feedBack/additionalEvaluation`;
api.additionalEvaluation = params => request({url:additionalEvaluation,method:'POST'}, params);

export default api;