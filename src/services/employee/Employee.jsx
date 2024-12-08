import { endPoints, requestType } from "../../constants/Variables";
import Api from "../index";



// Login
export const getEmployees = (token,page) => {
    return Api(`${endPoints.getEmployees}?page=${page}`, null, requestType.GET,token) 
}
export const addEmployee = (token,payload) => {
    return Api(`${endPoints.addEmployee}`, payload, requestType.POST,token) 
}
export const deleteEmployee = (token,id) => {
    return Api(`${endPoints.deleteEmployee}/${id}`, null, requestType.DELETE,token) 
}
export const updateEmployee = (token,id,payload) => {
    return Api(`${endPoints.updateEmployee}/${id}`, payload, requestType.PUT,token) 
}