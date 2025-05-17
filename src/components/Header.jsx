import React from 'react';
import { LogIn, BaggageClaim } from 'lucide-react';
import Logo from '../assets/image/logo.png'; // Adjust path as needed
import { Link } from 'react-router-dom'; // Optional if using React Router

export default function Header() {
    return (
        <header className="bg-black py-3 shadow-sm sticky-top">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <Link to="/" className="navbar-brand d-flex align-items-center">
                    <img src={Logo} alt="Site Logo" style={{ height: '40px' }} />
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className="nav gap-3">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-light">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link text-light">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link text-light">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link text-light">Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link text-light"><LogIn size={20} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cart" className="nav-link text-light"><BaggageClaim size={20} /></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
