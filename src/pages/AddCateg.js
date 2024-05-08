import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCateg = () => {
    const navigate = useNavigate()
    const[input , setInput] = useState({
        title : ""
    })

    const handleCategory = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("https://blogappbackend-1ets.onrender.com/api/v1/add/category",
            input,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            }
        );

        console.log(res)

        alert(res.data.message);
        navigate('/')
        } catch (error) {
            alert(error.response.data.message,"hello")
        }
    }
  return (
    <>
       <div className='container shadow'>
        <h2 className='text-center my-3'>Add a New Cat</h2>
        <div className='col-xl-12 my-3 d-flex items-center justify-content-center'>
            <div className='row'>
            <form onSubmit={handleCategory}>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={input.title}
                  onChange={(e)=>{
                    setInput({...input,[e.target.name] : e.target.value})
                  }}
                  id="formGroupExampleInput"
                  placeholder="Enter Title"
                />
              </div>
              
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Add Category
                </button>
              </div>
            </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default AddCateg
