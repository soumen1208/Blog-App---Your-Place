import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../BlogList/bloglist.css'
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function BlogList() {

    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getBlogs();
    }, [])

    const getBlogs = () => {
        axios.get('http://localhost:3000/blog')
            .then(res => {
                console.log(res.data.blogs);
                setBlogs(res.data.blogs.reverse());
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteBlog = (blogData) => {
        if (window.confirm('Are you sure want to delete ?')) {

            const storage = getStorage(app)
            const myRef = ref(storage, `${blogData.imageUrl}`)

            deleteObject(myRef)

                .then(result => {
                    axios.delete('http://localhost:3000/blog/' + blogData._id, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem('token')
                        }
                    })
                        .then(result => {
                            console.log(result);
                            getBlogs();
                        })
                        .catch(err => {
                            console.log(err);
                        })

                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className='blogContainer'>
            {blogs.map(data => (
                <div key={data._id} className='blogContain'>

                    <div className='blogDiv1' style={{ fontFamily: 'fantasy', color: 'white' }}>
                        <p>{data.title}</p>
                    </div>

                    <div className='blogDiv2'>
                        <img className='blogImg' src={data.imageUrl} alt='blogImage'></img>
                    </div>

                    <div className='blogDiv2'>
                        <button onClick={() => { navigate('/admin/dashboard/edit-blog', { state: { myData: data } }) }} className='editBtnBlog' type='submit'>Edit</button>
                    </div>
                    <div className='blogDiv2'>
                        <button onClick={() => { deleteBlog(data) }} className='deleteBtnBlog' type='submit'>Delete</button>
                    </div>

                </div >
            ))
            }
        </div >
    )
}

export default BlogList