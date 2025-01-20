import { createContext, useContext, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useEffect } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", { name, email, password });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/login", { email, password });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    const [loading, setLoading] = useState(true);
    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/me");
            setUser(data);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    async function logout() {
        setBtnLoading(true);
        try {
            const { data } = await axios.get("/api/user/logout");
            toast.success(data.message);
            setUser(null);
            setIsAuth(false);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
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
            toast.error(error.response?.data?.message || "Failed to update profile picture.");
        } finally {
            setBtnLoading(false);
        }
    }

    return (
        <UserContext.Provider
            value={{
                loginUser,
                btnLoading,
                isAuth,
                user,
                loading,
                registerUser,
                logout,
                updateProfilePic,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
