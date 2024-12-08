import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../utils/userApi";

const divChoice =
  "bg-primary text-center my-10 w-40 mx-auto border-1 rounded-md -mt-2 text-2xl";
const inputCss =
  "bg-bgBtnColor text-btnColor rounded-lg my-1 h-14 p-5 text-base";
const submitCss =
  "bg-white text-btnColor rounded-lg my-1 h-14 p-5 text-base leading-none";
const titleCss = `text-center mb-4  font-bold`;

const Register = () => {
  const [btnText, setBtnText] = useState("Signup");
  const [msgText, setMsgText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passType, setPassType] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    isSubmitted === true;

    const data = await signUp(formData);

    setBtnText("loading");

    setMsgText(data.message);
    setTimeout(() => {
      if (data.status === "success") {
        setTimeout(() => {
          navigate("/signin");
          setFormData({
            username: "",
            email: "",
            password: "",
          });
        }, 1500);
      } else {
        setMsgText(data.error.message);
      }
      setBtnText("Signup");
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <>
      <div className="img"></div>
      <div className={titleCss}>SignUp to threads</div>
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
          placeholder="username"
          value={formData.username}
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          required={true}
        />
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
          value={formData.password}
          type={passType ? "text" : "password"}
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
          onChange={() => setPassType(!passType)}
        />
        <button
          onClick={() => setIsSubmitted(true)}
          className={`${submitCss} ${isSubmitted ? "animate-pulse" : ""}`}
          type="submit"
        >
          {btnText}
        </button>
      </form>
    </>
  );
};

export default Register;
