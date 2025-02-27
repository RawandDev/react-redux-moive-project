import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import genres from "../components/Genres";

const GenresPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:genre`} component={genres} />
    </Switch>
  );
};

export default GenresPage;
