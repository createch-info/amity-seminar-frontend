import axios from 'axios'

  const HTTP = axios.create({
    baseURL: `https://testing.amityhealthcaregroup.com/education/api/admin/`,
    headers: {
        Accept:'application/json',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers':'Content-Type'
    }
  })
HTTP.interceptors.response.use((responce)=>{
    return Promise.resolve(responce.data)
},
    (error)=>{
        return Promise.reject(error.response.data)
    }
);
  export default HTTP