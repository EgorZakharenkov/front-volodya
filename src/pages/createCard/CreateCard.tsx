import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./style.module.scss";
import axios from "../../axios/axiosBase";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
const CreateCard = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const createCard = () => {
    id
      ? axios.put(`/post/${id}`, { title, description, image })
      : axios.post("/post", { title, description, image });
    navigate(`/fullPost/${id}`);
  };
  useEffect(() => {
    axios.get(`/post/${id}`).then(({ data }) => {
      setTitle(data.title);
      setImage(data.image);
      setDescription(data.description);
    });
  }, []);
  return (
    <div>
      <form onSubmit={createCard} className={styles.form}>
        <TextField
          multiline
          fullWidth
          label={"Заголовок"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          fullWidth
          label={"Описание"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          multiline
          fullWidth
          label={"Ссылка на картинку"}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button
          onClick={createCard}
          variant={"contained"}
          children={"Добавить"}
        />
      </form>
    </div>
  );
};

export default CreateCard;
