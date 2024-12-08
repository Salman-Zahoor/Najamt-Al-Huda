import { endPoints,requestType } from "../../constants/Variables";
import Api from "../index"


// Login
export const loginAdmin = (params) => {
    return Api(`${endPoints.loginAdmin}`, params, requestType.POST,null) 
}
export const getAllServices = (token,page) => {
    return Api(`${endPoints.getAllServices}?page=${page}`, null, requestType.GET,token) 
}
export const addServices = (token,body) => {
    return Api(`${endPoints.addServices}`, body, requestType.POST,token) 
}
export const updateService = (token,id,body) => {
    return Api(`${endPoints.updateService}/${id}`, body, requestType.PUT,token) 
}
export const deleteService = (token,id) => {
    return Api(`${endPoints.deleteService}/${id}`, null, requestType.DELETE,token) 
}

export const getAllCategories = (token,page) => {
    return Api(`${endPoints.getAllCategories}?page=${page}`, null, requestType.GET,token) 
}

export const updateCategory = (token,id,body) => {
    return Api(`${endPoints.updateCategory}/${id}`, body, requestType.PUT,token) 
}
export const createCategory = (token,body) => {
    return Api(`${endPoints.createCategory}`, body, requestType.POST,token) 
}
export const deleteCategory = (token,id) => {
    return Api(`${endPoints.deleteCategory}/${id}`, null, requestType.DELETE,token) 
}

export const getAllBookings = (token,page) => {
    return Api(`${endPoints.getAllBookings}?page=${page}`, null, requestType.GET,token) 
}

export const updateStatus = (id,body,token) => {
    return Api(`${endPoints.statusUpdate}/${id}`, body, requestType.PUT,token) 
}


// CONTACT US FORM
export const contactUsForm = (body) => {
    return Api(`${endPoints.contactUs}`, body, requestType.POST,null) 
}

