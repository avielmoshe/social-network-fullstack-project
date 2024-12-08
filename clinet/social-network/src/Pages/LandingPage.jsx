import React from "react";
import { Link } from "react-router-dom";
//components

//turnery to check if user is signed if not redirect to here

const divChoice =
  "bg-bgBtnColor text-center my-10 w-40 mx-auto border-1 rounded-md -mt-2 text-2xl h-[40px]";

const LandingPage = () => {
  return (
    <>
      <div className="img"></div>

      <h1 className="text-center my-10 text-5xl">Threads MOCK</h1>
      <div className={divChoice}>
        <Link
          to={`/signin`}
          className={`${divChoice} text-btnColor w-40 block`}
        >
          <button>Sign In</button>
        </Link>
      </div>
      <Link
        to={`/signup`}
        className={`${divChoice} text-btnColor w-40 block animate-bounce`}
      >
        <button>Sign Up</button>
      </Link>
    </>
  );
};

export default LandingPage;
