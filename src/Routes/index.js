import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { authProtectedRoutes, publicRoutes } from './allRoutes';

export default function index() {
  return (
    <div>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={route.component}
            key={idx}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            // element={
            //   <AuthProtected
            //     moduleName={route.moduleName}
            //     permissionName={route.permissionName}
            //   >
            //     <VerticalLayout>
            //       {route.component}
            //       </VerticalLayout>
            //   </AuthProtected>
            // }
            element={
                  route.component}
            key={idx}
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
