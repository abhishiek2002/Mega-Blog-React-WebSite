import React, { useId } from "react";

const Input = ({ type = "text", label, className, ...props }) => {
  const id = useId();
  return (
    <div className={`${className}`}>
      <label htmlFor={id} className="text-black font-normal">
        {label}:
      </label>
      <input
        type={type}
        {...props}
        id={id}
        className="bg-white p-1.5 rounded-md w-full"
      />
    </div>
  );
};

export default Input;
