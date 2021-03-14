import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Views
import HomeView from "@views/HomeView";
import SwatchView from "@views/SwatchView";
import SearchView from "@views/SearchView";
import RedirectView from "@views/RedirectView";
import NotFoundView from "@views/NotFoundView";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={HomeView} exact={true} />
            <Route path="/redirect" component={RedirectView} />
            <Route path="/search" component={SearchView} />
            <Route path="/swatch" component={SwatchView} />
            <Route component={NotFoundView} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default AppRouter;
