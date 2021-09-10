/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  QuestionCircleOutlined,
  ContainerOutlined,
  VideoCameraAddOutlined,
  HomeOutlined,
  TeamOutlined,
  SettingFilled,
  GlobalOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cookie from "js-cookie";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { genres as genresApi } from "../api/tmdbApi";
import { auth } from "../firebase/firebase";

const { SubMenu } = Menu;

const languages = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ku",
    name: "کوردی",
    dir: "rtl",
  },
];

function Navbar({ genres, fetchGenres }) {
  const [current, setCurrent] = useState("mail");
  const [currentUser, setCurrentUser] = useState([]);

  const currentLanguageCode = cookie.get("i18next") || "en";
  const currentLanguage = languages.find(
    (lan) => lan.code === currentLanguageCode
  );

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      console.log("user:", user);
      setCurrentUser(user);
    });

    return subscribe;
  }, []);

  useEffect(() => {
    document.title = `${i18next.t("Movie App")} - ${currentLanguage.name}`;
    document.body.dir = currentLanguage.dir || "ltr";
  }, [currentLanguage.dir, currentLanguage.name, currentLanguage]);

  console.log("navbar currentUser:", currentUser);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const { t } = useTranslation();

  return (
    <div>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        style={{
          background: "black",
          color: "grey",
          border: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link style={{ color: "grey" }} to="/">
            {t("home")}
          </Link>
        </Menu.Item>
        <Menu.Item key="movies" icon={<VideoCameraAddOutlined />}>
          <Link style={{ color: "grey" }} to="/movies">
            {t("movies")}
          </Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
          <Link style={{ color: "grey" }} to="/about">
            {t("about")}
          </Link>
        </Menu.Item>
        <Menu.Item key="actors" icon={<TeamOutlined />}>
          <Link style={{ color: "grey" }} to="/actors">
            {t("actors")}
          </Link>
        </Menu.Item>
        {genres?.length > 0 && (
          <SubMenu
            style={{ color: "grey" }}
            key="genres"
            icon={<ContainerOutlined />}
            title="Genres"
          >
            {genres.map((genre) => (
              <Menu.Item key={genre.id}>
                <Link to={`/movies?genre=${genre.id}`}>{genre.name}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        )}
        <SubMenu
          style={{ color: "grey" }}
          key="User"
          icon={<SettingFilled />}
          title="User"
        >
          <Menu.ItemGroup
            title={`${currentUser ? currentUser?.email : "Default User"}`}
          />
          <Menu.Item key="setting:2">
            <Link to="/login">{t("login")}</Link>
          </Menu.Item>

          <Menu.Item key="setting:3">
            <Link to="/signup">{t("signup")}</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          style={{ color: "white" }}
          key="langs"
          icon={<GlobalOutlined />}
          title={t("langs")}
        >
          <Menu.ItemGroup title={t("switch_langs")}>
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                <button
                  type="button"
                  onClick={() => i18next.changeLanguage(language.code)}
                  disabled={currentLanguage.code === language.code}
                  style={{
                    background: "none",
                    border: "none",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    width: "100%",
                    opacity: `${
                      currentLanguage.code === language.code ? "0.4" : "1"
                    }`,
                  }}
                >
                  {language.name}
                </button>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
}

const mapStateToProps = ({ tmdb: { genres } }) => ({ genres });
const mapDispatchToProps = {
  fetchGenres: genresApi.fetchMovieGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
