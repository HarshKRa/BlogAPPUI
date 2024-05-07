import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    discription: "",
    category: "",
  });

  const [file, setFile] = useState([]);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchAllCategory = async () => {
      const res = await axios.get(
        "http://localhost:9000/api/v1/get/categories",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategory(res.data);
    };

    fetchAllCategory();
  }, []);

  // creating a form data
  const formdata = new FormData();

  formdata.append("title", input.title);
  formdata.append("category", input.category);
  formdata.append("description", input.discription);
  formdata.append("thumbnail", file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/add/blog",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      alert(res.data.massage);
      navigate("/");
    } catch (error) {
      alert(error.response.data.massage);
    }
  };

  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Add a New Blog</h2>
        <div className="col-xl-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={input.title}
                  onChange={(e) => {
                    setInput({ ...input, [e.target.name]: e.target.value });
                  }}
                  id="formGroupExampleInput"
                  placeholder="Blog Title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  name="category"
                  onChange={(e) => {
                    setInput({ ...input, [e.target.name]: e.target.value });
                  }}
                >
                  <option disabled>Select Category</option>
                  {category &&
                    category.map((item) => {
                      return <option value={item._id}>{item.title} </option>;
                    })}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Description
                </label>
                <textarea
                  name="discription"
                  placeholder="Blog Description"
                  className="form-control"
                  value={input.discription}
                  onChange={(e) => {
                    setInput({ ...input, [e.target.name]: e.target.value });
                  }}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Thumbnail
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Select Thumbnail"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
