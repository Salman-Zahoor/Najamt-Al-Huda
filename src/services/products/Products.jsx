import Api from "../index";
import { endPoints, requestType } from "../../constants/Variables";


// Login
export const loginAdmin = (params) => {
    return Api(`${endPoints.loginAdmin}`, params, requestType.POST,null) 
}
// Products
export const getAllProducts = (token, page) => {
    return Api(`${endPoints.getAllProducts}?page=${page}`, null, requestType.GET,token) 
}
export const addProduct = (token,body) => {
    return Api(`${endPoints.addProduct}`,body ,requestType.POST,token) 
}
export const deleteProduct = (token, id) => {
    return Api(`${endPoints.deleteProduct}/${id}`, null, requestType.DELETE, token); 
}
 
// Category 
// export const addCategory = (token, body) =>{
//     return Api (`${endPoints.createCategory}`, body, requestType.POST,token)
// }
// export const getCategory = (token, page) =>{
//     return Api(`${endPoints.getAllCategories}?page=${page}`, null, requestType.GET, token)
// }
// export const editCategory = (token,body,id) =>{
//     return Api(`${endPoints.updateCategory}/${id}`, body, requestType.PUT, token)
// }
// export const deleteCategories = (token, id) =>{
//     return Api(`${endPoints.deleteCategory}/${id}`, null, requestType.DELETE, token)
// }


// BANNERS 
export const getBanners = (token) =>{ 
    return Api(`${endPoints.getAllBanners}`, null, requestType.GET, token)
}
// export const getBanners = (token) =>{
//     return Api(`${endPoints.getAllBanners}`, null, requestType.GET, token)
// }
export const addBanners = (token,body) =>{
    return Api(`${endPoints.addBanner}`, body, requestType.POST, token)
}
export const deleteBanners = (token,id) =>{
    return Api(`${endPoints.deleteBanner}/${id}`, null, requestType.DELETE, token)
}


    //   :::USER SIDE SERVICES CATEGORIES::: 
    export const getUserCategories = () =>{
        return Api(`${endPoints.getCategory}`, null, requestType.GET, null)
    }
    export const getAllUserServices = () =>{
        return Api(`${endPoints.getAllServicesUser}`, null, requestType.GET, null) 
    }
    export const getUserServiceByCategory = (params) =>{
        return Api(`${endPoints.getServicesbyCategory}`, params, requestType.POST, null)
    }
    export const getSingleServiceData = (id) =>{
        return Api(`${endPoints.getServiceDetailsById}/${id}`, null, requestType.GET, null)
    }


    // EMPOYEES CLIENT SIDE
    export const getEmployeesClientSide = () =>{
        return Api(`${endPoints.getEmployeesByUser}`, null, requestType.GET, null)
    }

    // EMPOYEES CLIENT SIDE
    export const checkBooking = (params) =>{
        return Api(`${endPoints.checkBooking}`, params, requestType.POST, null)
    }
