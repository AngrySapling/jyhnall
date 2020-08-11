
let url_config = "",socket_config="";

if(process.env.NODE_ENV  ===  'development'){
    // 开发环境
    url_config = 'http://192.168.199.228:8989';
	socket_config = 'ws://192.168.199.228:8989';
	
	url_config = 'http://39.100.100.205:8989';
    socket_config = 'ws://39.100.100.205:8989';
    
    // url_config = 'http://29906e24h1.zicp.vip';
	// socket_config = 'ws://29906e24h1.zicp.vip';
}else{
    // 生产环境
    url_config = 'https://www.easeway.co';
	socket_config = 'wss://www.easeway.co'
}

export default {url_config,socket_config};