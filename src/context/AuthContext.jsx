import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { toast } from 'react-toastify';


const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (e, email, password) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await api.post('/auth', {
                email,
                password
            })

            if (res.data) {
                setUser(res.data.user);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                toast.success(res.data.message)
                window.location.href = '/';
                return true;
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Custom hook
export function useAuth() {
    return useContext(AuthContext);
}
