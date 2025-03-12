import React from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout as Signout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    const deleteSession = await authService.logout();
    if (deleteSession) {
      dispatch(Signout());
      navigate("/");
    }
  };
  return (
    <div onClick={logout} className="cursor-pointer">
      Logout
    </div>
  );
};

export default Logout;
