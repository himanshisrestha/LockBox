import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full">
      <div>
        <div className="logo font-bold text-white-2xl ">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
      </div>
      <div className="flex justify-center items-center py-2">Created with <img className="w-6 mx-1 " src="icons/heart.png"></img> by Himanshi_Srestha</div>
      
    </div>
  );
};

export default Footer;
