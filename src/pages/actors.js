import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ActorsContainer from "../containers/ActorsContainer";

function ActorsPage() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <ActorsContainer />
      </Route>
      <Route exact path={`${path}/search`}>
        <ActorsContainer search />
      </Route>
      {/* <Route path={`${path}/:id`}>
        <SingleMovieContainer />
      </Route> */}
    </Switch>
  );
}

export default ActorsPage;
