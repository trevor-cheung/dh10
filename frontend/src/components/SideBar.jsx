import React from "react";


import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
//import { Link } from "react-router-dom";

import SubMenu from "./Submenu";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3>Bootstrap Sidebar</h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Dummy Heading</p>
        <SubMenu title="Home"  items={submenus[0]} />
        <NavItem>
          <NavLink>
            
            About
          </NavLink>
        </NavItem>
        <SubMenu title="Pages"  items={submenus[1]} />
        <NavItem>
          <NavLink >
          
            Portfolio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink >
           
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink >
           
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Home 1",
      target: "Home-1",
    },
    {
      title: "Home 2",
      target: "Home-2",
    },
    {
      title: "Home 3",
      target: "Home-3",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default SideBar;
