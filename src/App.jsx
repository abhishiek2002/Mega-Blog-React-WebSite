import React, { useEffect } from "react";
import { Header, Footer } from "./component/index";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "./store/postSlice";
import appwrite from "./appwrite/config";
import { Query } from "appwrite";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    appwrite.getPosts([Query.equal("status", "active")]).then((res) => {
      if (res.documents.length !== 0) {
        dispatch(getPosts(res.documents));
      } else {
        return null;
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
