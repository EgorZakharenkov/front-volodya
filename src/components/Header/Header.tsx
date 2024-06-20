import React, { useEffect, useRef, useState } from "react";
import {
  alpha,
  AppBar,
  Box,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchItem } from "../../redux/slices/post";
import { searchHero } from "../../redux/slices/hero";
import { logout } from "../../redux/slices/user";
const Header = () => {
  const links: {
    label: string;
    path: string;
  }[] = [
      { label: "Главная", path: "/" },
      { label: "Герои", path: "/heroes" },
      // { label: "Вход", path: "/register" },
    ];

  const adminLinks: {
    label: string;
    path: string;
  }[] = [
      { label: "Создать героя", path: "/createHero" },
      { label: "Создать статью", path: "/createCard" },
    ];
  const [search, setSearch] = useState("");

  const user = useAppSelector((state) => state.user.data);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  const handleSearch = () => {
    dispatch(searchItem(search));
  };
  const handleSearchHero = () => {
    dispatch(searchHero(search));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleHero = (e: any) => {
    if (e.key === "Enter") {
      handleSearchHero();
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  const handleExit = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "red" }} position="static">
        <Toolbar className={styles.container}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link style={{ color: "#fff" }} to={"/"}> Афганская Война</Link>
          </Typography>
          <div className={styles.links}>
            {user &&
              user.role === "admin" &&
              adminLinks.map((link) => (
                <Link
                  className={classNames(styles.link, {
                    [styles.active]: link.path === location.pathname,
                  })}
                  to={link.path}
                >
                  {link.label}
                </Link>
              ))}
            {links.map((link) => (
              <Link
                className={classNames(styles.link, {
                  [styles.active]: link.path === location.pathname,
                })}
                to={link.path}
              >
                {link.label}
              </Link>
            ))}
            {user ? <Link
              className={styles.link}
              onClick={() => handleExit()}
              to={"/register"}

            >
              Выйти
            </Link> : <Link to="/register">Вход</Link>}


          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск…"
              onKeyDown={
                location.pathname.includes("heroes")
                  ? handleHero
                  : handleKeyDown
              }
              inputProps={{ "aria-label": "search", ref: inputRef }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
