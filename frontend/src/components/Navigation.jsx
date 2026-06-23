import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/hub" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="icon">🧭</span>
        <span>Descubrir</span>
      </NavLink>
      <NavLink to="/journey" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="icon">🗺️</span>
        <span>Progreso</span>
      </NavLink>
      <NavLink to="/community" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="icon">👥</span>
        <span>Comunidad</span>
      </NavLink>
    </nav>
  );
}

export default Navigation;
