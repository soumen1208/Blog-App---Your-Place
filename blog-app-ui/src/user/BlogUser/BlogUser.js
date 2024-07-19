import React, { useEffect, useState } from 'react'
import '../BlogUser/blog.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function BlogUser() {

  const [category, setCategory] = useState([]);
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    console.log("hello");
    getCategory();
    getBlog();
    // getBlogByCategory()
  }, [])

  const getCategory = () => {
    axios.get('http://localhost:3000/category/')
      .then(res => {
        console.log(res);
        setCategory(res.data.category)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getBlog = () => {
    axios.get('http://localhost:3000/blog/')
      .then(res => {
        console.log(res);
        setBlog(res.data.blogs);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const getBlogByCategory = (cat) => {
    axios.get('http://localhost:3000/blog/category/' + cat)
      .then(res => {
        console.log(res.data);
        setBlog(res.data.blog);
      })
      .catch(err => {
        console.log(err);
      })
  }



  const navigate = useNavigate()
  const showBlogHandler = () => {
    axios.get('http://localhost:3000/blog/')
      .then(res => {
        setBlog(res.data.blog)
        navigate('/show-blog')
      })
  }


  return (
    <div className='blogsContainer'>

      <div className='blogsDiv1'>

        <div className='allBlogs'>
          {blog.map(data => (
            <div key={data._id} className='s-blogs'>
              <Link onClick={() => { showBlogHandler(data._id) }}>
                <img className='imageBlogs' src={data.imageUrl} alt='ImageBlog'></img>
              </Link>
              <p className='catsBlogs'>{data.category}</p>
              <h5 className='dataNamesBlogs' style={{ color: 'Black' }}>{data.title}</h5>
              {/* <h5 style={{ color: 'Black' }}>{data.description}</h5> */}
            </div>
          ))}
        </div>

      </div>

      <div className='catsDiv2'>
        <div className='cats'>
          <h3 style={{ textAlign: 'center' }}>All Categories</h3>
          <button className='categoryData' onClick={getBlog} >All Categories</button>
          {category.map(data => (
            <div key={data._id} className='catDataDiv'>
              <button onClick={() => { getBlogByCategory(data.name) }} className='categoryData' >{data.name}</button>
            </div>
          ))}
        </div>
      </div>



    </div>
  )
}

export default BlogUser