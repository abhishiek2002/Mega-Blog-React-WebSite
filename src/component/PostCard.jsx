import React, { useEffect, useState } from "react";
import appwrite from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ title, featuredImage, $id }) => {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    appwrite.getFile(featuredImage).then((res) => setUrl(res.href));
  }, []);

  return (
    <Link to={`/post/${$id}`}>
    <div className="flex flex-col p-2 rounded-lg justify-between bg-white cursor-pointer h-[300px] w-[200px]">
      <img src={url} alt={title} className="w-full rounded-lg h-2/3 object-cover object-center" />
      <h1 className="text-xl font-bold text-center">{title}</h1>
    </div>
    </Link>
  );
};

export default PostCard;
