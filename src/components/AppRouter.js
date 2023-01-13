import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes } from "../routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const AppRouter = () => {
  const user = false;

  return user ? (
    <Routes>
      {privateRoutes.map(({ path, Component }, index) => (
        <Route key={index} path={path} component={Component} exact={true} />
      ))}
      <Route path="" element={<Navigate to="/chat" replace />} />
    </Routes>
  ) : (
    <Routes>
      {privateRoutes.map(({ path, Component }, index) => (
        <Route key={index} path={path} component={Component} exact={true} />
      ))}
      <Route path="" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
