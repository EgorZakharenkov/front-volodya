import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { LiaComments } from "react-icons/lia";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "../../axios/axiosBase";
import { removeItem } from "../../redux/slices/post";
import { useNavigate } from "react-router";
import { removeHero } from "../../redux/slices/hero";

type Props = {
  id: string;
  title: string;
  name?: string; // Изменено на необязательное значение
  description: string;
  image: string;
  comments?: string[];
  hero?: boolean;
};

const CustomCard: React.FC<Props> = ({
  id,
  title,
  image,
  name,
  comments,
  description,
  hero,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.user.data);
  const handleDelete = () => {
    if (hero) {
      axios.delete(`/hero/${id}`);
      dispatch(removeHero(id));
    } else {
      axios.delete(`/post/${id}`);
      dispatch(removeItem(id));
    }
  };
  const handleCheck = () => {
    if (hero) {
      navigate(`/fullHero/${id}`);
    } else {
      navigate(`/fullPost/${id}`);
    }
  };
  const handleEdit = () => {
    if (hero) {
      navigate(`/createHero/${id}`);
    } else {
      navigate(`/createCard/${id}`);
    }
  };
  return (
    <Card sx={{ width: 430 }}>
      {role && role.role === "admin" && (
        <div>
          <Button
            onClick={handleDelete}
            color={"warning"}
            children={"удалить"}
          />
          <Button onClick={handleEdit} children={"изменить"} />
        </div>
      )}
      <CardContent>
        <Typography sx={{ minHeight: '96px' }} variant="h6">{title}</Typography>
      </CardContent>
      <CardMedia
        sx={{ height: '90%', width: '100%', objectFit: "cover", objectPosition: 'center' }}
        onClick={handleCheck}
        component="img"
        height="250"
        image={image}
        style={{ objectFit: "cover" }}
      />
      {/*{comments && (*/}
      {/*  <IconButton>*/}
      {/*    {" "}*/}
      {/*    <LiaComments /> - {comments.length}*/}
      {/*  </IconButton>*/}
      {/*)}*/}

    </Card>
  );
};

export default CustomCard;
