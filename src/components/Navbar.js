import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import {
  HomeTwoTone,
  SmileTwoTone,
  QuestionCircleTwoTone,
  ContainerTwoTone,
  GlobalOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookie from "js-cookie";
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

function Navbar() {
  const [current, setCurrent] = useState("mail");
  const [currentUser, setCurrentUser] = useState([]);

  const currentLanguageCode = cookie.get("i18next") || "en";
  const currentLanguage = languages.find(
    (lan) => lan.code === currentLanguageCode
  );

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
          color: "white",
          border: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Menu.Item key="home" icon={<HomeTwoTone />}>
          <Link style={{ color: "white" }} to="/">
            {t("home")}
          </Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<QuestionCircleTwoTone />}>
          <Link style={{ color: "white" }} to="/about">
            {t("about")}
          </Link>
        </Menu.Item>
        <Menu.Item key="actors" icon={<SmileTwoTone />}>
          <Link style={{ color: "white" }} to="/actors">
            {t("actors")}
          </Link>
        </Menu.Item>
        <SubMenu
          style={{ color: "white" }}
          key="genres"
          icon={<ContainerTwoTone />}
          title={t("genres")}
        >
          <Menu.ItemGroup title="Actions">
            <Menu.Item key="setting:1">
              <Link to="/genre/35">{t("actions")}</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Top Rated">
            <Menu.Item key="setting:2">{t("top_rated")}</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Animation">
            <Menu.Item key="setting:3">
              <Link to="/genre/16">{t("animations")}</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          style={{ color: "white" }}
          key="User"
          icon={<ContainerTwoTone />}
          title={t("users")}
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

export default Navbar;
