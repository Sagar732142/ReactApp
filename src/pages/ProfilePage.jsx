import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('info');

    const [orderHistory, setOrderHistory] = useState([]);

    const handleFetchData = async () => {
        try {
            const res = await api.get(`/orders/user/${user.id}`);
            setOrderHistory(res.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        handleFetchData();
    }, [user]);

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
                        <h4 className="mb-4 text-dark border-bottom pb-2 fw-bold fs-3">Personal Info</h4>
                        <div className="card p-4 shadow-sm border-0 rounded-3 bg-white">
                            <p className="mb-2 text-muted"><strong>Name:</strong> <span className="text-dark fw-semibold">{user.name || 'N/A'}</span></p>
                            <p className="mb-0 text-muted"><strong>Email:</strong> <span className="text-dark fw-semibold">{user.email || 'N/A'}</span></p>
                        </div>
                    </>
                );
            case 'orders':
                return <OrderHistory orders={orderHistory} />;
            case 'settings':
                return (
                    <>
                        <h4 className="mb-4 text-dark border-bottom pb-2 fw-bold fs-3">Settings</h4>
                        <div className="card p-4 shadow-sm border-0 rounded-3 bg-white">
                            <p className="text-muted">Settings options will be available here soon.</p>
                        </div>
                    </>
                );
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

// Helper component to display a single order
const OrderCard = ({ order }) => {
    // Format date for better readability
    const formattedOrderDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // Determine status badge color
    const getStatusBadgeClass = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-success-subtle text-success';
            case 'intransit': return 'bg-warning-subtle text-warning';
            case 'failed': return 'bg-danger-subtle text-danger';
            case 'pending': return 'bg-info-subtle text-info';
            case 'success': return 'bg-success-subtle text-success';
            default: return 'bg-secondary-subtle text-secondary';
        }
    };

    return (
        <div className="card mb-4 shadow-lg border-0 rounded-4 overflow-hidden order-card-hover">
            <div className={`card-header ${getStatusBadgeClass(order.status)} border-0 text-dark d-flex justify-content-between align-items-center py-3 px-4`}>
                <h5 className="mb-0 fs-5 fw-semibold text-primary">
                    Order <span className="font-monospace text-muted">#{order.oid}</span>
                </h5>
                <span className={`badge ${getStatusBadgeClass(order.status)} fs-6 px-3 py-2 rounded-pill fw-normal`}>
                    {order.status}
                </span>
            </div>
            <div className="card-body p-4">
                <div className="row g-3 mb-4">
                    <div className="col-md-6 border-end pe-md-4">
                        <h6 className="text-muted text-uppercase mb-3 fs-6 fw-bold">Order Summary</h6>
                        <p className="mb-1 text-secondary"><strong>Total Amount:</strong> <span className="text-decoration-line-through">₹{order.totalAmount.toFixed(2)}</span></p>
                        <p className="mb-1 text-danger"><strong>Discount:</strong> ₹{order.discount.toFixed(2)}</p>
                        <p className="mb-1 fs-5 text-primary fw-bold"><strong>Payable Amount:</strong> ₹{order.payableAmount.toFixed(2)}</p>
                        <p className="mb-1 text-muted"><i className="bi bi-credit-card-fill me-2 text-primary"></i><strong>Payment Type:</strong> {order.paymentType}</p>
                        <p className="mb-0 text-muted"><i className="bi bi-calendar-event-fill me-2 text-primary"></i><strong>Order Date:</strong> {formattedOrderDate}</p>
                    </div>
                    <div className="col-md-6 ps-md-4">
                        <h6 className="text-muted text-uppercase mb-3 fs-6 fw-bold">Transaction Details</h6>
                        <p className="mb-1 text-muted"><strong>Transaction ID:</strong> <span className="font-monospace">{order.transaction.tid}</span></p>
                        <p className="mb-1 text-muted"><strong>Amount:</strong> ₹{order.transaction.amount.toFixed(2)}</p>
                        <p className="mb-1 text-muted"><strong>Status:</strong> <span className={`badge ${getStatusBadgeClass(order.transaction.status)}`}>{order.transaction.status}</span></p>
                        <p className="mb-0 text-muted"><strong>Method:</strong> {order.transaction.method}</p>
                    </div>
                </div>

                <hr className="my-4" />

                <h6 className="text-muted text-uppercase mb-3 fs-6 fw-bold">Items in this Order</h6>
                <div className="row row-cols-1 g-3">
                    {order.items.map(item => (
                        <div key={item.id} className="col">
                            <div className="d-flex align-items-center p-3 border rounded-3 bg-light item-card-shadow transition-transform">
                                <img
                                    src={item.product.photos[0] || 'https://placehold.co/100x100/e0e0e0/555555?text=No+Image'}
                                    alt={item.product.name}
                                    className="img-fluid me-3 rounded-2 shadow-sm"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/100x100/e0e0e0/555555?text=No+Image'; // Fallback
                                    }}
                                />
                                <div className="flex-grow-1">
                                    <h6 className="mb-1 text-dark fw-semibold">{item.product.name}</h6>
                                    <p className="mb-1 text-muted small">{item.product.description.substring(0, 100)}{item.product.description.length > 100 ? '...' : ''}</p>
                                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-2">
                                        <span className="fw-bold fs-5 text-primary">₹{(item.price * item.quantity).toFixed(2)}</span>
                                        <span className="text-secondary small">Qty: {item.quantity}</span>
                                        {item.discount > 0 && <span className="badge bg-danger-subtle text-danger p-2 fw-normal">Discount: ₹{item.discount.toFixed(2)}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Custom CSS for modern touches */}
            <style jsx="true">{`
                .order-card-hover:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.175) !important;
                }
                .item-card-shadow {
                    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
                }
                .transition-transform {
                    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                }
                .transition-transform:hover {
                    transform: translateY(-3px); /* Subtle lift */
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important; /* More pronounced shadow on hover */
                }
                .bg-gradient-primary {
                    background: linear-gradient(45deg, #007bff, #0056b3) !important;
                }
                /* Adjust subtle badge colors */
                .bg-success-subtle { background-color: #d4edda !important; } /* Slightly lighter green for subtle */
                .text-success { color: #28a745 !important; } /* Standard Bootstrap success green */
                .bg-warning-subtle { background-color: #fff3cd !important; }
                .text-warning { color: #ffc107 !important; }
                .bg-danger-subtle { background-color: #f8d7da !important; }
                .text-danger { color: #dc3545 !important; }
                .bg-info-subtle { background-color: #d1ecf1 !important; } /* Slightly lighter blue for subtle */
                .text-info { color: #17a2b8 !important; } /* Standard Bootstrap info blue */
                .bg-secondary-subtle { background-color: #e2e3e5 !important; }
                .text-secondary { color: #6c757d !important; }
            `}</style>
        </div>
    );
};

// Component for rendering the list of orders
const OrderHistory = ({ orders }) => {
    if (orders.length === 0) {
        return (
            <div className="alert alert-info text-center mt-5 p-4 rounded-3 shadow-sm border-0" role="alert">
                <h4 className="alert-heading mb-3 fw-bold text-info">No Orders Yet!</h4>
                <p className="mb-0 text-muted">It looks like you haven't placed any orders with us. Start exploring our products!</p>
                <i className="bi bi-box-seam fs-1 text-info mt-3 d-block"></i> {/* Example icon, requires Bootstrap Icons */}
            </div>
        );
    }

    return (
        <div className="mt-4">
            <h4 className="mb-4 text-dark border-bottom pb-2 fw-bold fs-3">Your Order History</h4>
            {orders.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
};