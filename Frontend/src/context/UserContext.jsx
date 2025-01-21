import { createContext, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Register User
    async function registerUser(name, email, password, mobileNumber, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", {
                name,
                email,
                password,
                mobileNumber,
            });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Login User
    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/login", {
                email,
                password,
            });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Fetch Logged-In User
    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/me");
            setUser(data);
            setIsAuth(true);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            setIsAuth(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    // Fetch All Users
    async function fetchallUsers() {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/api/user/getall");
            setAllUsers(data.users); 
        } catch (error) {
            console.error("Failed to fetch all users:", error);
        } finally {
            setIsLoading(false);
        }
    }

    // Logout
    async function logout() {
        setBtnLoading(true);
        try {
            const { data } = await axios.get("/api/user/logout");
            toast.success(data.message);
            setUser(null);
            setIsAuth(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed.");
        } finally {
            setBtnLoading(false);
        }
    }

    // Update Profile Picture
    async function updateProfilePic(file) {
        setBtnLoading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await axios.post("/api/user/updatepic", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success(data.message);
            setUser((prev) => ({
                ...prev,
                image: data.image,
            }));
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update profile picture."
            );
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <UserContext.Provider
            value={{
                registerUser,
                loginUser,
                logout,
                updateProfilePic,
                fetchallUsers,
                btnLoading,
                isAuth,
                user,
                allUsers,
                loading,
                isLoading,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
