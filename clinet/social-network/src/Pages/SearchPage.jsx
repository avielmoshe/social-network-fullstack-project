import React, { useState } from 'react';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { BorderBottom } from '@mui/icons-material';

const outline = "outline outline-outlineDivs outline-1"
const bottomBorder = 'border-b border-outlineDivs'


const SearchPage = () => {
  const [input, setInput] = useState("");

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className='w-full flex flex-col gap-5'>
      <h1 className='text-center pt-5 font-semibold hidden sm:block'>Search</h1>
      <div className={` self-center bg-searchBody w-full sm:w-[80%] h-[900px] rounded-t-3xl flex flex-col p-7 ${outline} `}>
        <div className="relative">
        

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
            className={`text-white rounded-3xl h-12 pl-12 pr-10 w-full bg-inputBg ${outline}`}
          />
      

          <SearchIcon
            sx={{
              fontSize: 24,
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "gray",
            }}
          />
        

          {input && (
            <ClearIcon
              onClick={handleClear}
              sx={{
                fontSize: 24,
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                color: "gray",
                cursor: "pointer",
              }}
            />
          )}
        </div>

        <ul className="mt-5">
          <li className="flex items-center gap-2 mt-2">
            <Person2OutlinedIcon sx={{ fontSize: 40, padding: "1px", background:"black", borderRadius:"20px" }} />
            <div className={`flex w-full justify-between ${bottomBorder}`}>
            <span >
            <h2>UserName</h2>
            <p className='mb-3 text-outlineDivs'>bio</p>
            </span>
            <ArrowForwardIosIcon sx={{alignSelf:"center", padding:"1px", color:"#4D4D4D"}} />
            </div>
          </li>
          <li className="flex items-center gap-2 mt-2">
            <Person2OutlinedIcon sx={{ fontSize: 40, padding: "1px", background:"black", borderRadius:"20px" }} />
            <div className={`flex w-full justify-between ${bottomBorder}`}>
            <span >
            <h2>UserName</h2>
            <p className='mb-3 text-outlineDivs'>bio</p>
            </span>
            <ArrowForwardIosIcon sx={{alignSelf:"center", padding:"1px", color:"#4D4D4D"}} />
            </div>
          </li>
          <li className="flex items-center gap-2 mt-2">
            <Person2OutlinedIcon sx={{ fontSize: 40, padding: "1px", background:"black", borderRadius:"20px" }} />
            <div className={`flex w-full justify-between ${bottomBorder}`}>
            <span >
            <h2>UserName</h2>
            <p className='mb-3 text-outlineDivs'>bio</p>
            </span>
            <ArrowForwardIosIcon sx={{alignSelf:"center", padding:"1px", color:"#4D4D4D"}} />
            </div>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default SearchPage;
