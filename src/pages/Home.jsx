import React, { useEffect, useMemo, useState } from "react";
import { PostCard } from "../component/index";
import { Container } from "../component/index";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const data = useSelector((state) => state.postSlice.posts);

  useEffect(() => {
    const availablePosts = async () => {
      if (data !== null) setPosts(data);
    };
    availablePosts();
  }, [data]);

  return (
    <Container>
      <div className="flex flex-wrap gap-2">
        {posts.length !== 0 ? (
          posts.map((post) => (
            <div key={post.$id} className="max-w-1/4">
              <PostCard {...post} />
            </div>
          ))
        ) : (
          <div className="w-full flex flex-wrap justify-center items-center">
            <h1 className="text-4xl text-center">Login For Posts</h1>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
