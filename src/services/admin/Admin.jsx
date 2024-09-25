import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";


// Login
export const loginAdmin = (params) => {
    return Api(${endPoints.loginAdmin}, params, requestType.POST,null) 
}
export const getAllServices = (token) => {
    return Api(${endPoints.getAllServices}, null, requestType.GET,token) 
}
export const addServices = (token,body) => {
    return Api(${endPoints.addServices}, body, requestType.POST,token) 
}
export const updateService = (token,id,body) => {
    return Api(${endPoints.updateService}/${id}, body, requestType.PUT,token) 
}
export const deleteService = (token,id,) => {
    return Api(${endPoints.deleteService}/${id}, null, requestType.DELETE,token) 
}

export const getAllCategories = (token) => {
    return Api(${endPoints.getAllCategories}, null, requestType.GET,token) 
}

export const updateCategory = (token,id,body) => {
    return Api(${endPoints.updateCategory}/${id}, body, requestType.PUT,token) 
}
export const createCategory = (token,body) => {
    return Api(${endPoints.createCategory}, body, requestType.POST,token) 
}
export const deleteCategory = (token,id) => {
    return Api(${endPoints.deleteCategory}/${id}, null, requestType.DELETE,token) 
}