import {useForm} from "react-hook-form";
import axios from "axios";
import {useAuth} from "../../hooks/AuthProvider/useAuth.jsx";
import {useNavigate} from "react-router";

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
            await login({token:result.data.token});


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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Email" {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i
                })} />
                <input type="password" placeholder="Password" {...register("Password", {required: true})} />

                <input type="submit"/>
            </form>
            <button onClick={handleSignup}>Signup</button>
        </>
    )
}