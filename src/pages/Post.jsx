import React, { useEffect, useState } from "react";
import { Container } from "../component/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwrite from "../appwrite/config";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deletePost as removePost } from "../store/postSlice";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [url, setUrl] = useState("");
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const postDataFun = async () => {
      const postData = await appwrite.getPost(id);
      if (postData) {
        setPost(postData);
        const imgData = await appwrite.getFile(postData.featuredImage);
        if (imgData) setUrl(imgData.href);
      }
    };
    if (id) {
      postDataFun();
    } else {
      navigate("/");
    }
  }, [id]);

  const deletePost = async () => {
    const deleted = await appwrite.deletePost(id);
    if (deleted) {
      const fileDeleted = await appwrite.deleteFile(post.featuredImage);
      if (fileDeleted) {
        dispatch(removePost(id));
        navigate("/");
      }
    }
  };

  return post !== null ? (
    <Container>
      <div className="flex flex-col items-start gap-4 px-4 max-w-[800px] mx-auto relative">
        {/* buttons */}

        {post.userId === userData.$id ? (
          <div className="flex gap-4 absolute top-0 right-0">
            <button className="bg-blue-700 text-lg w-20 text-white px-4 rounded-xl mx-auto cursor-pointer hover:brightness-90">
              <Link to={`/edit-post/${id}`}>Edit</Link>
            </button>
            <button
              className="bg-red-700 text-lg w-20 text-white px-4 rounded-xl mx-auto cursor-pointer hover:brightness-90"
              onClick={deletePost}
            >
              <Link to="/">Delete</Link>
            </button>
          </div>
        ) : null}

        {/* title */}
        <div className="">
          <h1 className="text-4xl uppercase italic underline">{post.title}</h1>
        </div>

        {/* image */}
        <div className="w-full">
          <img
            src={url}
            alt={post.title}
            className="w-full rounded-lg object-center object-cover h-[400px]"
          />
        </div>

        {/* content */}
        <div>{post && <div>{parse(post.content)}</div>}</div>
      </div>
    </Container>
  ) : null;
};

export default Post;
