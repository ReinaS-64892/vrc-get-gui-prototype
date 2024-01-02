import ReactDOM from "react-dom/client";
import "./styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import SideBar from "./app/SideBar/SideBar";
import Projects from "./app/MenuPage/Projects";
import ManageProject from "./app/ProjectManage/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className=" flex">
        <SideBar /> <Projects />
      </ div>
    ),
  },
  {
    path: "/ProjectManage",
    element: (
      <div className=" flex">
        <SideBar /> <ManageProject />
      </div>
    ),
  },
]);

let root = document.getElementById("root");

if (root === null) { } else {

  ReactDOM.createRoot(root).render(
      <RouterProvider router={router} />
  );
}