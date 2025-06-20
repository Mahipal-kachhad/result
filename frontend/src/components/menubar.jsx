import { NavLink } from "react-router-dom";

const Menubar = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 navbar-main py-3">
      <div className="w-fit mx-2">
        <NavLink
          to={"/Form"}
          className={({ isActive }) =>
            `${isActive ? "active " : ""} px-3 py-2 rounded`
          }
        >
          Form
        </NavLink>
      </div>
      <div className="w-fit mx-2">
        <NavLink
          to={"/Data"}
          className={({ isActive }) =>
            `${isActive ? "active " : ""} px-3 py-2 rounded`
          }
        >
          Data
        </NavLink>
      </div>
    </div>
  );
};

export default Menubar;
