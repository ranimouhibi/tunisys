import React from "react";
import Dashboard from "views/admin/default";
import Profile from "views/admin/profile";
import ModifierProfile from "views/admin/profile/components/ModifyModal"
import UserForm from "views/admin/tables/addUser";
import SignIn from "views/auth/SignIn";
import Conges from "./views/admin/Conges/Conges";
import {
  MdEscalator,
  MdHome,
  MdPerson,
  MdEventAvailable,
  MdLogout,
  MdHelp,
  MdHistory,
  MdCalendarToday,
  MdList
  
} from "react-icons/md";
import SignUp from "views/auth/Signup";
import Tables from "views/admin/tables";
import Calendrier from "views/admin/calendrier/calendrier";
import Historique from "views/admin/historique/historique";
import ListDemande from "views/admin/listeDemande/ListDemande";



const routes = [
  
  {
    name: "Acceuil",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route


  },
  {
    name: "Demandes",
    layout: "/admin",
    path: "demandes",
    icon: <MdList className="h-6 w-6" />,
    component: <ListDemande />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route


  },
  {
    name: "Compte",
    layout: "/admin",
    path: "compte",
    icon: <MdHome className="h-6 w-6" />,
    component: <UserForm />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route


  },
  {
    name: "Acceuil",
    layout: "/admin",
    path: "",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route


  },
  

  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },
  {
    name: "Log out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },
  

  {
    name: "sign up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignUp />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },
 
  {
    name: "modifierprofile",
    layout: "/admin",
    path: "modifier",
    icon: <MdHelp className="h-6 w-6" />,
    component: <ModifierProfile/>,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },
  {
    name: "Employee",
    layout: "/admin",
    path: "employee",
    icon: <MdHelp className="h-6 w-6" />,
    component: <Tables/>,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },
  
  {
    name: "Calendrier",
    layout: "/admin",
    path: "calendrier",
    icon: <MdCalendarToday className="h-6 w-6" />,
    component: <Calendrier/>,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },

  {
    name: "Historique",
    layout: "/admin",
    path: "historique",
    icon: <MdHistory className="h-6 w-6" />,
    component: <Historique/>,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },
  {
    name: "Conges et abscences",
    layout: "/admin",
    path: "conges",
    icon: <MdEscalator className="h-6 w-6" />,
    component: <Conges/>,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },

];
export default routes;
