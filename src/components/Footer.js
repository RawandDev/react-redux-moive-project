import React from "react";
import "./Footer.css";
import {
  TwitterOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <div>
      <footer>
        <div className="content">
          <div className="top">
            <div className="logo-details">
              <span className="logo_name">{t("idk_tv")}</span>
            </div>
            <div className="media-icons">
              <a href="#test">
                <LinkedinOutlined />
              </a>
              <a href="#test">
                <TwitterOutlined />
              </a>
              <a href="#test">
                <GithubOutlined />
              </a>
            </div>
          </div>
          <div className="link-boxes">
            <ul className="box">
              <li className="link_name">{t("links")}</li>
              <li>
                <Link to="/">{t("home")}</Link>
              </li>
              <li>
                <Link to="/about">{t("about")}</Link>
              </li>
              <li>
                <Link to="/actors">{t("actors")}</Link>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">{t("techs")}</li>
              <li>
                <a href="#test">{t("api")}</a>
              </li>
              <li>
                <a href="#test">{t("react")}</a>
              </li>
              <li>
                <a href="#test">{t("ant_design")}</a>
              </li>
              <li>
                <a href="#test">{t("redux")}</a>
              </li>
            </ul>
            <ul className="box">
              <li className="link_name">{t("contact")}</li>
              <li>
                <a href="#test">+1234 567 89 00</a>
              </li>
              <li>
                <a href="#test">contact@idkTV.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom-details">
          <div className="bottom_text">
            <span className="copyright_text">{t("copyright")}</span>
            <label htmlFor="email" className="newsletter_container">
              <span>{t("subscribe")}</span>
              <input type="email" placeholder={t("email")} />
            </label>
            <span className="policy_terms">
              <a href="#test">{t("privacy_policy")}</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
