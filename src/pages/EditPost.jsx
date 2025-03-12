import React, { useEffect, useState } from "react";
import { Container } from "../component/index";
import { useNavigate, useParams } from "react-router-dom";
import appwrite from "../appwrite/config";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    const postDataFun = async () => {
      if (id) {
        const postData = await appwrite.getPost(id);
        if (postData) {
          const { title, content, status, featuredImage } = postData;
          setPost(postData);
          setTitle(title);
          setContent(content);
          setStatus(status);
        }
      } else {
        navigate("/");
      }
    };
    postDataFun();
  }, [id, navigate]);

  useEffect(() => {
    const slugTransform = (value) => {
      return value.trim().replace("/s/g", "-");
    };
    setSlug(slugTransform(title));
  }, [title]);

  const submit = async ({ title, image, status }) => {
    // console.log(data, "ok ", content);
    try {
      if (image.length !== 0) {
        const fileData = await appwrite.uploadFile(image[0]);
        if (fileData) {
          await appwrite.deleteFile(post.featuredImage);
          const updatedPostData = await appwrite.updatePost(id, {
            title,
            status,
            content,
            featuredImage: fileData.$id,
          });
          updatedPostData ? navigate(`/post/${id}`) : null;
        }
      } else {
        const updatedPostData = await appwrite.updatePost(id, {
          title,
          status,
          content,
        });
        updatedPostData ? navigate(`/post/${id}`) : null;
      }
    } catch (error) {
      console.log("Edit Post : Submit : Error : ", error);
    }
  };

  return post ? (
    <div>
      <Container>
        <div className="">
          <form
            className="flex flex-col gap-2 max-w-[800px] mx-auto"
            onSubmit={handleSubmit(submit)}
          >
            {/* Title */}
            <div className="shrink-0 w-full">
              <label htmlFor="title" className="text-black font-normal">
                Title:
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                id="title"
                // defaultValue={title}
                value={title}
                className="bg-white p-1.5 rounded-md w-full"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Slug */}
            <div className="shrink-0 w-full">
              <label htmlFor="slug" className="text-black font-normal">
                Slug:
              </label>
              <input
                type="text"
                id="slug"
                className="bg-white p-1.5 rounded-md w-full"
                value={slug}
                readOnly
              />
            </div>

            {/* Image File */}
            <div className="shrink-0 w-full">
              <label htmlFor="image" className="text-black font-normal">
                Image:
              </label>
              <input
                {...register("image", { required: false })}
                type="file"
                id="image"
                className="bg-white p-1.5 rounded-md w-full"
              />
              <p className="text-red-700 text-sm">
                Upload file only if wanted to edit post image
              </p>
            </div>

            {/* Post Status */}
            <div className="shrink-0 w-full">
              <label htmlFor="status" className="text-black font-normal">
                Status:
              </label>
              <select
                {...register("status", { required: true })}
                id="status"
                defaultValue={status}
                className="bg-white rounded-lg px-1 py-2 w-full"
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>

            {/* Editor or Content */}
            <JoditEditor
              value={content}
              config={{
                readonly: false,
                placeholder: "Start typing content",
              }}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />

            {/* submit button */}
            <button
              type="submit"
              className="bg-blue-700 text-white px-4 rounded-xl mx-auto cursor-pointer hover:brightness-90"
            >
              Submit
            </button>
          </form>
        </div>
      </Container>
    </div>
  ) : null;
};

export default EditPost;
