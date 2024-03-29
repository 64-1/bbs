import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500

    if (!expectedError) {
        console.log("记录异常", error);
        alert('无法连接到数据库')
    }

    return Promise.reject(error)

})

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default httpService