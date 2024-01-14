

import React from 'react';
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
  return  <div style={{ display: 'flex', height: '37vh', overflow: 'scroll initial' }}>
  <CDBSidebar textColor="#000" backgroundColor="#fff">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
    <i class="bi bi-recycle"></i>
      <a href="/" className="text-decoration-none" style={{ color: 'inherit' }} >
         Trash Teller 
      </a>
     
    </CDBSidebarHeader>

    <CDBSidebarContent className="sidebar-content d-flex justify-content-start" >
      <CDBSidebarMenu >
        <NavLink  >
          <CDBSidebarMenuItem icon="search">Search</CDBSidebarMenuItem>
        </NavLink>
        <NavLink  >
          <CDBSidebarMenuItem icon="map">Depots Near Me</CDBSidebarMenuItem>
        </NavLink>
        <NavLink  >
          <CDBSidebarMenuItem icon="table">Guidlines</CDBSidebarMenuItem>
        </NavLink>
       

      </CDBSidebarMenu>
    </CDBSidebarContent>

  </CDBSidebar>
</div>
};

export default Sidebar;