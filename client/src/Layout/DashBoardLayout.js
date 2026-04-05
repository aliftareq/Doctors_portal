import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import NavBar from "../Pages/Shared/NavBar/NavBar";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  const navLinkClass = ({ isActive }) =>
    `block w-full rounded-lg px-5 py-4 text-left font-semibold uppercase tracking-wide transition-all duration-200 ${
      isActive
        ? "bg-[#3A4256] text-white"
        : "bg-[#3A4256] text-white hover:bg-[#2f3647]"
    }`;

  return (
    <div>
      <NavBar />

      <div className="drawer drawer-mobile">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content p-4">
          <Outlet />
        </div>

        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

          <div className="w-72 min-h-full bg-base-100 lg:bg-transparent p-4">
            <ul className="space-y-3">
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  My Appointments
                </NavLink>
              </li>

              {isAdmin && (
                <>
                  <li>
                    <NavLink to="/dashboard/users" className={navLinkClass}>
                      All Users
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/add-doctor" className={navLinkClass}>
                      Add Doctor
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-doctors"
                      className={navLinkClass}
                    >
                      Manage Doctors
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;