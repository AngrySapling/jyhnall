import Cookies from 'js-cookie'

export function setToken(value){
    Cookies.set('token', value, { expires: 7 });
}

export function getToken(){
    return Cookies.get('token');
}

export function removeToken(){
    Cookies.remove('token');
}
