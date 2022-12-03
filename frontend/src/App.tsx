import { Navigate, Route, Routes } from 'react-router-dom';
// pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
// components
import Layout from '@/components/Layout';
import Protected from '@/components/Protected';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* public */}
        <Route path='home' element={<Home />} />
        <Route path='auth/'>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        {/* Protected */}
        <Route element={<Protected />}>

        </Route>
        {/* Non Existing */}
        <Route path='/*' element={<Navigate to='auth/login' />} />
      </Route>
    </Routes>
  );
}