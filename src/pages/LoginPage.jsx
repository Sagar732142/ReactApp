import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Toaster from '../components/Toaster';
import MainLayout from '../layouts/MainLayout';


const LoginPage = () => {
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            const loggedIn = await login(e, username, password)
            if (loggedIn) {
                setTimeout(() => {
                    setLoading(false);
                }, 3000)
            }
        } catch (err) {
            setError('Invalid username or password');
            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
    };

    // if (loading) {
    //     return (
    //         <div className="loading-container">
    //             <div className="loading-spinner"></div>
    //         </div>
    //     )
    // }

    return (
        <MainLayout>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4 border p-4 rounded">
                        <h3 className="text-center mb-4 border-bottom border-primary pb-3">Login</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    placeholder='Please enter your email'
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    placeholder='Enter your password'
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>

                {
                    isLoggedIn && <Toaster />
                }
            </div>
        </MainLayout>
    );
};

export default LoginPage;
