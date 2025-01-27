
import './App.css'
import Formbuilder from "./pages/Formbuilder/Formbuilder.jsx";
import Login from "./pages/Login/Login.jsx";
import {BrowserRouter, Navigate, Route, Router, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import AuthProvider from "./hooks/AuthProvider/useAuth.jsx";
import Signup from "./pages/Signup/Signup.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Route */}
                    <Route
                        path="/formbuilder"
                        element={
                            <ProtectedRoute>
                                <Formbuilder />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback Routes */}
                    <Route path="/" element={<Navigate to="/formbuilder" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
