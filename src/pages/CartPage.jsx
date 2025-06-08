import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';


export default function CartPage() {
    const { isLoggedIn, user } = useAuth();

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get(`/cart/user/${user.id}`);
            if (!response.data || response.data.length === 0) {
                console.warn("No cart data found for user:", user.id);
                return;
            }
            console.log("Fetched cart data:", response.data);
            // Assuming response.data is an array of cart items
            // You might want to map or transform the data if needed
            // For example, if the API returns items with different keys

            setCart(response.data);
        }
        catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    // Fetch cart data when component mounts
    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        } else {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);


    const handleQuantityChange = async (id, delta) => {
        try {
            const updatedCart = cart.map(item => {
                if (item.carts.id === id) {
                    const newQuantity = Math.max(1, item.carts.qyt + delta);
                    return { ...item, carts: { ...item.carts, qyt: newQuantity } };
                }
                return item;
            });

            setCart(updatedCart);

            // Make API call to update quantity in the backend
            await api.patch(`/cart/${id}`, { qyt: updatedCart.find(item => item.carts.id === id).carts.qyt });
            toast.success("Quantity updated successfully!");
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeItem = async (id) => {

        try {
            const updatedCart = cart.filter(item => item.carts.id !== id);
            setCart(updatedCart);

            await api.delete(`/cart/${id}`);
            toast.success("Item removed from cart successfully!");
        } catch (error) {
            console.error("Error removing item:", error);
        }

        // if (updatedCart.length === 0) {
        //     navigate('/'); // Redirect to home if cart is empty
        // }

    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.products.price * item.carts.qyt,
        0
    );


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
                                        <tr key={item.carts.id}>
                                            <td>
                                                <Link to={`/products/product/${item.products.pid}`} className="text-decoration-none">
                                                    <img src={item.products.photos[0]} alt={item.products.name} width="70" />
                                                </Link>
                                            </td>
                                            <td>{item.products.name}</td>
                                            <td>₹{item.products.price}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => handleQuantityChange(item.carts.id, -1)}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.carts.qyt}</span>
                                                    <button
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => handleQuantityChange(item.carts.id, 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>₹{item.products.price * item.carts.qyt}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => removeItem(item.carts.id)}
                                                >
                                                    <Trash2 size={16} />
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
                                <Link to="/checkout"
                                    className="btn btn-primary w-100 mt-3"

                                >
                                    Proceed to Checkout
                                </Link>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
}
