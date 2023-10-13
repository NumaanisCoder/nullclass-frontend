import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./ProfileCSS.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const useridtoken = Cookies.get("token");
  const navigate = useNavigate();
  const [User, setUser] = useState(null);
  const [MyPhotos, setMyPhotos] = useState(null);
  const [MyTexts, setMyTexts] = useState(null);
  const [PicSubmit, setPicSubmit] = useState("Post");
  let picFormData = new FormData();
  let textFormData = new FormData();
  const resetForm = () => {
    picFormData = new FormData();
    setPicSubmit("Post");
  };

  const fetchData = async () => {
    try {
      setTimeout(() => {}, 1000);
      const response = await axios.get(
        `http://localhost:5500/api/v1/getuserdetail/${useridtoken}`
      );
      setUser(response.data.message);
      setMyPhotos(response.data.message.post.photos);
      console.log(response.data.message.post.photos);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if(!useridtoken){
      navigate("/login");
    }
    return () => {
      fetchData();
    };
  }, []);
  return (
    <div>
      {User ? (
        <>
          <div className="main-details">
            <div className="user-profile-pic-div">
              <img className="user-image" src={User.image} alt="" />
            </div>
            <div className="user-details">
              <div>
                <p style={{ fontWeight: 500, color: "blue" }}>
                  <span style={{ color: "white" }}>{User.name}</span>
                </p>
                <p style={{ fontWeight: 500, color: "blue" }}>
                  <span style={{ color: "white" }}>{User.email}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="uploadForm">
            <div>
              <details className="details-tag">
                <summary>Upload Photo</summary>
                <form
                  className="photo-upload-div"
                  onSubmit={async (e) => {
                    for (const [key, value] of picFormData.entries()) {
                      console.log(`${key}:${value}`);
                    }
                    setPicSubmit("Posting");
                    e.preventDefault();
                    
                    try {
                      const response = await fetch(`http://localhost:5500/api/v2/upload/singlephoto/${useridtoken}`, {
                        method: 'POST',
                        body: picFormData,
                      });
                  
                      if (!response.ok) {
                        throw new Error('Failed to upload photo');
                      }
                  
                      const responseData = await response.json();
                  
                      if (responseData.message === "photo uploaded successfully") {
                        setPicSubmit("Posted");
                        setTimeout(() => {
                          resetForm();
                        }, 1000);
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  
                 
                  
                  
                  
                  
                  
                  
                    
                  }}
                >
                  <h3>Upload Pic Post</h3>
                  <input
                    type="file"
                    onChange={(e) => {
                      picFormData.set("image", e.target.files[0]);
                      console.log(picFormData);
                    }}
                    name=""
                    id=""
                    value={picFormData.get("file")}
                  />
                  <textarea
                    name=""
                    id=""
                    cols="20"
                    rows="2"
                    placeholder="Enter Caption"
                    onChange={(e) => {
                      picFormData.set("caption", e.target.value);
                    }}
                    value={picFormData.get("caption")}
                  ></textarea>
                  <button className="post-submit-btn">{PicSubmit}</button>
                </form>
              </details>
            </div>
            <div>
              <details className="details-tag">
                <summary>Upload Text</summary>
                <form
                  className="photo-upload-div"
                  onSubmit={async (e) => {
                    for (const [key, value] of textFormData.entries()) {
                      console.log(`${key}:${value}`);
                    }
                    setPicSubmit("Posting");
                    e.preventDefault();
                    const response = await axios.post(
                      `http://localhost:5500/api/v3/upload/singletext/${useridtoken}`,
                      textFormData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    if (response.data.message === "Text Posted Successfully") {
                      setPicSubmit("Posted");
                      setTimeout(() => {
                        resetForm();
                      }, 500);
                    }
                  }}
                >
                  <h3>Upload Text Post</h3>

                  <textarea
                    name=""
                    id=""
                    cols="20"
                    rows="2"
                    placeholder="Enter Text.."
                    onChange={(e) => {
                      textFormData.set("text", e.target.value);
                    }}
                    value={picFormData.get("caption")}
                  ></textarea>
                  <button className="post-submit-btn">{PicSubmit}</button>
                </form>
              </details>
            </div>

            <div className="user-post">
                  <h3 className="photos-header">My Photos <i class="fa-solid fa-image"></i></h3>
                <div className="user-photos">
                    {MyPhotos.map((value, key) => (
                      <div className="single-my-post">
                        <div>
                          <img src={value.image} alt="" />
                        </div>
                      </div>
                    ))}
                  
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Profile;
