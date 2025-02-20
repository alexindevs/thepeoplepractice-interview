import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import OrderCreation from './pages/OrderCreation';
import OrdersList from './pages/OrdersList';
import AdminDashboard from './pages/AdminDashboard';
import Logout from './pages/Logout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      
      <Route
        path="/orders/new"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <OrderCreation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <OrdersList />
          </ProtectedRoute>
        }
      />

    <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
