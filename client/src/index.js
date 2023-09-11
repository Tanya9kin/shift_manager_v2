import React from "react";
import { Theme } from "@radix-ui/themes";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import CalendarContextProvider from "./components/Dashboard/CalendarFunction";
import TeamContextProvider from "./components/Team/TeamContextProvider";
import Team from "./components/Team/Team.js";
import Dashborad from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Theme appearance="light">
        <Navbar />
        <App />
      </Theme>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <CalendarContextProvider>
            <Dashborad />
          </CalendarContextProvider>
        ),
      },
      {
        path: "Team",
        element: (
          <TeamContextProvider>
            <Team />
          </TeamContextProvider>
        ),
      },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
