import React, { useEffect, useState } from 'react'
import '../Home/home.css'
import axios from 'axios';
import Footer from '../Footer/Footer';

function UserHome() {
    const [category, setCategory] = useState([]);
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        console.log("hello");
        getCategory();
        getBlog();
    }, [])

    const getCategory = () => {
        axios.get('http://localhost:3000/category/latest-category/4')
            .then(res => {
                console.log(res);
                setCategory(res.data.Category)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const getBlog = () => {
        axios.get('http://localhost:3000/blog/latest-post/4')
            .then(res => {
                console.log(res);
                setBlog(res.data.Blog);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            {/* =============BANNER============ */}

            <div className='banner'>
                <div style={{ width: '50%' }}>
                    <img className='devImg' src={require('../../assets/developer_img-removebg-preview.png')} alt='devImage'></img>
                </div>

                <div className='welcome' style={{ width: '50%' }}>

                    <p className='welTo'>Welcome to</p>
                    <h1 className='DS'>Daily Spark</h1>

                </div>
            </div>

            {/* ================LATEST CATEGORY================ */}

            <h1 className='heading'>Latest Category</h1>

            <div className='latestCat'>
                {category.map(data => (
                    <div key={data._id}>
                        <img className='Image' src={data.imageUrl} alt='ImageBlog'></img>
                        <p className='dataName' style={{ textAlign: "center", color: 'black' }}>{data.name}</p>
                    </div>
                ))}
            </div>

            {/* ==============LATEST BLOG=============== */}

            <div>
                <h1 className='headingPost'>Latest Post</h1>

                <div className='latestPost'>
                    {blog.map(data => (
                        <div key={data._id} className='postDiv'>
                            <img className='ImageBlog' src={data.imageUrl} alt='ImageBlog'></img>
                            <p className='catBlog'> Category: {data.category}</p>
                            <h5 className='dataNameBlog' style={{ color: 'yellow' }}>{data.title}</h5>
                        </div>
                    ))}
                </div>

            </div>

            {/* =======================footer================== */}
            <Footer />

        </div>
    )
}

export default UserHome