import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";


// Login
export const getEmployees = (token,page) => {
    return Api(`${endPoints.getEmployees}?page=${page}`, null, requestType.GET,token) 
}