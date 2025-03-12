import React from "react";
import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async ({ email, password, name }) => {
    try {
      const user = await authService.createAccount({ email, password, name });
      if (user) {
        const session = await authService.login({ email, password });
        if (session) dispatch(login(user));
        navigate("/");
      }
    } catch (error) {
      console.log("Signup component error: ", error);
    }
  };
  return (
    <div className="bg-gray-100 flex flex-col gap-2 p-4 w-md items-center rounded-lg">
      {/* logo */}

      <div>Logo</div>

      {/* Headings */}

      <h1 className="w-full font-bold text-center">Create your account</h1>
      <p className="text-gray-500">
        Already have an account?{" "}
        <Link to={"/login"} className="text-gray-800 text-lg">
          Sign Up
        </Link>{" "}
      </p>

      {/* errors */}

      {null}

      {/* form */}
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit(signup)}
      >
        <Input
          label="Name"
          placeholder="Enter your full name"
          className="w-full"
          {...register("name", { required: true })}
        />
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

export default Signup;
