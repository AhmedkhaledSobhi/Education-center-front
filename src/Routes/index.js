import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { accessableRoutes, authProtectedRoutes, publicRoutes } from './allRoutes';
import { AuthProtected } from './AuthProtected';
import VerticalLayout from "../Layouts/index";

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
        {accessableRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<VerticalLayout>{route.component}</VerticalLayout>}
            key={idx}
            exact={true}
          />
        ))}
        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AuthProtected
                moduleName={route.moduleName}
                permissionName={route.permissionName}
              >
                <VerticalLayout>
                  {route.component}
                </VerticalLayout>
              </AuthProtected>
            }
            key={idx}
            exact={true}
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
