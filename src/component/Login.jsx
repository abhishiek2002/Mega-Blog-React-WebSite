import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../store/userSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.user.status)

  useEffect(() => {
    authStatus ? navigate('/') : null;
  })

  const Signin = async ({ email, password }) => {
    const session = await authService.login({ email, password });
    if (session) {
      const userData = await authService.getAccount();
      if (userData) {
        dispatch(authLogin(userData));
        console.log(userData);
        navigate("/");
      }
    }
  };
  return (
    <div className="bg-gray-100 flex flex-col gap-2 p-4 w-md items-center rounded-lg">
      {/* logo */}

      <div>Logo</div>

      {/* Headings */}

      <h1 className="w-full font-bold text-center">Sign in to your account</h1>
      <p className="text-gray-500">
        Don't have any account?{" "}
        <Link to={"/signup"} className="text-gray-800 text-lg">
          Sign Up
        </Link>{" "}
      </p>

      {/* errors */}

      {null}

      {/* form */}
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(Signin)}
      >
        <Input
          placeholder="Enter your email"
          label="Email"
          type="Email"
          className="w-full"
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />
        <Input
          placeholder="Password"
          label="Password"
          type="password"
          className="w-full"
          {...register("password", {
            required: true,
            minLength: 8,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
        />
        <Button type="submit" className="bg-blue-700 rounded-lg w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default Login;
