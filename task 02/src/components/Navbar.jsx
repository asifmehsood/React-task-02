import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
const Navbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(false);
  const [show,setShow] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false);
  const [newPass, setNewPass] = useState("");

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold cursor-pointer text-red-500">
              TSK-000-42
            </div>
          </div>
          <div className="flex space-x-4">
            <Link
              className="text-gray-300 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              to="/home"
            >
              Home
            </Link>
            <Link
              className="text-gray-300 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              to="/list"
            >
              Todos
            </Link>

            <button className=" max-w-32 max-h-32 text-gray-500 hover:text-red-500 bg-transparent rounded-full text-sm font-medium cursor-pointer overflow-hidden">
              <img
                src={firebase.pic ? firebase.pic : "src\\assets\\download.png"}
                width={32}
                className="rounded-full"
                onClick={() => {
                  setshowMenu(!showMenu);
                }}
              />
            </button>
          </div>
        </div>
        <div className={`${showMenu ? "block" : "hidden"} relative`}>
          <ul className="flex flex-col bg-stone-300 w-1/6 absolute right-0 px-3">
            <li
              className="text-gray-500 hover:text-red-500 px-3 py-2 text-sm text-center font-medium cursor-pointer"
              onClick={async () => {
                if (firebase.isLoggedIn) {
                  await firebase.logout();
                } else {
                  alert("Log in First");
                }
                navigate("/");
              }}
            >
              Log Out
            </li>
            <li
              className="text-gray-500 hover:text-red-500 px-3 py-2 text-sm font-medium text-center cursor-pointer"
              onClick={() => {
                if (firebase.user && firebase.user.providerData[0].providerId === 'google.com') {
                  window.open("https://myaccount.google.com/security", "_blank");
                } else {
                  setShowNewPass(!showNewPass);
                }
               
              }}
            >
              Change Password
            </li>
            <li
              className={`${
                showNewPass ? "flex" : "hidden"
              } flex-col gap-2 items-center`}
            >
              {" "}
              <div className="space-y-3 my-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 flex justify-between w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
                  <input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="mx-2 outline-none w-4/5"
                    value={newPass}
                    onChange={(e) => {
                      setNewPass(e.target.value);
                    }}
                  />
                  <img
                    src={
                      show
                        ? "src\\assets\\closed-eye.svg"
                        : "src\\assets\\eye.svg"
                    }
                    className="cursor-pointer w-1/5"
                    onClick={() => {
                      setShow(!show);
                    }}
                  />
                </div>
              </div>
              <button
                className="w-24 text-gray-500 hover:text-red-500 px-3 py-2 bg-black rounded-md text-sm font-medium cursor-pointer"
                onClick={() => {
                    firebase.updatePasswordForUser(newPass);
                    setShowNewPass(false);
                  }}
              >
                Update
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
