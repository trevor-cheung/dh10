

import React from 'react';
import Logo from "../assets/Group_4.svg"
import "bootstrap-icons/font/bootstrap-icons.css"
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return  <div style={{ display: 'flex', overflow: 'scroll initial' }}>
  <CDBSidebar textColor="#000" backgroundColor="#fff">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
    <img src={Logo} className='mx-2' style={{width: 30, height: 30}} alt="React Logo" />
      <a href="/" className="text-decoration-none" style={{ color: 'inherit' }} >
         Trash Teller 
      </a>
     
    </CDBSidebarHeader>

    <CDBSidebarContent className="sidebar-content d-flex justify-content-start" >
      <CDBSidebarMenu >
        <NavLink  to="/" >
          <CDBSidebarMenuItem icon="search">Search</CDBSidebarMenuItem>
        </NavLink>
        <NavLink  to="/depots" >
          <CDBSidebarMenuItem icon="map">Depots Near Me</CDBSidebarMenuItem>
        </NavLink>
        <NavLink  to = "/guidelines" >
          <CDBSidebarMenuItem icon="table">Guidelines</CDBSidebarMenuItem>
        </NavLink>
       

      </CDBSidebarMenu>
    </CDBSidebarContent>

  </CDBSidebar>
</div>
};

export default Sidebar;