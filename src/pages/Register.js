import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://server-51gf.onrender.com/api/v1/users/register",
        input
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-4">Sign Up Here</h2>
        <div className="col-md-12 my-4 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={input.username}
                  onChange={(e) => {
                    setInput({ ...input, [e.target.name]: e.target.value });
                  }}
                  id="formGroupExampleInput"
                  placeholder="Enter Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={input.email}
                  onChange={(e) => {
                    setInput({ ...input, [e.target.name]: e.target.value });
                  }}
                  id="formGroupExampleInput"
                  placeholder="Enter Eamil"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={input.password}
                  onChange={(e) => {
                    setInput({ ...input, [e.target.name]: e.target.value });
                  }}
                  id="formGroupExampleInput"
                  placeholder="Enter Password"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
