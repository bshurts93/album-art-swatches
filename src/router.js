import React from "react";
import { Route, Switch } from "react-router-dom";
// Views
import HomeView from "@views/HomeView";
import SearchView from "@views/SearchView";
import RedirectView from "@views/RedirectView";
import NotFoundView from "@views/NotFoundView";

const Router = (props) => {
  return (
    <Switch>
      <Route path="/" component={HomeView} exact={true} />
      <Route path="/redirect" component={RedirectView} />
      <Route path="/search" component={SearchView} />
      <Route component={NotFoundView} />
    </Switch>
  );
};
export default Router;
