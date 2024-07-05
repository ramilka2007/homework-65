import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-dark bg-black mb-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white fw-bold" to="/">
          Static Pages
        </NavLink>

        <div className="links d-flex flex-row align-items-center justify-content-evenly">
          <NavLink className="first-link nav-link text-white" to="/">
            Home
          </NavLink>
          <hr />
          <NavLink className="nav-link text-white" to="/pages/about">
            About
          </NavLink>
          <hr />
          <NavLink className="nav-link text-white" to="/pages/contacts">
            Contacts
          </NavLink>
          <hr />
          <NavLink className="nav-link text-white" to="/pages/projects">
            Projects
          </NavLink>
          <hr />
          <NavLink className="nav-link text-white" to="/pages/partnership">
            Partnership
          </NavLink>
          <hr />
          <NavLink className="nav-link text-white" to="/pages/reviews">
            Reviews
          </NavLink>
          <hr />
          <NavLink className="nav-link text-white" to="/admin">
            Admin
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
