import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const iconCss =
  "w-full flex justify-center p-2 hover:bg-hoverColor cursor-pointer ";
function NavBar() {
  const isLog = useSelector((state) => state.user);

  return (
    <div
      className={`${
        isLog.username
          ? "bg-black flex flex-col justify-between fixed  bottom-0 w-full sm:right-0 sm:w-[70px] sm:h-full"
          : "hidden"
      }`}
    >
      <Link to="/HomePage">
        <div className="hidden sm:flex justify-center ">
          <img
            src="/threads-white-icon.svg"
            alt=""
            className="min-w-[40px] p-[3px] mt-2 max-w-[40px]"
          />
        </div>
      </Link>

      <div className="flex justify-between  sm:flex-col sm:justify-normal sm:gap-10 ">
        <Link to="/HomePage">
          <div className={iconCss}>
            <HomeIcon sx={{ fontSize: 40, padding: "1px" }} />
          </div>
        </Link>

        <Link to="/search">
          <div className={iconCss}>
            <SearchIcon sx={{ fontSize: 40, padding: "1px" }} />
          </div>
        </Link>

        <Link to="/UploadPost">
          <div className={iconCss}>
            <AddIcon sx={{ fontSize: 40, padding: "1px" }} />
          </div>
        </Link>

        <Link to="/HomePage">
          <div className={iconCss}>
            <BookmarksOutlinedIcon sx={{ fontSize: 40, padding: "1px" }} />
          </div>
        </Link>

        <Link to="/MyAccount">
          <div className={iconCss}>
            {isLog.profile ? (
              <img
                src={isLog.profile}
                alt="Profile"
                className="w-[40px] h-[40px] rounded-full mb-2 border border-gray-300 object-cover"
              />
            ) : (
              <Person2OutlinedIcon sx={{ fontSize: 40, padding: "1px" }} />
            )}
          </div>
        </Link>
      </div>

      <div></div>
    </div>
  );
}

export default NavBar;
