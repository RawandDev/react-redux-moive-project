import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ActorsContainer from "../containers/ActorsContainer";
import SingleActorContainer from "../containers/SingleActorContainer";

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
      <Route path={`${path}/:id`}>
        <SingleActorContainer />
      </Route>
    </Switch>
  );
}

export default ActorsPage;
