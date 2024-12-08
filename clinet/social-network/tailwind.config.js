/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101010",
        bgBtnColor: "hsla(0, 2%, 13%, 0.948)",
        btnColor: "#AAAAAA",
        navColor: "rgb(24 24 27)",
        hoverColor: "rgb(39 39 42)",
        profileColor: "rgb(74 222 128)",
        searchBody:"#181818",
        inputBg:"#0A0A0A",
        outlineDivs:"#4D4D4D"
      },
      backgroundImage: {
        uploadImg: "url('clinet/social-network/public/uploadImgIcon.svg')",
      },
    },
  },
  plugins: [],
};
