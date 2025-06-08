import React from 'react';
import MainLayout from '../layouts/MainLayout'; // Assuming MainLayout provides basic page structure
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'; // For navigation, assuming you're using React Router
import { CheckCircle, Home, Mail } from 'lucide-react'; // Import CheckCircle for success, Home for navigation, Mail for contact

export default function ThankYou() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <MainLayout>
            <div className="container my-5"> {/* Add some vertical margin */}
                <div className="card text-center shadow-lg p-4 p-md-5 border-0 rounded-4"> {/* Center content, add shadow and increased padding, rounded corners, no border */}
                    <div className='card-body'>
                        {/* Success Icon from Lucide */}
                        <div className="text-success mb-4">
                            <CheckCircle size={80} strokeWidth={1.5} /> {/* Large checkmark icon */}
                        </div>

                        <h1 className="display-4 text-success mb-3 fw-bold"> {/* Make heading bold */}
                            Thank You for Your Purchase!
                        </h1>
                        <p className="lead text-muted mb-4">
                            Your order <strong className="text-dark">#{orderId}</strong> has been placed successfully.
                            You'll receive an email confirmation shortly with all the details and tracking information.
                        </p>
                        <hr className="my-4" /> {/* Horizontal rule for separation */}

                        <p className="mb-4 text-secondary">
                            We appreciate your business! If you have any questions or need assistance, feel free to contact our support team.
                        </p>

                        <div className="d-grid gap-3 col-10 col-md-8 col-lg-6 mx-auto"> {/* Centered and stacked buttons, wider on smaller screens */}
                            <Link to="/" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center">
                                <Home size={24} className="me-2" /> {/* Home icon with right margin */}
                                Continue Shopping
                            </Link>
                            {/* Optional: Button to view order details or contact support */}
                            <Link to="/contact" className="btn btn-outline-secondary btn-lg d-flex align-items-center justify-content-center">
                                <Mail size={20} className="me-2" /> {/* Mail icon */}
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}