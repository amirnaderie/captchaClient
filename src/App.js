import React,{useState} from "react";
import "./App.css";
import Captcha from "./components/Captcha/captcha";

function App() {
   const [refreshcaptcha, setRefreshcaptcha] = useState(0);
   
   const captchaChange=(captchaState)=>{
    console.log(captchaState);
  }
    
  return (
    <React.Fragment>
      
      <Captcha onChange={captchaChange} refresh={refreshcaptcha}  Placeholder="Please Enter Text" />
      <button
        onClick={() => {
          setRefreshcaptcha((refreshcaptcha) => refreshcaptcha + 1);
        }}
      >
         click
      </button>
     
    </React.Fragment>
  );
}

export default App;
