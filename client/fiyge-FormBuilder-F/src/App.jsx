import './App.css'
import Formbuilder from "./pages/Formbuilder/Formbuilder.jsx";
import Login from "./pages/Login/Login.jsx";
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import AuthProvider from "./hooks/AuthProvider/useAuth.jsx";
import {useAuth} from "./hooks/AuthProvider/useAuth.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import EditForm from "./pages/EditForm/EditForm.jsx";
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import {useEffect, useState} from "react";

function MenuIcon() {
    return null;
}

function AccountCircle() {
    return null;
}


export default function App() {

    return (
        <>


            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Signup/>}/>

                        {/* Protected Route */}
                        <Route
                            path="/formbuilder"
                            element={
                                <ProtectedRoute>
                                    <Formbuilder/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/editform/:id"
                            element={
                                <ProtectedRoute>
                                    <EditForm/>
                                </ProtectedRoute>
                            }
                        />

                        {/* Fallback Routes */}
                        <Route path="/" element={<Navigate to="/formbuilder" replace/>}/>
                        <Route path="*" element={<Navigate to="/login" replace/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}
