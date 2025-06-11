import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api/client';

export default function CategoryPage() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await api.get(`/products/categories/${categoryId}`);
            setProducts(res.data); // assuming array of { products, categories }

        } catch (error) {
            console.error(error);
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    return (
        <MainLayout>
            <div className="container py-5">
                <h2 className="text-center mb-4">{products[0]?.categories?.name ?? ""}</h2>

                {loading && <div className="text-center">Loading...</div>}
                {error && <div className="text-danger text-center">{error}</div>}
                {!loading && !error && products.length === 0 && (
                    <div className="text-center">No products found in this category.</div>
                )}

                <div className="row">
                    {products.map((item) => {
                        const product = item.products;

                        return (
                            <div className="col-ms-auto col-md-6 col-lg-4 col-xl-3 mb-4" key={product.pid}>
                                <div
                                    className="card h-100 shadow-sm"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/products/product/${product.pid}`)}
                                >
                                    <div className="position-relative">
                                        <img
                                            src={product.photos[0]}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        {product.recommended && (
                                            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                                                ⭐ Recommended
                                            </span>
                                        )}
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title text-truncate-1">{product.name}</h5>
                                        <p className="card-text text-truncate-2" style={{ fontSize: '0.9rem' }}>
                                            {product.description}
                                        </p>
                                        <div className="mb-2">
                                            <span className="fw-bold text-success">₹{product.price}</span>{' '}
                                            <small className="text-muted text-decoration-line-through">
                                                ₹{product.originalPrice}
                                            </small>{' '}
                                            <span className="badge bg-danger">{product.discountPercentage}% OFF</span>
                                        </div>
                                        {product.inventory === 0 && (
                                            <div className="text-danger fw-semibold mb-2">Out of Stock</div>
                                        )}
                                        <Link
                                            className="btn btn-primary mt-auto"
                                            to={`/products/product/${product.pid}`}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </MainLayout >
    );
}
