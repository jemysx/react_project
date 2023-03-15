import axios from 'axios';

// 创建一个 axios 实例
const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
});

// 在请求发送前拦截请求
api.interceptors.request.use(config => {
    // 获取 token
    const token = localStorage.getItem('token');

    // 判断 token 是否存在
    if (token) {
        // 在请求头部添加认证信息
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

// 在响应接收后拦截响应
api.interceptors.response.use(response => {
    console.log('拦截器2',response)
    return Promise.resolve(response);
}, error => {
    // 处理请求错误
    if (error.response.status === 401) {
        // console.log(">>>>??")
        localStorage.removeItem('token');
        // 重定向到登录页面
        window.location.href = '/login';
    }

    return Promise.reject(error);
});

export default api;