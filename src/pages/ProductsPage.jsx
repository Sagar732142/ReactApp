import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import ProductSkeleton from '../components/ProductSkeleton ';
// Sample categories and products
export const productCategories = [
    { id: 'diwali', name: 'Diwali' },
    { id: 'holi', name: 'Holi' },
    { id: 'puja', name: 'Puja Items' },
    { id: 'eid', name: 'Eid' },
];

export const products = [
    { id: 1, name: 'Diya Set', image: 'https://source.unsplash.com/200x200/?diya', price: '₹150', category: 'diwali' },
    { id: 2, name: 'Holi Color Pack', image: 'https://source.unsplash.com/200x200/?holi-color', price: '₹100', category: 'holi' },
    { id: 3, name: 'Agarbatti', image: 'https://source.unsplash.com/200x200/?agarbatti', price: '₹50', category: 'puja' },
    { id: 4, name: 'Eid Gift Box', image: 'https://source.unsplash.com/200x200/?eid-gift', price: '₹499', category: 'eid' },
    { id: 5, name: 'Puja Thali', image: 'https://source.unsplash.com/200x200/?puja-thali', price: '₹250', category: 'puja' },
    { id: 6, name: 'Rangoli Colors', image: 'https://source.unsplash.com/200x200/?rangoli', price: '₹120', category: 'diwali' },
];




export default function ProductsPage() {

    const [productsData, setProductsData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/products`);
            setProductsData(response.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <MainLayout>
            <div className="container py-5">
                <h2 className="text-center mb-4">Our Products</h2>
                <p className="text-center text-muted mb-5">
                    Explore our curated collection for all your event and puja needs.
                </p>

                {
                    loading && <div className="row">
                        {
                            Array.from({ length: 8 }).map((_, index) => {
                                return <ProductSkeleton key={index} />
                            })
                        }
                    </div>
                }

                {/* {productCategories.map((category) => {
                    const categoryProducts = products.filter((p) => p.category === category.id);

                    if (categoryProducts.length === 0) return null;

                    return (
                        <div key={category.id} className="mb-5">
                            <h4 className="mb-4">{category.name}</h4>
                            <div className="row">
                                {categoryProducts.map((product) => (
                                    <div className="col-md-4 mb-4" key={product.id}>
                                        <div className="card h-100 shadow-sm">
                                            <img
                                                src={product.image}
                                                className="card-img-top"
                                                alt={product.name}
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body d-flex flex-column text-center">
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="text-muted">{product.price}</p>
                                                <Link to={`/products/product/${product.id}`}
                                                    className="btn btn-primary mt-auto">
                                                    Buy Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })} */}

                <div className="row">
                    {productsData.map((item) => {
                        const product = item.products;

                        return (
                            <div className="col-sm-auto col-md-6 col-lg-4 col-xl-3 mb-4" key={product.pid}>
                                <div
                                    className="card h-100 shadow-sm"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/products/product/${product.pid}`)}
                                >
                                    <div className="position-relative">
                                        <img
                                            src={product.photos[0]}
                                            alt={product.name}
                                            className="card-img-top"
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
                                            className="btn btn-primary btn-sm mt-auto"
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
        </MainLayout>
    );
}
