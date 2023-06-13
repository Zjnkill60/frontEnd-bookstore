import axios from './customizeAxios'

export const fetchRegister =  (fullName , email , password ,phone) => {
    return  axios.post('/api/v1/user/register',{fullName,email,password,phone})
}

export const fetchLogin =  ( username , password ,delay) => {
    return  axios.post('/api/v1/auth/login/',{username,password,delay})
}

export const fetchLogOut =  () => {
    return  axios.post('/api/v1/auth/logout')
}

export const fetchAccount =  () => {
    return  axios.get('/api/v1/auth/account')
}

export const handleRefreshToken =  () => {
   return  axios.get('/api/v1/auth/refresh')
   
  }


export const fetchGetAllAccount =  () => {
    return  axios.get('/api/v1/user')
    
}

export const fetchGetAllBook =  () => {
    return  axios.get('/api/v1/book') 
   }

export const fetchBookPaganigate =  (current , pageSize) => {
    return  axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}`) 
   }

export const fetchGetCategory =  () => {
    return  axios.get('api/v1/database/category')
    
   }


export const handleCreateUser =  (fullName , password,email  ,phone) => {
    return  axios.post('/api/v1/user',{fullName,password,email,phone})
}

export const handleCreateBook =  (thumbnail , slider,mainText  ,author,price,sold,quantity,category) => {
    return  axios.post('/api/v1/book',{thumbnail,slider,mainText,author,price,sold,quantity,category})
}

export const handleUpdateBook =  (id,thumbnail , slider,mainText  ,author,price,sold,quantity,category) => {
    return  axios.put(`/api/v1/book/${id}`,{thumbnail,slider,mainText,author,price,sold,quantity,category})
}


export const handleCreateImportListUser =  (arrayListUser) => {
    return  axios.post('/api/v1/user/bulk-create',arrayListUser)
}



export const handleUpdateUser =  (_id,fullName , email  ,phone) => {
    return  axios.put('/api/v1/user',{_id,fullName,email,phone})
}

export const handleDeleteUser =  (_id) => {
    return  axios.delete('/api/v1/user/' + _id)
}

export const handleDeleteBook =  (_id) => {
    return  axios.delete('/api/v1/book/' + _id)
}

export const handleSorterASCTableAdmin =  (key) => {
    return  axios.get('api/v1/user?current=1&pageSize=100&sort=' + key)
}

export const handleSorterDESCTableAdmin =  (key) => {
    return  axios.get('api/v1/user?current=1&pageSize=100&sort=-' + key)
}

export const handleSorterASCBook =  (key) => {
    return  axios.get('api/v1/book?current=1&pageSize=100&sort=' + key)
}

export const handleSorterDESCBook =  (key) => {
    return  axios.get('api/v1/book?current=1&pageSize=100&sort=-' + key)
}

export const callUploadBookImg=(fileImg) =>{

const bodyFormData= new FormData();

bodyFormData.append('fileImg',fileImg);

return axios({method: 'post',url: '/api/v1/file/upload',data: bodyFormData,
            headers:
            {
            "Content-Type":

            "multipart/form-data",

            "upload-type": "book"
            },
        });
    }

export const callFetchCategory = () => {
    return  axios.get('/api/v1/database/category')
}

export const fetchGetBookID =  (id) => {
    return  axios.get('api/v1/book/' + id)
}

export const fetchGetHistoryOrder =  () => {
    return  axios.get('api/v1/history')
}

export const fetchGetDashboard =  () => {
    return  axios.get('api/v1/database/dashboard')
}


export const fetchCreateAnOrder =  (name,address,phone,totalPrice,detail) => {
    return  axios.post('/api/v1/order',{
        name,address,phone,totalPrice,detail
    })
}
