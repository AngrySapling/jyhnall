//带Token请求
import Vue from 'vue'
import axios from 'axios';
import {getToken} from '@/utils/storage.js'
import iview from 'view-design';
import {removeToken,removeUser} from '@/utils/storage'
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
                        case 100051:
                        case 401:
                            removeToken()
                            removeUser()
                            router.push("/login")
                            return;
                        default:
                            let locale = window.localStorage.getItem('user_lang') == null ? "cn" : window.localStorage.getItem('user_lang')    // 语言标识
                            let i18n = Vue.prototype._i18n.messages[locale]
                            let errMsg0 = i18n.errMsg0
                            errMsg0.forEach(res=>{
                                if(res.code === result.errCode){
                                    console.log(res)
                                    iview.Notice.error({
                                        title:result.errCode ,
                                        desc: res.errMsg,
                                        duration:2
                                    });
                                }
                                
                            })
                            
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