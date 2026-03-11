import { createBrowserRouter } from "react-router";
import { ListPage } from "./components/ListPage";
import { DetailPage } from "./components/DetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ListPage,
  },
  {
    path: "/detail/:id",
    Component: DetailPage,
  },
]);
