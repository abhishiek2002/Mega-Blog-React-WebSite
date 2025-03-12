import React, { useEffect, useState } from "react";
import { Input } from "./index";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import appwrite from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../store/postSlice";

const PostForm = () => {
  const { register, handleSubmit } = useForm();
  const [msg, setMsg] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState();
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async ({ title, status, image }) => {
    try {
      const fileData = await appwrite.uploadFile(image[0]);
      if (fileData) {
          const postData = await appwrite.createPost({
            title,
            status,
            content,
            featuredImage: fileData.$id,
            userId: userData.$id,
          });
          if (postData !== null) {
            dispatch(getPosts(postData));
            navigate(`/post/${postData.$id}`);
          }
      }
    } catch (error) {
      console.log("PostForm: submit : error : ", error);
    }
  };

  // slugTransformation
  useEffect(() => {
    const slugTransform = (value) => {
      if (value && typeof value === "string") {
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");
      }
    };
    setSlug(slugTransform(msg));
  }, [msg]);

  return (
    <div className="">
      <form
        className="flex flex-col gap-2 max-w-[800px] mx-auto"
        onSubmit={handleSubmit(submit)}
      >
        {/* register should be on top of all props especially if you are appling event listener in the props */}

        <Input
          {...register("title", { required: true })}
          label="Title"
          placeholder="Title"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="shrink-0 w-full"
        />

        <Input
          label="Slug"
          type="text"
          placeholder="Slug"
          value={slug}
          className="shrink-0 w-full"
          readOnly
        />

        <Input
          {...register("image", { required: true })}
          label="Featured Image"
          type="file"
        />

        {/* status */}
        <div className="flex flex-col">
          <label htmlFor="status">Status:</label>
          <select
            {...register("status", { required: true })}
            id="status"
            className="bg-white rounded-lg px-1 py-2"
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>

        <JoditEditor
          value={content}
          config={{
            readonly: false,
            placeholder: "Start typing content",
          }}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />

        <button
          type="submit"
          className="bg-blue-700 text-white px-4 rounded-xl mx-auto cursor-pointer hover:brightness-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
