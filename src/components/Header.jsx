import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogIn, BaggageClaim, AlignJustify } from 'lucide-react';
import Logo from '../assets/image/logo.png'; // Adjust your path

export default function Header() {
    const [sidebar, setSidebar] = useState(false)
    return (
        <header className="py-3 shadow-sm sticky-top" style={{ background: "#0a0619" }}>
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo */}
                <NavLink to="/" className="navbar-brand d-flex align-items-center">
                    <img src={Logo} alt="Site Logo" style={{ height: '40px' }} />
                </NavLink>

                {/* Navigation */}
                <nav className='d-flex gap-3'>
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
                    <button
                        className='btn btn-dark btn-sm'
                        onClick={() => setSidebar(!sidebar)}
                    >
                        <AlignJustify />
                    </button>

                </nav>

            </div>
            {
                sidebar && <aside className='position-fixed top-0 right-0 bottom-0 bg-black' style={{ width: '18rem' }}>
                    {/* Logo */}
                    <div className="container d-grid ">
                        <NavLink to="/" className="navbar-brand d-flex align-items-center mx-auto">
                            <img src={Logo} alt="Site Logo" style={{ height: '80px' }} />
                        </NavLink>

                        <nav>
                            <ul className='nav d-grid gap-3 mt-5'>
                                {

                                    [
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
                                    ))

                                }

                            </ul>
                            <li className="nav-item mt-5 py-1">
                                <NavLink to="/login" className="nav-link text-light link-hover px-2">
                                    LogIn <LogIn size={20} />
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link text-light link-hover px-2">
                                    Cart <BaggageClaim size={20} />
                                </NavLink>
                            </li>
                        </nav>
                    </div>
                </aside>
            }
        </header>
    );
}
