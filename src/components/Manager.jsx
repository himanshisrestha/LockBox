import React, { useEffect, useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/closed-eye-icon.png")) {
      ref.current.src = "icons/eye-solid.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/closed-eye-icon.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    // Logic to save the password
    if(form.site.length>3 && form.username.length>3 && form.site.password>3){
      setPasswordArray ([...passwordArray, {...form,id:uuidv4()}]);
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
      console.log(...passwordArray,form);
      setForm({ site: "", username: "", password: "" });
      toast("Password saved !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    else{
      toast("Password not saved !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    
  };


  const deletePassword = (id) => {
    console.log("deleting passsword with id",id)
    let c=confirm("Do you really want to delete this password?")
    if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    ;
    }
    
   
  };
  const editPassword = (id) => {

    console.log("Editing passsword with id",id)
    setForm(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-2 pt-3  md:mycontainer min-h-[84.5vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex fle-col md:flex-row flex-col px-4 py-1 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter your website URL"
            className="rounded-full border border-green-500 w-full px-4"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full px-4"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full px-4"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="/icons/eye-solid.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 rounded-full px-4 py-2 w-fit hover:bg-green-300 gap-2 border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Sites</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="justify-center py-2 border-white text-center">
                      <div className="flex items-center justify-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <div
                          className="size-7 cursor-pointer lordiconcopy"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.username}</span>
                        <div
                          className="size-7 cursor-pointer lordiconcopy"
                          onClick={() => copyText(item.username)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border-white text-center">
                      <div className="flex items-center justify-center">
                        <span>{item.password}</span>
                        <div
                          className="size-7 cursor-pointer lordiconcopy"
                          onClick={() => copyText(item.password)}
                        >
                          <lord-icon
                            style={{
                              width: "20px",
                              height: "20px",
                              paddingTop: "3px",
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>

                    <td className=" justify-center py-2 border-white text-center">
                      <span className="curson-pointer mx-1" onClick={()=>{editPassword(item.id)}}>
                        <lord-icon
                          src="https://cdn.lordicon.com/wuvorxbv.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#121331,secondary:#16c72e"
                          style={{"width":"25px","height":"25px"}}
                        ></lord-icon>
                      </span>
                      <span className="curson-pointer mx-1"  onClick={()=>{deletePassword(item.id)}}>
                        <lord-icon
                         src="https://cdn.lordicon.com/drxwpfop.json"
                          trigger="hover"
                          stroke="bold"
                          colors="primary:#121331,secondary:#16c72e"
                          style={{"width":"25px","height":"25px"}}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
