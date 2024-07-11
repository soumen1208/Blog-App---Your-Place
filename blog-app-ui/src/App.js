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

const router = createBrowserRouter([
  {
    path: 'admin', element: <AdminLayout />, children: [
      { path: 'login', element: <Login /> },
      {
        path: 'dashboard', element: <Dashboard />, children: [
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
