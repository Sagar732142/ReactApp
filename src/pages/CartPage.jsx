import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
const initialCart = [
    {
        id: 1,
        name: 'Wireless Headphones',
        price: 1299,
        quantity: 1,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRgyR6GolZhdekEpQpEfYf97USuYgYGhA5lCwsJKZl19W75XMQdQbbR32DryH-nPMvlgOotghSzVT97NeP1ziE4QB7KdhvIYpj9_cEbSO_SqDThKHGXxWeSTQ',
    },
    {
        id: 2,
        name: 'Bluetooth Speaker',
        price: 999,
        quantity: 2,
        image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBkUQ79qNTzHWa1w2cw2BqIpkJGzSmoqbCwaL3Rwrwc27uPlDxHrdD0WUMNxRXAmh2Q3tTHNnwtXTnsgDfwVrEsvk3bhVl0Lgp1hnQUXBl_gxBm5eYTHiA',
    },
];

export default function CartPage() {
    const { isLoggedIn } = useAuth();

    const navigate = useNavigate();

    const [cart, setCart] = useState(initialCart);



    const handleQuantityChange = (id, delta) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // if (!isLoggedIn) {
    //     return (
    //         <Navigate to={'/login'} />
    //     )
    // }

    return (
        <MainLayout>
            <div className="container mt-5">
                <h2 className="mb-4">Your Cart</h2>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={item.image} alt={item.name} width="70" />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>₹{item.price}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>₹{item.price * item.quantity}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <div className="border p-4 rounded shadow-sm" style={{ width: '300px' }}>
                                <h5>Order Summary</h5>
                                <hr />
                                <p className="d-flex justify-content-between">
                                    <span>Total Items:</span> <span>{cart.length}</span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span>Total Price:</span> <strong>₹{totalPrice}</strong>
                                </p>
                                <button className="btn btn-primary w-100 mt-3">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
}
