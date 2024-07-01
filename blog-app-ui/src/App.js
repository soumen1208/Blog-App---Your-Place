import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import Login from './admin/Login/Login';
import Dashboard from './admin/Dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: 'admin', element: <AdminLayout />, children: [
      { path: 'login', element: <Login /> },
      { path: 'dashboard', element: <Dashboard /> }
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
