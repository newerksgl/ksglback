import axios from 'axios'
import { Message } from 'element-ui';  //element库的消息提示，可以不用

//创建axios实例
var service = axios.create({
    baseURL: 'http://localhost:9999/',//192.168.43.81
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
        "token": '14a1347f412b319b0fef270489f'
    }
})
export default {
    //get请求，其他类型请求复制粘贴，修改method
    get(url, param) {
        return new Promise((cback, reject) => {
            service({
                method: 'get',
                url,
                params: param,
            }).then(res => {
                //axios返回的是一个promise对象 
                var res_code = res.status.toString();
                if (res_code.charAt(0) == 2) {
                    cback(res);   //cback在promise执行器内部
                } else {
                    console.log(res, '异常1')
                }
            }).catch(err => {
                if (!err.response) {
                    console.log('请求错误')
                    //Message是element库的组件，可以去掉
                    Message({
                        showClose: true,
                        message: '请求错误',
                        type: 'error'
                    });
                } else {
                    reject(err.response);
                    console.log(err.response, '异常2')
                }
            })

        })
    },
    post(url, param) {
        return new Promise((cback, reject) => {
            service({
                method: 'post',
                url,
                params: param,
            }).then(res => {
                //axios返回的是一个promise对象 
                var res_code = res.status.toString();
                if (res_code.charAt(0) == 2) {
                    cback(res);   //cback在promise执行器内部
                } else {
                    console.log(res, '异常1')
                }
            }).catch(err => {
                if (!err.response) {
                    console.log('请求错误')
                    //Message是element库的组件，可以去掉
                    Message({
                        showClose: true,
                        message: '请求错误',
                        type: 'error'
                    });
                } else {
                    reject(err.response);
                    console.log(err.response, '异常2')
                }
            })

        })
    }
} 