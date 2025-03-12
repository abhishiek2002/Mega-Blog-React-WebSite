import React from "react";

const Button = ({ type,className, children }) => {
  return type ? (
    <button type={type} className={`${className} py-2 text-white cursor-pointer max-w-[70px] lg:max-w-[100px] hover:brightness-90`}>{children}</button>
  ) : (
    <button className={`${className} py-2 text-white cursor-pointer max-w-[70px] lg:max-w-[100px] hover:brightness-90`}>{children}</button>
  );
};

export default Button;
