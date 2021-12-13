import React from "react";
import { Routes as Switch, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as ROUTES from "./routes";
import * as VIEWS from "src/views";
import { Box } from "@chakra-ui/react";

const Routes: React.FC = () => {
  const location = useLocation();

  const routes = [
    { path: ROUTES.INDEX, Page: VIEWS.Home },
    { path: ROUTES.CHAT, Page: VIEWS.Chat },
  ];

  return (
    <TransitionGroup className="scale-container">
      <CSSTransition classNames="scale" timeout={250} key={location.key}>
        <Switch location={location}>
          {routes.map(({ path, Page }) => (
            <Route
              key={path}
              path={path}
              element={
                <Box className="scale">
                  <Page />
                </Box>
              }
            />
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routes;
