import Cookies from 'js-cookie'

export function setToken(value){
    Cookies.set('token', value, { expires: 1 });
}

export function getToken(){
    return Cookies.get('token');
}

export function removeToken(){
    Cookies.remove('token');
}

export function setUser(value){
    Cookies.set('user', value, { expires: 1 });
}

export function getUser(){
    return Cookies.get('user');
}

export function removeUser(){
    Cookies.remove('user');
}

