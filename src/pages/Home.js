import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data);
      console.log(res);
    };
    fetchAllBlogs();
  }, []);
  return (
    <>
      <main class="my-5">
        <div class="container shadow-lg">
          <section class="text-center">
            <h2 class="mb-5 my-3">
              <strong>Latest Post</strong>
            </h2>

            <div class="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => {
                  return (
                    // <div class="col-lg-4 col-md-12 mb-4" data-bs-spy="scroll">
                    <div class="p-2 col-lg-4 col-md-12 mb-4">
                      <div class="card px-4">
                        <div
                          class="bg-image hover-overlay ripple py-3"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={`http://localhost:9000/${item.thumbnail}`}
                            class="img-fluid"
                            alt="Please Check Internet Connection"
                            style={{height:"200px",width:"200px"}}
                          />
                          <a href="#!">
                            <div
                              class="mask"
                              style={{
                                backgroundColor: "rgba(251,251,251,0.15)",
                              }}
                            ></div>
                          </a>
                          <div class="crad-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text" style={{height:"300px", overflow:"hidden"}}>{item.description}</p>
                            <Link
                              to={`/blog/${item._id}`}
                              class="btn btn-primary"
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
