import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { toast } from 'react-toastify';


export default function CheckoutPage() {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    const [orderItems, setOrderItems] = useState([]); // State to manage order items
    // State to manage form data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        vill: '',
        po: '',
        ps: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);


    const fetchData = async () => {
        try {
            const response = await api.get(`/cart/user/${user.id}`);
            const userRes = await api.get(`/users/${user.id}`);
            if (!response.data || response.data.length === 0) {
                console.warn("No cart data found for user:", user.id);
                return;
            }
            console.log("Fetched cart data:", response.data);
            setCart(response.data);
            console.log("Fetched user data:", userRes.data);
            setFormData({
                fullName: userRes.data.name,
                email: userRes.data.email,
                phone: userRes.data.phone || '',
                address: userRes.data.address || '',
                vill: userRes.data.vill || '',
                po: userRes.data.po || '',
                ps: userRes.data.ps || '',
                city: userRes.data.city || '',
                state: userRes.data.state || '',
                zipCode: userRes.data.zipCode || '',
            });

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

    useEffect(() => {
        handleMapData();
    }, [cart]);

    const total = cart.reduce(
        (sum, item) => sum + item.products.price * item.carts.qyt,
        0
    );

    const originalPrice = cart.reduce(
        (sum, item) => sum + item.products.originalPrice * item.carts.qyt,
        0
    );

    const totalDiscount = originalPrice - total;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions
        if (cart.length === 0) {
            toast.warn('Your cart is empty!');
            return;
        }
        await placeOrder();
    };

    const handleMapData = () => {

        const orderItems = cart.map(item => ({
            productId: item.products.pid,
            quantity: item.carts.qyt,
            price: item.products.price,
            discount: item.products.originalPrice - (item.products.price), // Assuming no discount for simplicity
        }));

        setOrderItems(orderItems);
        console.log(orderItems);

    }

    const placeOrder = async () => {
        setIsSubmitting(true);
        await handleUpdateUserAddress();

        try {
            const orderData = {
                userId: user.id,
                paymentType: "CASH",
                totalAmount: originalPrice,
                discount: totalDiscount,
                payableAmount: total,
                status: 'INTRANSIT',
                orderItems: orderItems,
            };

            const response = await api.post('/orders', orderData);
            if (response.data) {
                toast.success('Order placed successfully!');
                setTimeout(() => {
                    navigate('/thank-you?orderId=' + response.data.orderId);
                }, 1500);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error('Failed to place order. Please try again later.');
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 2000);
        }
    }

    const handleUpdateUserAddress = async () => {
        try {
            const updatedData = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                vill: formData.vill,
                po: formData.po,
                ps: formData.ps,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
            };

            const response = await api.patch(`/users/${user.id}`, updatedData);

        } catch (error) {
            console.error("Error updating user address:", error);
            toast.error('Failed to update address. Please try again later.');
        }
    }


    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                {/* Shipping Info */}
                <div className="col-md-7">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Village</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="vill"
                                    value={formData.vill}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Post Office</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="po"
                                    value={formData.po}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Police Station</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ps"
                                    value={formData.ps}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <textarea
                                className="form-control"
                                name="address"
                                rows="2"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">City</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">State</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Pin Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="zipCode"
                                    pattern="\d{6}"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-success w-100 mt-3"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>
                </div>

                <div className="col-md-5">
                    {/* Order Summary */}
                    <div className="border rounded p-4 shadow-sm">
                        <h5>Order Summary</h5>
                        <hr />
                        {cart.map((item) => (
                            <div
                                key={item.carts.id}
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                <div>
                                    <strong>{item.products.name}</strong>
                                    <small className="d-block text-muted">
                                        Qty: {item.carts.qyt} | Price: ₹{item.products.price} each
                                    </small>
                                </div>
                                <span>₹{item.products.price * item.carts.qyt}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between">
                            <strong>Original Price</strong>
                            <strong className='text-muted text-decoration-line-through'>₹{originalPrice}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                            <strong>Discount</strong>
                            <strong>- ₹{totalDiscount}</strong>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between pt-2 mt-2">
                            <strong>Total</strong>
                            <strong>₹{total}</strong>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="border rounded p-4 shadow-sm mt-4">
                        <h5>Payment Options</h5>
                        <hr />
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="paymentMethod"
                                id="cashOnDelivery"
                                value="CASH"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="cashOnDelivery">
                                Cash on Delivery
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="paymentMethod"
                                id="onlinePayment"
                                value="ONLINE"
                                disabled
                            />
                            <label className="form-check-label" htmlFor="onlinePayment">
                                Online Payment
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="paymentMethod"
                                id="upiPayment"
                                value="UPI"
                                disabled
                            />
                            <label className="form-check-label" htmlFor="upiPayment">
                                UPI Payment
                            </label>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}
