import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./style.module.scss";
import axios from "../../axios/axiosBase";
import { useNavigate } from "react-router";
const CreateCard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const createCard = () => {
    axios.post("/post", { title, description, image });
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={createCard} className={styles.form}>
        <TextField
          label={"Заголовок"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label={"Описание"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
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
