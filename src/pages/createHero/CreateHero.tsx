import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from "./style.module.scss";
import axios from "../../axios/axiosBase";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
const CreateHero = () => {
  const { id } = useParams();
  const [fullName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const createCard = () => {
    id
      ? axios.put(`/hero/${id}`, { image, description, fullName })
      : axios.post("/hero", { fullName, description, image });
    navigate(`/fullHero/${id}`);
  };
  useEffect(() => {
    axios.get(`/hero/${id}`).then(({ data }) => {
      setName(data.hero.fullName);
      setImage(data.hero.image);
      setDescription(data.hero.description);
    });
  }, []);
  return (
    <div>
      <form onSubmit={createCard} className={styles.form}>
        <TextField
          fullWidth
          multiline
          label={"Имя"}
          value={fullName}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          label={"Описание"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
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

export default CreateHero;
