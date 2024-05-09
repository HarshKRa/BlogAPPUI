import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")

    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        alert("Logout Success")
        navigate("/login");
       }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <Link className="navbar-brand text-white mx-3" to="/">
          CodeWithHarsh's Blog APP
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>

        </button>

        <div class="collapse navbar-collapse mx-10" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto text-white">
            <li class="nav-item">
              <Link className="navbar-brand text-white" to="/">
                Home
              </Link>
            </li>

            <li class="nav-item">
              <Link className="navbar-brand text-white" to="/my-blog">
                My Blog
              </Link>
            </li>
            <li class="nav-item">
              <Link className="navbar-brand text-white" to="/add-blog">
                Add Blog
              </Link>
            </li>
            <li class="nav-item">
              <Link className="navbar-brand text-white" to="/add-category">
                Add Category
              </Link>
            </li>
          </ul>
          <div className="div-inline mx-auto my-2 my-lg-0">

            {token && token !== null ?
            (<>
            <button className="btn btn-primary">Welcome : {name} </button>
            <button className="btn btn-primary" onClick={handleLogOut}> Logout</button>
            </>)

            :
            (<>
            <Link to={"/login"}>
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to={"/register"}>
              <button className="btn btn-primary">Register</button>
            </Link>
            </>)
        }
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
