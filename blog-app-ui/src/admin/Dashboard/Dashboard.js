import React from 'react'
import '../Dashboard/dashboard.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CategoryIcon from '@mui/icons-material/Category';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import CommentIcon from '@mui/icons-material/Comment';

function Dashboard() {
    const navigate = useNavigate()

    const logOutHandler = () => {
        localStorage.clear();
        navigate('/admin/login')
    }

    return (
        <div className='container'>
            <div className='leftNav'>
                <div className='profilePhoto'>
                    <img alt='logo' className='logo' src={require('../../assets/IMG20220427092154.jpg')} ></img>
                    <h1 className='logo-name'>Soumen's Blog</h1>
                </div>
                <Link to={'/admin/dashboard'} className='link' style={{ backgroundColor: 'sienna' }}> <DashboardIcon /> <span style={{ marginLeft: '10px' }} >Dashboard</span> </Link>
                <Link to={'/admin/dashboard/blog'} className='link'> <FormatListBulletedIcon /> <span style={{ marginLeft: '10px' }}>Blog List</span> </Link>
                <Link to={'/admin/dashboard/add-blog'} className='link'> <PlaylistAddIcon /> <span style={{ marginLeft: '10px' }}>Add Blog</span> </Link>
                <Link to={'/admin/dashboard/category'} className='link'> <CategoryIcon /> <span style={{ marginLeft: '10px' }}>Category List</span></Link>
                <Link to={'/admin/dashboard/add-category'} className='link'> <PostAddIcon /> <span style={{ marginLeft: '10px' }}>Add Category</span></Link>
                <Link to={'/admin/dashboard/comment'} className='link'> <CommentIcon /> <span style={{ marginLeft: '10px' }}>Comments</span></Link>
                <Link onClick={logOutHandler} className='link'> <LogoutIcon /> <span style={{ marginLeft: '10px' }}>Log Out</span> </Link>
            </div>
            <div className='content'>
                <Outlet />
            </div>

        </div>
    )
}

export default Dashboard