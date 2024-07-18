import { FC } from "react";

import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar: FC = () => {
  return (
    <nav className="navbar">
      <div className="list-wrapper">
        <ul className="list">
          <li className="list-item">
            <Link to="/getroles">получить роли</Link>
          </li>
          <li className="list-item">
            <Link to="/">зарегистрироваться</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
