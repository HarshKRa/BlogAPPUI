import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const res = await axios.get(
        `http://localhost:9000/api/v1/get/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setBlog(res.data);
    };

    fetchSingleBlog();
  }, [id]);

  return (
    <>
      <div className="container shadow my-3">
        <div className="col-md-12 d-flex items-center justify-content-center bg-light">
          <div className="row">
            <h1 className="my-3">{blog.title}</h1>

            <img
              src={`http://localhost:9000/${blog.thumbnail}`}
              className="img img-responsive img-arounded my-3"
              alt=""
            ></img>

            <p className="my-3">{blog.description}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary btn-block mx-auto"
        >
          Back To post
        </button>
      </div>
    </>
  );
};

export default SingleBlog;
