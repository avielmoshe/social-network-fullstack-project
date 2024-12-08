import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { crateNewComment, deleteComment } from "../utils/commentApi.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useState } from "react";
import { useCheckIfUserValid } from "../hooks/use-check-if-user-valid.js";

const Comments = ({ commentsData, postId, setChangeState }) => {
  const user = useSelector((state) => state.user);
  const [commentInput, setCommentInput] = useState("");

  const addComment = async (commentInput, postId) => {
    await crateNewComment(commentInput, postId);
    setCommentInput("");
    setChangeState((prev) => !prev);
  };

  const handleChange = (e) => {
    setCommentInput(e.target.value);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <label htmlFor="addComment">add Comment:</label>
          <input
            className="bg-bgBtnColor text-btnColor rounded-lg my-2 mx-2 h-[10px] p-4 text-base"
            placeholder="add Comment"
            value={commentInput}
            onChange={handleChange}
            type="text"
            id="addComment"
            name="addComment"
          ></input>
          <button
            className="bg-white text-btnColor rounded-lg my-1 h-[10px] p-4 text-center leading-none"
            onClick={() => addComment(commentInput, postId)}
          >
            add
          </button>
        </div>
        <div className="max-w-2xl px-4 py-7">
          {commentsData.map((commentData) => (
            <div
              key={commentData._id}
              className="flex gap-4 mb-6 border-b border-bgBtnColor-200 pb-3"
            >
              <div className="w-12 h-12 ">
                {commentData.profileImg ? (
                  <img
                    src={commentData.profileImg}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Person2OutlinedIcon
                    sx={{
                      border: "solid 2px gray",
                      borderRadius: "50%",
                      padding: "2px",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="text-sm flex flex-col gap-0.5">
                  <span className="mr-2 font-bold text-red-300">
                    {commentData.username}
                  </span>
                  {commentData.CommentText}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(commentData.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                {commentData.username === user.username && (
                  <div className="text-red-500 hover:text-red-700 cursor-pointer">
                    <DeleteOutlineIcon
                      onClick={() => {
                        deleteComment(commentData._id);
                        setChangeState((prev) => !prev);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
