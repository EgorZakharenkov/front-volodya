import React, { useEffect, useState } from "react";
import { Button, CardContent, Typography } from "@mui/material";
import { LiaComments } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "../../axios/axiosBase";
import { useParams } from "react-router-dom";
import styles from "./style.module.scss";
import { removeItem } from "../../redux/slices/post";
const Post = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch;
  const role = useAppSelector((state) => state.user.data);
  const [post, setPost] = useState<any>();
  const handleDelete = () => {
    axios.delete(`/post/${id}`);
  };
  useEffect(() => {
    axios.get(`/post/${id}`).then(({ data }) => {
      setPost(data);
    });
  }, []);
  return (
    <div className={styles.post}>
      <CardContent>
        <Typography fontSize={26}>{post?.title}</Typography>
      </CardContent>
      <img src={post?.image} style={{ width: "100%", height: "100%" }} alt="" />

      <Typography fontSize={20}>{post?.description}</Typography>
    </div>
  );
};

export default Post;
