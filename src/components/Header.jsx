import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogIn, BaggageClaim } from 'lucide-react';
import Logo from '../assets/image/logo.png'; // Adjust your path

export default function Header() {
    return (
        <header className="bg-black py-3 shadow-sm sticky-top">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <NavLink to="/" className="navbar-brand d-flex align-items-center">
                    <img src={Logo} alt="Site Logo" style={{ height: '40px' }} />
                </NavLink>

                {/* Navigation */}
                <nav>
                    <ul className="nav gap-3">
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/products', label: 'Products' },
                            { to: '/about', label: 'About' },
                            { to: '/contact', label: 'Contact Us' },
                        ].map((link) => (
                            <li key={link.to} className="nav-item">
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `nav-link text-light px-2 link-hover ${isActive ? 'active-link' : ''}`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link text-light link-hover px-2">
                                <LogIn size={20} />
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cart" className="nav-link text-light link-hover px-2">
                                <BaggageClaim size={20} />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
