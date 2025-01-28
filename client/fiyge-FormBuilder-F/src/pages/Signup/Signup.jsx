import { useForm } from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router";
import {Box, Button, Card, TextField, Typography} from "@mui/material";
// import { useAuth } from "../../hooks/AuthProvider/useAuth.jsx"

export default function Signup() {
    const navigate = useNavigate();
    // const { signup } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        if (data.Password !== data.ConfirmPassword) {
            alert("Passwords do not match");
            return;
        }

        axios.post(import.meta.env.VITE_API_URL + '/auth/signup', {
            email: data.Email,
            password: data.Password,
            confirmPassword: data.ConfirmPassword,
            full_name: data.FullName
        }).then(async (result) => {
            if (result.status === 201) {
                alert("Signup Success, Proceed to login");
                navigate("/login");
            }
            console.log(result);


        }).catch((err) => {
            alert(err.message);
        });
    };


    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md p-8 shadow-lg rounded-lg">
                    <Box className="text-center mb-6">

                        <Typography variant="body2" color="text.secondary">
                            <b>Create your account</b>
                        </Typography>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            placeholder="Full Name"
                            type="text"
                            {...register("FullName", {required: true})}
                        />

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

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            error={!!errors.Password}
                            helperText={errors.Password ? "Password is required" : ""}
                            {...register("ConfirmPassword", {
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
                            Sign up
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}
