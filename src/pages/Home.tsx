import React, { useEffect, useState } from "react";
import CustomCard from "../components/Card/Card";
import styles from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getPosts } from "../redux/slices/post";
const Home = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        {posts &&
          posts.map((item: any) => (
            <CustomCard
              id={item._id}
              title={item.title}
              description={item.description}
              image={item.image}
              comments={item.comments}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
