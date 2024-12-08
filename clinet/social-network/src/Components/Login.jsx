import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../utils/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlicer";

const divChoice =
  "bg-primary text-center my-10 w-40 mx-auto border-1 rounded-md -mt-2 text-2xl";
const inputCss =
  "bg-bgBtnColor text-btnColor rounded-lg my-1 h-14 p-5 text-base";
const submitCss =
  "bg-white text-btnColor rounded-lg my-1 h-14 p-5 text-base leading-none";
const titleCss = `text-center mb-4  font-bold`;

const Login = () => {
  const [btnText, setBtnText] = useState("Login");
  const [msgText, setMsgText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passType, setPassType] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const data = await signIn(formData);
    setBtnText("loading");

    setTimeout(() => {
      console.log(data);

      setFormData({
        email: "",
        password: "",
      });
      if (data.isAuth) {
        dispatch(setUser(data.username));
        setMsgText(data.message);
        navigate("/HomePage");
      } else {
        setMsgText(data.error.error);
      }
      setBtnText("Login");
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <>
      <div className="img"></div>
      <div className={titleCss}>Login to threads</div>
      <div className={titleCss}>{msgText}</div>
      <form
        className={`${divChoice} w-80 bg-transparent`}
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          className={inputCss}
          placeholder="Email"
          value={formData.email}
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          required={true}
        />
        <input
          className={inputCss}
          placeholder="Password"
          type={passType ? "text" : "password"}
          value={formData.password}
          id="password"
          name="password"
          onChange={handleChange}
          required={true}
        />
        <label htmlFor="show">ShowPassword</label>
        <input
          type="checkBox"
          id="show"
          name="show"
          onClick={() => setPassType(!passType)}
        />

        <button
          className={`${submitCss} ${isSubmitted ? "animate-pulse" : ""}`}
          type="submit"
        >
          {btnText}
        </button>
      </form>
    </>
  );
};

export default Login;
