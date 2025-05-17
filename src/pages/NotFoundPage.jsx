import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <p className="fs-3">
                <span className="text-danger">Oops!</span> Page not found.
            </p>
            <p className="lead text-muted">
                The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary mt-3">
                Go Home
            </Link>
        </div>
    );
}
