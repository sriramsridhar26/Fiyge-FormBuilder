import {useState, useEffect} from "react";
import axios from "axios";
import {List, ListItem, ListItemText, CircularProgress, ListItemButton} from "@mui/material";
import {useAuth} from "../../hooks/AuthProvider/useAuth.jsx";
import {useNavigate} from "react-router"; // Material UI components

function Dashboard() {
    const [forms, setForms] = useState([]);  // State to store form data
    const [loading, setLoading] = useState(true);  // State to handle loading state
    const [error, setError] = useState(null);  // State to handle errors
    const user = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch form data
        const fetchForms = async () => {
            try {
                console.log(user);
                const response = await axios.get(import.meta.env.VITE_API_URL + "/api/forms/list", {
                    headers: {
                        "authorization": `Bearer ${user.user.token}`
                    }
                });
                setForms(response.data);
            } catch (err) {
                setError("Error fetching forms.");
            } finally {
                setLoading(false);
            }
        };

        fetchForms();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    function onClick(id) {
        navigate('/editform/' + id);
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Created Forms</h2>
            <List>
                {forms.map((form) => (
                    <ListItem key={form.id} className="border-b border-gray-200" onClick={() => onClick(form.id)}>
                        <ListItemButton>
                            <ListItemText
                                primary={form.form_name}
                                secondary={`Form ID: ${form.id}`}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Dashboard;
