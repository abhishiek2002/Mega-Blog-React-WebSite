import React from "react";
import {Container} from "../component/index";
import { Link } from "react-router-dom";

const Footer = () => {
  return <Container>
    <footer className="bg-gray-700 text-white flex justify-between p-4 w-screen max-w-7xl">
      <div className="w-1/2 flex flex-col items-center justify-between">

        {/* logo */}
      <div className="text-4xl text-white flex h-4/5 justify-center items-center">
        Logo
      </div>

      {/* Copyright content */}
      <div className="text-gray-400">
        <p>Copyright 2023. All Rights Reserved by <a href="https://github.com/abhishiek2002" target="_blank">Abhishek Kuntal</a> </p>

      </div>
      </div>

      <div className="flex justify-between">

        {/* company */}
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-400 text-center">COMPANY</h2>

          <ul className="flex flex-col gap-2 text-center">
            <li><Link to="#" >Features</Link></li>
            <li><Link to="#" >Pricing</Link></li>
            <li><Link to="#" >Affiliate Program</Link></li>
            <li><Link to="#" >Press Kit</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-400 text-center">SUPPORT</h2>

          <ul className="flex flex-col gap-2 text-center">
            <li><Link to="#" >Account</Link></li>
            <li><Link to="#" >Help</Link></li>
            <li><Link to="#" >Contact Us</Link></li>
            <li><Link to="#" >Customer Support</Link></li>
          </ul>
        </div>

        {/* Legals */}
        <div className="flex flex-col gap-4">
          <h2 className="text-gray-400 text-center">LEGALS</h2>

          <ul className="flex flex-col gap-2 text-center">
            <li><Link to="#" >Terms & Conditions</Link></li>
            <li><Link to="#" >Privacy Policy</Link></li>
            <li><Link to="#" >Licensing</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  </Container>;
};

export default Footer;
