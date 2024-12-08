import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid";
import { deleteCookie } from "../utils/cookie";
import { setUser } from "../store/slices/userSlicer";
import { useNavigate } from "react-router-dom";
import { getAllPostsByUser } from "../utils/postApi";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const MyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [PostsData, setPostsData] = useState([]);

  useCheckIfUserValid();
  const user = useSelector((state) => state.user);
  const submitCss =
    "bg-bgBtnColor text-btnColor rounded-lg my-1 p-1.5 text-[17px] leading-none w-screen ";

  const getMyPosts = async () => {
    const data = await getAllPostsByUser();
    setPostsData(data);
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  function handleLogout() {
    deleteCookie();
    dispatch(setUser(false));
  }

  return (
    <div className="h-screen p-[20px] sm:mr-[70px] ">
      <div className="sm:flex sm:justify-center">
        <div className="sm:flex sm:flex-col items-center">
          <p className="text-[35px] mb-[10px]">{user.username}</p>
          <div>
            {user.profile ? (
              <img
                src={user.profile}
                alt="Profile"
                className="w-[130px] h-[130px]  rounded-full mb-2 border border-gray-300 object-cover "
              />
            ) : (
              <AccountCircleIcon
                sx={{ fontSize: "130px", marginBottom: "5px" }}
              />
            )}
          </div>
          <p className="text-[17px]">{user.nickname}</p>
          <p className="text-[25px] mb-[10px]">{user.bio}</p>
          <div className="flex p-[17px] max-w-[600px]">
            <button
              onClick={() => navigate("/EditProfile")}
              className={`${submitCss} mr-[10px]`}
            >
              Edit profile
            </button>
            <button onClick={handleLogout} className={submitCss}>
              LogOut
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-[30px] font-bold">Your posts</h1>
        <div className="mb-[70px]">
          {PostsData.map((postData) => {
            return <PostCard key={postData._id} postData={postData} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
