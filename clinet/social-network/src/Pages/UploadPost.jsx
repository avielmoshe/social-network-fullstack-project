import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid";
import { useState, useEffect } from "react";
import ImageUpload from "../Components/uploadImg";
import { createPost } from "../utils/postApi.js";

const divChoice =
  "bg-primary text-center my-10 w-40 mx-auto border-1 rounded-md -mt-2 text-2xl";
const inputCss =
  "bg-bgBtnColor text-btnColor rounded-lg my-1 h-14 p-5 text-base";
const submitCss =
  "bg-white text-btnColor rounded-lg my-1 h-14 p-5 text-base leading-none";
const titleCss = `text-center mb-4  font-bold`;

const UploadPost = () => {
  const [btnText, setBtnText] = useState("Upload new post");
  const [msgText, setMsgText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    post: "",
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const data = await createPost(formData);
    setMsgText(data.status);
  };

  useCheckIfUserValid();

  return (
    <div className="h-screen p-[20px] sm:mr-[70px}">
      <h1 className={titleCss}>Add new post</h1>
      <div className={titleCss}>{msgText}</div>
      <form
        className={`${divChoice} w-80 bg-transparent`}
        onSubmit={handleFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ImageUpload setFormData={setFormData} img={"post"} />
        <input
          className="bg-bgBtnColor text-btnColor rounded-lg my-1 h-14 p-5 text-base"
          placeholder="title"
          value={formData.title}
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          required={true}
        />
        <input
          className="bg-bgBtnColor  text-btnColor rounded-lg my-1 h-14 p-5 text-base"
          placeholder="content"
          type="text"
          value={formData.content}
          id="content"
          name="content"
          onChange={handleChange}
          required={true}
        />
        <button
          className={`${submitCss} ${isSubmitted ? "animate-pulse" : ""}`}
          type="submit"
        >
          {btnText}
        </button>
      </form>
    </div>
  );
};

export default UploadPost;
