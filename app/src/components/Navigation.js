import { SideNav, SideNavItem } from '@leafygreen-ui/side-nav';
import { Link, useLocation } from "react-router-dom";

export default function Navigation ({ className }) {
  const location = useLocation();

  return (
    <SideNav aria-label="Navigation Bar" className={className}>
      <SideNavItem aria-label="Lista wiadomości" as={Link} active={location.pathname === "/"} to="/">Lista wiadomości</SideNavItem>
      <SideNavItem aria-label="Nowa wiadomość" as={Link} active={location.pathname === "/create-message"} to="/create-message">Nowa wiadomość</SideNavItem>
      <SideNavItem aria-label="Nowy student" as={Link} active={location.pathname === "/create-student"} to="/create-student">Nowy student</SideNavItem>
      <SideNavItem aria-label="Studenci" as={Link} active={location.pathname === "/students"} to="/students">Studenci</SideNavItem>
      <SideNavItem aria-label="Studenci" as={Link} active={location.pathname === "/message/student/:id"} to="/message/student/:id">Wyszukaj studenta po Msg ID</SideNavItem>
    </SideNav>
  );
}