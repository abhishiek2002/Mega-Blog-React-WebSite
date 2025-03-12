import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/userSlice";
import {Logout} from "./index";

const Header = () => {
  const authStatus = useSelector((state) => state.user.status);
  const dispatch = useDispatch();

  const navItem = [
    {
      name: "Home",
      status: true,
      path: "/",
    },
    {
      name: "All Posts",
      status: authStatus,
      path: "/all-posts",
    },
    {
      name: "Add Post",
      status: authStatus,
      path: "/add-post",
    },
    // {
    //   name: "Logout",
    //   status: authStatus,
    //   path: "/",
    // },
    {
      name: "Login",
      status: !authStatus,
      path: "/login",
    },
    {
      name: "Signup",
      status: !authStatus,
      path: "/signup",
    },
  ];

  useEffect(() => {
     const getSession = async () => {
      try {
        const data = await authService.getAccount();
        if (data) dispatch(login(data));
        
      } catch (error) {
        console.log('just cheking');
        
      }
    }
    getSession()
  }, []);

  return (
    <div className="bg-gray-700 text-white w-screen h-14 text-2xl flex flex-wrap justify-between items-center px-4 max-w-7xl mx-auto 2xl:rounded-lg">
      {/* logo */}
      <div className="text-2xl">Logo</div>

      <nav className="w-1/2">
        <ul className="flex flex-wrap list-none w-full justify-between">
          {navItem.map((item) =>
            item.status ? (
              <Link to={item.path} key={item.name}>
                <li>{item.name}</li>
              </Link>
            ) : null
          )}
        {authStatus ? <Logout/> : null}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
