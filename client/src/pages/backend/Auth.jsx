import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Auth() {
  const currentUser = useSelector(state => state.user.currentUser)
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (!currentUser.name) {
      navigate('/login')
    }

    if (currentUser.role !== "1") {
      if (location.pathname.includes("product") || location.pathname.includes("user") || location.pathname.includes("category")) {
        navigate("/admin/dashboard")
      }
    }


  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}
