import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogIn, BaggageClaim, AlignJustify, X, User, ShoppingBasket, ShoppingCart, BaggageClaimIcon, Badge } from 'lucide-react';
import Logo from '../assets/image/logo.png'; // Adjust your path
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';




export default function Header() {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    const [sidebar, setSidebar] = useState(false)
    const [cart, setCart] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get(`/cart/user/${user.id}`);
            if (!response.data || response.data.length === 0) {
                console.warn("No cart data found for user:", user.id);
                return;
            }
            console.log("Fetched cart data:", response.data);

            setCart(response.data);
        }
        catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn, navigate]);

    return (
        <header className="py-3 shadow-sm sticky-top" style={{ background: "#0a0619" }}>
            <div className="container d-flex justify-content-between align-items-center">

                {/* Logo */}
                <NavLink to="/" className="navbar-brand d-flex align-items-center">
                    <img src={Logo} alt="Site Logo" style={{ height: '40px' }} />
                </NavLink>

                {/* Navigation */}
                <nav className='d-flex gap-3'>
                    <ul className="nav gap-3 d-none d-lg-flex">
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
                            {isLoggedIn ?
                                <NavLink to="/profile"
                                    className={({ isActive }) =>
                                        `nav-link text-light px-2 link-hover pb-2 ${isActive ? 'active-link' : ''}`
                                    }
                                    title='Profile'
                                >
                                    <User size={20} />
                                </NavLink>
                                :
                                <NavLink to="/login"
                                    className={({ isActive }) =>
                                        `nav-link text-light px-2 link-hover pb-2 ${isActive ? 'active-link' : ''}`
                                    }
                                    title='Login'>
                                    <LogIn size={20} />
                                </NavLink>
                            }
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cart"
                                className={({ isActive }) =>
                                    `nav-link text-light px-2 link-hover pb-2 ${isActive ? 'active-link' : ''}`
                                }
                                title='Cart'>
                                <ShoppingCart size={20} />
                                {
                                    isLoggedIn && <div className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                        {cart.length > 0 ? cart.reduce((acc, item) => acc + item.carts.qyt, 0) : 0}
                                    </div>
                                }
                            </NavLink>
                        </li>



                    </ul>
                    <button
                        className='btn btn-dark btn-sm d-block d-lg-none'
                        style={{ width: '40px', height: '40px' }}
                        type="button"
                        data-bs-auto-close="true"

                        onClick={() => setSidebar(!sidebar)}
                    >
                        <AlignJustify />
                    </button>

                </nav>

            </div>
            {
                sidebar && <aside className='position-fixed top-0 end-0 bottom-0' style={{ width: '18rem', background: '#0a0619' }}>
                    {/* Logo */}
                    {/* <div className="position-absolute inset-0 bg-dark"></div> */}
                    <button className='btn btn-dark btn-sm d-block d-lg-none position-absolute'
                        style={{ width: '40px', height: '40px', top: '10px', left: '-38px' }}
                        type="button"
                        onClick={() => setSidebar(!sidebar)}
                    >
                        <X />

                    </button>
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
                            <li className="nav-item">
                                {isLoggedIn ?
                                    <NavLink to="/profile"
                                        className={({ isActive }) =>
                                            `nav-link text-light px-2 link-hover pb-2 ${isActive ? 'active-link' : ''}`
                                        }
                                        title='Profile'
                                    >
                                        <User size={20} />
                                    </NavLink>
                                    :
                                    <NavLink to="/login"
                                        className={({ isActive }) =>
                                            `nav-link text-light px-2 link-hover pb-2 ${isActive ? 'active-link' : ''}`
                                        }
                                        title='Login'>
                                        <LogIn size={20} /> Login
                                    </NavLink>
                                }
                            </li>
                            <li className="nav-item">
                                <NavLink to="/cart"
                                    className={({ isActive }) =>
                                        `nav-link text-light px-2 link-hover pb-2 ${isActive ? 'active-link' : ''}`
                                    }
                                    title='Cart'>
                                    <ShoppingCart size={20} /> Cart
                                    {
                                        isLoggedIn && <div className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                            {cart.length > 0 ? cart.reduce((acc, item) => acc + item.carts.qyt, 0) : 0}
                                        </div>
                                    }
                                </NavLink>
                            </li>
                        </nav>
                    </div>
                </aside>
            }
        </header>
    );
}
