import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('info');

    if (!user) {
        return (
            <MainLayout>
                <div className="container mt-5">
                    <h4>Please log in to access your profile.</h4>
                </div>
            </MainLayout>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <>
                        <h4>Personal Info</h4>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </>
                );
            case 'orders':
                return <h4>Order History</h4>;
            case 'settings':
                return <h4>Settings</h4>;
            default:
                return null;
        }
    };

    return (
        <MainLayout>
            <div className="container mt-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3 border-end">
                        <h5 className="mb-4">My Account</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button
                                    className={`nav-link btn btn-link text-start ${activeTab === 'info' ? 'fw-bold' : ''}`}
                                    onClick={() => setActiveTab('info')}
                                >
                                    Profile Info
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link btn btn-link text-start ${activeTab === 'orders' ? 'fw-bold' : ''}`}
                                    onClick={() => setActiveTab('orders')}
                                >
                                    Orders
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link btn btn-link text-start ${activeTab === 'settings' ? 'fw-bold' : ''}`}
                                    onClick={() => setActiveTab('settings')}
                                >
                                    Settings
                                </button>
                            </li>
                            <li className="nav-item mt-3">
                                <button className="btn btn-danger w-100" onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Content Area */}
                    <div className="col-md-9">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
