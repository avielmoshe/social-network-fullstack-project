import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid.js";
import { getAllPosts } from "../utils/postApi.js";
import PostCard from "../Components/PostCard.jsx";

const outline = "outline outline-outlineDivs outline-1"
const bottomBorder = 'border-b border-outlineDivs'

const divChoice =
  "bg-bgBtnColor text-center my-10 w-40 mx-auto border-1 rounded-md -mt-2 text-2xl";

const HomePage = () => {
  const [PostsData, setPostsData] = useState([]);
  useCheckIfUserValid();
  const user = useSelector((state) => state.user);

  const getAll = async () => {
    const data = await getAllPosts();
    setPostsData(data);
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <div className={` self-center bg-searchBody w-full sm:w-[40%] h-[900px] rounded-t-3xl flex flex-col p-7 ${outline} m-auto mt-12`}>
        <h1 className={`text-center pt-5 font-semibold hidden sm:block p-2 ${bottomBorder}`}>For you</h1>
        
      <div className="relative">
      <div className="p-5">
        <div className={`mb-[70px]  `}>
          {PostsData.map((postData) => {
            return <PostCard key={postData._id} postData={postData} />;
          })}
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default HomePage;
