import config from './config.js';
let url_config = config.url_config
import request from './server.js';

const api = {}

// 订单状态
const customerOrderStatus = `${url_config}/feedBack/customerOrderStatus`;
api.customerOrderStatus = params => request({url:customerOrderStatus,method:'POST'}, params);












export default api;