import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {

  const auth = useSelector(state => state.admin)
  const navigate = useNavigate();
  
  const authenticate = localStorage.getItem('admin_authenticate');
  useEffect(() => {
    if(!authenticate){
      navigate('/admin-login');
    }
  }, [authenticate])

  useEffect(() => {
   if(authenticate){
    navigate('/admin-dashboard');
   }
  }, [authenticate])
  
  return (
    <div>AdminHome</div>
  )
}

export default AdminHome