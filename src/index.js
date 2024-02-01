import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import 'boxicons';
import App from "./App";
import { AuthContextProvider } from "views/auth/context/AuthContext";
import {ChartContextProvider} from "views/admin/default/context/chartContext"
import {UsersContextProviders} from "views/admin/tables/Context/userContext"
//import { ProfilContextProvider } from "views/technicien/profil/context/profilContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
  <ChartContextProvider>
    <UsersContextProviders>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </UsersContextProviders>
  </ChartContextProvider>
  </AuthContextProvider>
);
