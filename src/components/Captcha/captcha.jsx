import React, { useEffect, useState } from "react";
import { getCaptcha, validateCaptcha } from "../../services/captchaService";
import "./captcha.css";

const initvalue = {
  image: null,
  textlen: 0,
};
const Captcha = ({
  Placeholder = "متن بالا را وارد نمایید",
  onChange,
  refresh,
}) => {
  const [captchaData, setcaptchaData] = useState(initvalue);
  const [inpValue, setinpValue] = useState("");

  const rand = () =>
    Math.random(0)
      .toString(36)
      .substring(2);
  const generateToken = (length) =>
    (rand() + rand() + rand() + rand()).substring(0, length);

  useEffect(() => {
    if (refresh) {
      refreshCaptcha();
    }
  }, [refresh]);

  const refreshCaptcha = async () => {
    setinpValue("");
    const token = generateToken(32);
    const getcaptchaval = await getCaptcha(token);
    setcaptchaData(getcaptchaval.data);
  };

  //   function setCookie(cname, cvalue, minutes) {
  //     var d = new Date();
  //     d.setTime(d.getTime() + (minutes*60*1000));
  //     var expires = "expires="+ d.toUTCString();
  //     document.cookie = cname + "=" + cvalue + "; " + expires;// + ";Secure; HttpOnly";
  // }

  const handleChange = async (e) => {
    try {
      setinpValue(e.target.value);
      if (e.target.value.length === captchaData.textlen) {
        const { data } = await validateCaptcha(e.target.value);
        onChange(data);
      } else onChange(false);
    } catch (error) {
      refreshCaptcha();
      onChange(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      refreshCaptcha();
    };
    getData();
  }, []);

  return (
    <div className="sc-bdVaJa hLCrav">
      <div className="rnc">
        <div className="rnc-row">
          <img className="rnc-canvas" src={captchaData.image} />
          <div className="rnc-column">
            <button
              type="button"
              aria-label="get new captcha"
              className="rnc-button"
              data-testid="captcha-refresh"
              onClick={refreshCaptcha}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g data-name="Layer 2">
                  <g data-name="refresh">
                    <rect width="24" height="24" opacity="0"></rect>
                    <path d="M20.3 13.43a1 1 0 0 0-1.25.65A7.14 7.14 0 0 1 12.18 19 7.1 7.1 0 0 1 5 12a7.1 7.1 0 0 1 7.18-7 7.26 7.26 0 0 1 4.65 1.67l-2.17-.36a1 1 0 0 0-1.15.83 1 1 0 0 0 .83 1.15l4.24.7h.17a1 1 0 0 0 .34-.06.33.33 0 0 0 .1-.06.78.78 0 0 0 .2-.11l.09-.11c0-.05.09-.09.13-.15s0-.1.05-.14a1.34 1.34 0 0 0 .07-.18l.75-4a1 1 0 0 0-2-.38l-.27 1.45A9.21 9.21 0 0 0 12.18 3 9.1 9.1 0 0 0 3 12a9.1 9.1 0 0 0 9.18 9A9.12 9.12 0 0 0 21 14.68a1 1 0 0 0-.7-1.25z"></path>
                  </g>
                </g>
              </svg>
            </button>
           
          </div>
        </div>
        <input
          placeholder={Placeholder}
          className="rnc-input"
          data-testid="captcha-input"
          onChange={handleChange}
          value={inpValue}
        ></input>
      </div>
    </div>
  );
};

export default Captcha;
