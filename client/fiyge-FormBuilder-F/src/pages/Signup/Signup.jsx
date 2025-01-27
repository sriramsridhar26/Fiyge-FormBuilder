import { useForm } from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router";
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
            if (result.status !== 201) {
                alert("Signup Success, Proceed to login");
                navigate("/login");
            }
            console.log(result);


        }).catch((err) => {
            alert(err.message);
        });
    };

    console.log(errors);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Full Name"
                    {...register("FullName", { required: true })}
                />
                <input
                    type="text"
                    placeholder="Email"
                    {...register("Email", {
                        required: true,
                        pattern: /^\S+@\S+$/i
                    })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    {...register("Password", { required: true })}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("ConfirmPassword", { required: true })}
                />

                <input type="submit" />
            </form>
        </>
    );
}
