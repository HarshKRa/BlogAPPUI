import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const res = await axios.get(
        `https://server-51gf.onrender.com/api/v1/get/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBlog(res?.data);
    };

    fetchSingleBlog();
  }, [id]);

  return (
    <>
      {blog == null ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : (
        <div
          className="container shadow my-3"
          style={{ paddingBottom: "50px" }}
        >
          <div className="col-md-12 d-flex items-center justify-content-center bg-light">
            <div className="row">
              <h1 style={{ textAlign: "center" }} className="my-3">
                {blog.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={blog.thumbnail}
                  className="img img-responsive img-arounded my-3"
                  style={{ height: "40vh", width: "30vw" }}
                  alt=""
                />
              </div>

              <div
                style={{
                  width: "80%",
                  margin: "auto",
                }}
              >
                <p className="my-3">{blog.description}</p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary btn-block mx-auto"
            >
              Back To post
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
