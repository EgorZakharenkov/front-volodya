import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.register}>
      <TextField placeholder={"email"} />
      <TextField placeholder={"пароль"} />
      <Button />
    </div>
  );
};

export default Register;
