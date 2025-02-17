import { useContext, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };



  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">QLinhbooking</span>
        </Link>
        {user ? (
          <div className="userMenu">
            <span 
              className="username" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {user.email}
            </span>
            {showDropdown && (
              <div className="dropdown">
                <div className="dropdownItem" onClick={() => navigate("/profile")}>
                  Personal Information
                </div>
                <div className="dropdownItem" onClick={() => navigate("/bookings")}>
                  Booked Hotels
                </div>
                <div className="dropdownItem" onClick={handleLogout}>
                  Log Out
                </div>
              </div>
            )}
          </div>
        ) : (

          <div className="navItems">
            <button 
              className="navButton"
              onClick={() => {
                dispatch({ type: "SWITCH_LOGIN_VIEW", payload: "register" });
                navigate("/login");
              }}
            >
              Register
            </button>
            <button 
              className="navButton"
              onClick={() => {
                dispatch({ type: "SWITCH_LOGIN_VIEW", payload: "login" });
                navigate("/login");
              }}
            >
              Login
            </button>

          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
