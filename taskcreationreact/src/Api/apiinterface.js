import apiService from "./apiService";

export const signup = async(formdata)=>{
    console.log(formdata);
    try {
      const  response =await apiService("signup","POST",formdata);
      return response;
    } catch (error) {
      throw error;
    }
  }


  export const Loginuser = async(formdata)=>{
    // console.log(formdata);
    try {
      const  response =await apiService("login","POST",formdata);
      return response;
    } catch (error) {
      throw error;
    }
  }

  export const Createtaskapi = async(formdata)=>{
    // console.log(formdata);
    try {
      const  response =await apiService("createtask","POST",formdata);
      return response;
    } catch (error) {
      throw error;
    }
  }


  export const Updatetaskapi = async(formdata)=>{
    // console.log(formdata);
    try {
      const  response =await apiService("updatetask","POST",formdata);
      return response;
    } catch (error) {
      throw error;
    }
  }

  export const deletetaskapi = async(formdata)=>{
    
    try {
      const  response =await apiService("deletetask","POST",formdata);
      return response;
    } catch (error) {
      throw error;
    }
  }

  export const getalltask = async(formdata)=>{
    // console.log(formdata);
    try {
      const  response =await apiService("Alltask","Get");
      return response;
    } catch (error) {
      throw error;
    }
  }

  export const specifictask = async(formdata)=>{
    // console.log(formdata);
    try {
      const  response =await apiService("specifictask","POST",formdata);
      return response;
    } catch (error) {
      throw error;
    }
  }
