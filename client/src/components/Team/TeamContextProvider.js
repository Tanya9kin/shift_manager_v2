import React from "react";
import { createContext, useContext } from "react";
import axios from "axios";

const TeamContext = createContext();
export function useTeamContext() {
  return useContext(TeamContext);
}

const api = axios.create({ baseURL: "http://localhost:5000/api/team" });

export default function TeamContextProvider({ children }) {
  async function fetchTeam() {
    return api.get("/").then((res) => res.data);
  }

  return (
    <TeamContext.Provider value={fetchTeam}>{children}</TeamContext.Provider>
  );
}
