import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login/Login';
import Dashboard from './admin/Dashboard/Dashboard';
import BlogList from './admin/BlogList/BlogList';
import Home from './admin/Home/Home';
import AddBlog from './admin/AddBlog.js/AddBlog';
import CategoryList from './admin/CategoryList/CategoryList';
import AddCategory from './admin/AddCategory/AddCategory';
import CommentList from './admin/CommentList/CommentList';
import { isLogin } from './checkAuth';
import UserLayOut from './user/UserLayOut';
import UserHome from './user/Home/UserHome';
import About from './user/About/About';
import Contact from './user/Contact/Contact';
import BlogUser from './user/BlogUser/BlogUser';
import UserLogin from './user/UserLogin/UserLogin';

const router = createBrowserRouter([
  {
    path: '', element: <UserLayOut />, children: [
      { path: '', element: <UserHome /> },
      { path: 'home', element: <UserHome /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'blog', element: <BlogUser /> },
      { path: 'user-login', element: <UserLogin /> }
    ]
  },
  {
    path: 'admin', element: <AdminLayout />, children: [
      { path: 'login', element: <Login /> },
      {
        path: 'dashboard', loader: isLogin, element: <Dashboard />, children: [
          { path: '', element: <Home /> },
          { path: 'blog', element: <BlogList /> },
          { path: 'add-blog', element: <AddBlog key="blog" mode="blog" /> },
          { path: 'category', element: <CategoryList /> },
          { path: 'add-category', element: <AddCategory key="add" mode="add" /> },
          { path: 'comment', element: <CommentList /> },
          { path: 'edit-category', element: <AddCategory key="edit" mode="edit" /> },
          { path: 'edit-blog', element: <AddBlog key="editBlog" mode="editBlog" /> }
        ]
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
