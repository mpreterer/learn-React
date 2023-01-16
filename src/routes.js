import Chat from "./components/Chat";
import Login from "./components/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/consts";

const privateRoutes = [
  { path: CHAT_ROUTE, element: <Chat />, exact: true },
];

const publicRoutes = [{ path: LOGIN_ROUTE, element: <Login />, exact: true }];

export { privateRoutes, publicRoutes };