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
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { genres as genresApi } from "../api/tmdbApi";
import { auth } from "../firebase/firebase";

const { SubMenu } = Menu;

function Navbar({ genres, fetchGenres }) {
  const [current, setCurrent] = useState("mail");
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);
  useEffect(() => {
    const subscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return subscribe;
  }, []);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
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
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="movies" icon={<VideoCameraAddOutlined />}>
          <Link style={{ color: "grey" }} to="/movies">
            Movies
          </Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
          <Link style={{ color: "grey" }} to="/about">
            About
          </Link>
        </Menu.Item>
        <Menu.Item key="actors" icon={<TeamOutlined />}>
          <Link style={{ color: "grey" }} to="/actors">
            Actors
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
            <Link to="/login">Log In</Link>
          </Menu.Item>

          <Menu.Item key="setting:3">
            <Link to="/signup">Sign Up</Link>
          </Menu.Item>
        </SubMenu>
        {/* {currentUser && currentUser?.email} */}
        {/* <button type="button">Log Out</button> */}
      </Menu>
    </div>
  );
}

const mapStateToProps = ({ tmdb: { genres } }) => ({ genres });
const mapDispatchToProps = {
  fetchGenres: genresApi.fetchMovieGenres,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
