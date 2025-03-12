import React, { useEffect, useState } from "react";
import { PostCard } from "./index";
import { useSelector } from "react-redux";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.user.userData);
  const data = useSelector((state) => state.postSlice.posts);

  useEffect(() => {
    const availablePosts = async () => {
      if (userData) {
        // Todo:-
        // need to get posts that are belongs to user itself only
        if (data !== null) setPosts(data);
      }
    };
    availablePosts();
  }, [userData]);

  return posts.length === 0 ? (
    <div>No Post Available Right Now</div>
  ) : (
    <div className="flex flex-wrap gap-2">
      {posts &&
        posts.map((post) => (
          <div key={post.$id} className="max-w-1/4">
            <PostCard {...post} />
          </div>
        ))}
    </div>
  );
};

export default AllPost;
