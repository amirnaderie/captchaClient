import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_URL ;

export const getCaptcha=async (token)=> {
  try {
      
    return http.post(`${apiEndpoint}/captcha`, {
       token 
    },{
      withCredentials : true
      });
    
  } catch (error) {
    throw error;
  }
}

export const validateCaptcha=async (value)=> {
  try {
      
    return http.post(`${apiEndpoint}/captcha/validateCaptcha`, {
       value 
    },{
      withCredentials : true
      });
    
  } catch (error) {
    throw error;
  }
}

