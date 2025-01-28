import {useAuth} from "../../hooks/AuthProvider/useAuth.jsx";
import {Navigate, useNavigate} from "react-router";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";

function ProtectedRoute({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Form Builder
                        </Typography>

                        {/* Navigation Options */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2, // Space between items
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer", // Pointer cursor for clickability
                                    "&:hover": { color: "lightblue" }, // Hover effect
                                    "&:active": { transform: "scale(0.95)" }, // Click effect
                                }}
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                            </Typography>

                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { color: "lightblue" },
                                    "&:active": { transform: "scale(0.95)" },
                                }}
                                onClick={() => navigate('/formbuilder')}
                            >
                                Create Form
                            </Typography>

                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { color: "lightblue" },
                                    "&:active": { transform: "scale(0.95)" },
                                }}
                                onClick={logout}
                            >
                                Logout
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {children}
        </div>
    );
}
export default ProtectedRoute;