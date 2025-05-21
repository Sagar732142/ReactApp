import React, { useState } from 'react';

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const cart = [
        { id: 1, name: 'Product A', price: 799, quantity: 1 },
        { id: 2, name: 'Product B', price: 499, quantity: 2 },
    ];

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock API call or redirect to payment
        setTimeout(() => {
            alert('Order placed successfully!');
            setIsSubmitting(false);
        }, 1500);
    };

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
                                    name="pincode"
                                    value={formData.pincode}
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

                {/* Order Summary */}
                <div className="col-md-5">
                    <div className="border rounded p-4 shadow-sm">
                        <h5>Order Summary</h5>
                        <hr />
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                <div>
                                    <strong>{item.name}</strong>
                                    <small className="d-block text-muted">
                                        Qty: {item.quantity}
                                    </small>
                                </div>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between">
                            <strong>Total</strong>
                            <strong>₹{total}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
