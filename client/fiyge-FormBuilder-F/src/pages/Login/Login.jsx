import {useForm} from "react-hook-form";
import axios from "axios";
import {useAuth} from "../../hooks/AuthProvider/useAuth.jsx";
import {useNavigate} from "react-router";
import {Box, Button, Container, Divider, Paper, TextField, Typography} from "@mui/material";

export default function Login() {
    // console.log(import.meta.env.VITE_API_URL)
    const {login} = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit =  data => {
        console.log(data);
        axios.post(import.meta.env.VITE_API_URL+'/auth/signin',{email: data.Email, password: data.Password}).then(async (result)=>{
            if(result.status===200){
                alert(result.data.message);
            }
            console.log(result);
            login({token:result.data.token});


        }).catch((err)=>{
            alert(err.message);
        })
    };
    console.log(errors);
    const handleSignup = ()=>{
        navigate("/signup");
    }

    return (
        <>
            <Box className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
                <Container maxWidth="sm">
                    <Paper elevation={3} className="p-8">
                        {/* Header */}
                        <Box className="text-center mb-6">
                            <Typography variant="h4" component="h1" gutterBottom>
                                Welcome back
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Please sign in to your account
                            </Typography>
                        </Box>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                error={!!errors.Email}
                                helperText={errors.Email ? "Please enter a valid email" : ""}
                                {...register("Email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i
                                })}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                error={!!errors.Password}
                                helperText={errors.Password ? "Password is required" : ""}
                                {...register("Password", {
                                    required: true
                                })}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                className="mt-4"
                            >
                                Sign in
                            </Button>
                        </form>

                        {/* Divider */}
                        <Box className="my-6">
                            <Divider>
                                <Typography variant="body2" color="text.secondary">
                                    Don't have an account?
                                </Typography>
                            </Divider>
                        </Box>

                        {/* Sign up button */}
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={handleSignup}
                        >
                            Sign up
                        </Button>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}