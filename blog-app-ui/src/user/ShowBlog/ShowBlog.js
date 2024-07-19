import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../ShowBlog/showblog.css'


function ShowBlog() {

    const [blog, setBlog] = useState([]);

    useEffect(() => {
        // console.log('hello');
        // getBlogDetailsById();
        getBlogById()
    })


    const getBlogById = () => {
        axios.get('http://localhost:3000/blog/6693a939ea7eb7f649b503ab')
            .then(res => {
                console.log(res.data);
                setBlog(res.data.blog);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>

            <div className='show1'>

                <div className='show2'>
                    {blog.map(data => (
                        <div key={data._id} className='show3'>
                            <img className='show4' src={data.imageUrl} alt='ImageBlog'></img>
                            <p className='show5'>{data.category}</p>
                            <h5 className='show6' style={{ color: 'Black' }}>{data.title}</h5>
                            <h5 style={{ color: 'Black' }}>{data.description}</h5>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default ShowBlog