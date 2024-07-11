import React, { useEffect, useState } from 'react'
import '../AddBlog.js/addblog.css'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { app } from '../../firebase';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

function AddBlog() {

    const [blogTitle, setBlogTitle] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [blog, setBlog] = useState('');
    const [categoryList, setCategoryList] = useState([])
    const [file, setFile] = useState(null);
    const [imageUrl, setInamgeUrl] = useState(null);

    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        getCategoryData();
        console.log(location.state);
        if (location.state != null) {
            setBlogTitle(location.state.myData.title)
            setBlog(location.state.myData.description)
            setCategoryName(location.state.myData.category)
            setInamgeUrl(location.state.myData.imageUrl)
        }
    }, [location.state])

    const getCategoryData = () => {
        axios.get('http://localhost:3000/category')
            .then(res => {
                console.log(res.data.category);
                setCategoryList(res.data.category);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const fileHandler = (e) => {
        setFile(e.target.files[0]);
        setInamgeUrl(URL.createObjectURL(e.target.files[0]))
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (location.state == null) {

            console.log(categoryName, file);

            const storage = getStorage(app)
            const myRef = ref(storage, `blog/${Date.now()}`)
            await uploadBytes(myRef, file)

            const uploadedImgUrl = await getDownloadURL(myRef)
            console.log(uploadedImgUrl);

            axios.post('http://localhost:3000/blog', {
                title: blogTitle,
                category: categoryName,
                description: blog,
                imageUrl: uploadedImgUrl
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/admin/dashboard/blog')

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else if (file == null) {
            axios.put('http://localhost:3000/blog/' + location.state.myData._id, {
                title: blogTitle,
                category: categoryName,
                description: blog,
                imageUrl: location.state.myData.imageUrl
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/admin/dashboard/blog')

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            console.log(categoryName, file);

            const storage = getStorage(app)
            const myRef = ref(storage, `${location.state.myData.imageUrl}`)
            await uploadBytes(myRef, file)

            const uploadedImgUrl = await getDownloadURL(myRef)
            console.log(uploadedImgUrl);

            axios.put('http://localhost:3000/category', {
                title: blogTitle,
                category: categoryName,
                description: blog,
                imageUrl: uploadedImgUrl
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/admin/dashboard/category')

                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    return (
        <div className=' blog-container'>
            <p> Add New Blog </p>

            <form onSubmit={submitHandler} className='blog-form'>
                <input className='blog-title' value={blogTitle} onChange={(e) => { setBlogTitle(e.target.value) }} type='text' placeholder='Blog Title' />
                {/* <input value={blog} onChange={(e) => { setBlog(e.target.value) }} type='text' placeholder='Blog' /> */}
                <ReactQuill
                    value={blog}

                />
                {/* <input value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} type='text' placeholder='Category Name' /> */}
                <select onChange={(e) => { setCategoryName(e.target.value) }} className='blogSelect' value={categoryName}>
                    <option>Select Category</option>
                    {categoryList.map(data => (
                        <option key={data._id} value={data.name}> {data.name} </option>
                    ))}
                </select>
                <input className='blog-file' onChange={(e) => { fileHandler(e) }} type='file' />
                {imageUrl != null && <img style={{ height: '270px', marginLeft: '25px', width: '40%' }} alt='categoryImg' src={imageUrl} />}
                <button className='blog-btn' type='submit'>Submit</button>
            </form >
        </div >
    );
}

export default AddBlog