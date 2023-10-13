import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './HomeCSS.css';

const Home = () => {
    const [Post, setPost] = useState([]);

    const fetchAllPost = async () => {
        try {
            const response = await axios.get('http://localhost:5500/api/v2/get/allphotos');
            setPost(response.data.message);
            console.log(response.data.message);
        } catch (e) {
            console.log("Error While Fetching All Post : ", e);
        }
    }

    useEffect(() => {
        return()=>{
            fetchAllPost();
        }
    }, []);

    return (
        <div className='Home'>
            {Post ? (
                <>
                    {
                        Post.map((value, key) => (
                            <div className='single-post-div' key={key}>
                                <div className='user-of-post'>
                                    <div>
                                    <img src={value.user.image} alt="" />
                                    </div>
                                    <div>
                                    <p style={{fontWeight: 500}}>{value.user.name}</p>
                                    </div>
                                </div>
                                <div className='post'>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                <img src={value.image} alt="" />
                                    </div>
                                <p className="caption"><span style={{color: "gray"}}>{value.user.name +" "}</span>{value.caption}</p>
                                </div>
                            </div>
                        ))
                    }
                </>
            ) : (<div className='loader'><h2>Loading...</h2></div>)}
        </div>
    );
}

export default Home;
