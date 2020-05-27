//带Token请求
import axios from 'axios';
import {getToken} from '@/utils/storage.js'
import iview from 'view-design';
import router from '@/router'
const httpRequest = (opts,data) => {
    let token = getToken();
    // console.log(token,'token')
	let headers = {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json; charset=UTF-8'
	}
	if(token){
        axios.defaults.headers.common['Token'] = token
    }
    let httpDefaultOpts = {
        url: opts.url,
        data: data,
        method: opts.method,
        headers: opts.method == 'GET'?{
			'Token': token,
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		}:headers,
		dataType: 'json',
    }
    
    let promise = new Promise(function(resolve, reject) {
        // console.log(headers,'header',httpDefaultOpts)
        axios.request(httpDefaultOpts).then(
            (res) => {
                let result = res.data
				if(result && result.errCode !== 1){
                    switch (result.errCode){
                        case 1:	
                            break;
                        case 401:
                            router.push("/login")
                            return;
                        default:
                            iview.Notice.error({
                                title:result.errCode ,
                                desc: result.errMsg,
                                duration:2
                            });
                            break;
                    }
				}
				resolve(result)
            },err=>{
				// console.log(err,'err')
			}
        )
	})
    return promise
}
export default httpRequest