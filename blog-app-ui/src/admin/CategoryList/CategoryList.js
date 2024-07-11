import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../CategoryList/categorylist.css'
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { app } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function CategoryList() {

    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getCategoryData();
    }, [])

    const getCategoryData = () => {
        axios.get('http://localhost:3000/category')
            .then(res => {
                console.log(res.data.category);
                setCategory(res.data.category);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteCategory = (categoryData) => {
        if (window.confirm('Are you sure want to delete ?')) {

            const storage = getStorage(app)
            const myRef = ref(storage, `${categoryData.imageUrl}`)

            deleteObject(myRef)

                .then(result => {
                    axios.delete('http://localhost:3000/category/' + categoryData._id)
                        .then(result => {
                            console.log(result);
                            getCategoryData();
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
        <div className='catContainer'>
            {category.map(data => (
                <div key={data._id} className='catContain'>

                    <div className='catName'>
                        <img className='categoryImg' src={data.imageUrl} alt='catImage'></img>
                    </div>

                    <div className='catName' style={{ fontFamily: 'fantasy' }}>
                        <p>{data.name}</p>
                    </div>
                    <div className='catName'>
                        <button onClick={() => { navigate('/admin/dashboard/edit-category', { state: { myData: data } }) }} className='editBtn' type='submit'>Edit</button>
                    </div>
                    <div className='catName'>
                        <button onClick={() => { deleteCategory(data) }} className='deleteBtn' type='submit'>Delete</button>
                    </div>

                </div >
            ))
            }
        </div >
    )
}

export default CategoryList