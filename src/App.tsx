import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { useAppDispatch } from "./redux/hooks";
import { fetchAuthMe } from "./redux/slices/user";
import CreateCard from "./pages/createCard/CreateCard";
import { getPosts } from "./redux/slices/post";
import Post from "./pages/fullPost/Post";
import CreateHero from "./pages/createHero/CreateHero";
import { getHero } from "./redux/slices/hero";
import FullHero from "./pages/fullHero/FullHero";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className={"App"}>
      <Header />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/heroes"} element={<Heroes />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/createCard"} element={<CreateCard />} />
        <Route path={"/createHero"} element={<CreateHero />} />
        <Route path={"/createCard/:id"} element={<CreateCard />} />
        <Route path={"/createHero/:id"} element={<CreateHero />} />
        <Route path={"/fullPost/:id"} element={<Post />} />
        <Route path={"/fullHero/:id"} element={<FullHero />} />
      </Routes>
    </div>
  );
}

export default App;
