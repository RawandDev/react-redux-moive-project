import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import MoviesContainer from "../containers/MoviesContainer";
import SingleMovieContainer from "../containers/SingleMovieContainer";

const MoviesPage = () => {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <Switch>
      <Route exact path={path}>
        <MoviesContainer />
      </Route>
      <Route exact path={`${path}/search`}>
        <MoviesContainer search />
      </Route>
      <Route path={`${path}/:id`}>
        <SingleMovieContainer />
      </Route>
    </Switch>
  );
};

export default MoviesPage;
