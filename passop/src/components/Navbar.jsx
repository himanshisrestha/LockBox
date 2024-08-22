import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer  flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP/&gt;</span>
        </div>
      
        <button>
            GitHub
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
