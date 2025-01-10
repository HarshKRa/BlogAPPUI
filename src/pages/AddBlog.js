import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { uploadToCloudnary } from "../UploaOnCloud";

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    category: "",
    description: "",
    flag: false,
    thumbnail: "",
  });

  console.log(input);

  const [category, setCategory] = useState([]);
  const [uploadImage, setUploadImage] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadToCloudnary(file);
    setInput({ ...input, [e.target.name]: image });
    setUploadImage(false);
  };

  useEffect(() => {
    const fetchAllCategory = async () => {
      const res = await axios.get(
        "https://server-51gf.onrender.com/api/v1/get/categories",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategory(res?.data);
    };

    fetchAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://server-51gf.onrender.com/api/v1/add/blog",
        input,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      alert(res.data.massage || "blog added successfully");
      navigate("/");
    } catch (error) {
      alert(error.response.data.massage || "blog not added");
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
                  <option>Select Category</option>
                  {category &&
                    category.map((item) => {
                      return <option value={item._id}>{item.title} </option>;
                    })}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Public
                </label>
                <select
                  className="form-control"
                  name="flag"
                  value={input.flag}
                  onChange={(e) => {
                    setInput({ ...input, [e.target.name]: e.target.value });
                  }}
                >
                  <option disabled>Select Category</option>
                  <option value="true">true</option>;
                  <option value="false">false</option>;
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Blog Description"
                  className="form-control"
                  value={input.description}
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
                  onChange={handleImageChange}
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Select Thumbnail"
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mb-3"
              >
                <button
                  disabled={uploadImage}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Add Blog
                </button>
                {input.thumbnail && (
                  <img
                    style={{
                      marginLeft: "50px",
                      height: "30px",
                      width: "30px",
                    }}
                    src={input.thumbnail}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
