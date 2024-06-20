import React, { useEffect, useState } from "react";
import { Button, CardContent, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "../../axios/axiosBase";
import { useParams } from "react-router-dom";
import styles from "../fullPost/style.module.scss";
const FullHero = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch;
  const role = useAppSelector((state) => state.user.data);
  const [post, setPost] = useState<any>();
  const handleDelete = () => {
    axios.delete(`/hero/${id}`);
  };
  useEffect(() => {
    axios.get(`/hero/${id}`).then(({ data }) => {
      setPost(data.hero);
    });
  }, []);
  return (
    <div className={styles.post}>
      <CardContent>
        <Typography fontSize={26}>{post?.fullName}</Typography>
      </CardContent>
      <img src={post?.image} style={{ width: "300px", height: "400px" }} alt="" />
      <Typography fontSize={20}>{post?.description}</Typography>
    </div>
  );
};

export default FullHero;
