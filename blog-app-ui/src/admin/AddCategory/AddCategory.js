import React, { useEffect, useState } from 'react'
import '../AddCategory/addcategory.css'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { app } from '../../firebase';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


function AddCategory() {

    const [categoryName, setCategoryName] = useState('');
    const [file, setFile] = useState(null);
    const [imageUrl, setInamgeUrl] = useState(null);

    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        console.log(location.state);
        if (location.state != null) {
            setCategoryName(location.state.myData.name)
            setInamgeUrl(location.state.myData.imageUrl)
        }
    }, [])

    const fileHandler = (e) => {
        setFile(e.target.files[0]);
        setInamgeUrl(URL.createObjectURL(e.target.files[0]))
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        if (location.state == null) {

            console.log(categoryName, file);

            const storage = getStorage(app)
            const myRef = ref(storage, `category/${Date.now()}`)
            await uploadBytes(myRef, file)

            const uploadedImgUrl = await getDownloadURL(myRef)
            console.log(uploadedImgUrl);

            axios.post('http://localhost:3000/category', {
                name: categoryName,
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
        else if (file == null) {
            axios.put('http://localhost:3000/category/' + location.state.myData._id, {
                name: categoryName,
                imageUrl: location.state.myData.imageUrl
            })
                .then(res => {
                    console.log(res.data);
                    navigate('/admin/dashboard/category')

                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            console.log(categoryName, file);

            const storage = getStorage(app)
            const myRef = ref(storage, `${location.state.myData._id}`)
            await uploadBytes(myRef, file)

            const uploadedImgUrl = await getDownloadURL(myRef)
            console.log(uploadedImgUrl);

            axios.put('http://localhost:3000/category', {
                name: categoryName,
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
        <div className=' category-container'>
            <p> Add New Category </p>

            <form onSubmit={submitHandler} className='cat-form'>
                <input value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} type='text' placeholder='Category Name' />
                <input onChange={(e) => { fileHandler(e) }} type='file' />
                {imageUrl != null && <img style={{ height: '300px', marginLeft: '25px' }} alt='categoryImg' src={imageUrl} />}
                <button className='cat-btn' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default AddCategory