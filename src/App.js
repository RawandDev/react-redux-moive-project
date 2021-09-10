import React from "react";
import { Route, Switch } from "react-router-dom";
// import SearchInput from "./components/SearchInput";
// import useFetch from "./hooks/useFetch";
// import requests from "./reuqests/requests";
// import Row from "./components/Row";
// import Slider from "./containers/Slider";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/about";
import home from "./pages/home";
import actors from "./pages/actors";
import ActorDetail from "./components/ActorDetail";
import Error from "./components/Error";
import GenresPage from "./pages/genres";
import MoviesPage from "./pages/movies";
import Loader from "./components/Loader";
import signup from "./pages/signup";
import login from "./pages/login";

function App() {
  return (
    <Loader>
      <Layout>
        <Navbar />
        <Layout.Content style={{ padding: "30px" }}>
          <Switch>
            <Route path="/login" component={login} />
            <Route path="/signup" component={signup} />
            <Route path="/movies" component={MoviesPage} />
            <Route path="/genre" component={GenresPage} />
            <Route path="/about" component={About} />
            <Route path="/actors/:id" component={ActorDetail} />
            <Route path="/actors" exact component={actors} />
            <Route path="/" exact component={home} />
            <Route component={Error} />
          </Switch>
        </Layout.Content>
        <Footer />
      </Layout>
    </Loader>
  );
}

export default App;
