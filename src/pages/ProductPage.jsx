import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';



export default function ProductPage() {
    const { user, isLoggedIn } = useAuth();
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState('');


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get(`/products/${productId}`);
                setProduct(response.data);
                setSelectedPhoto(response.data.products.photos[0]);
            } catch (err) {
                setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) return <div className="text-center py-5">Loading product details...</div>;
    if (error) return <div className="text-danger text-center py-5">{error}</div>;
    if (!product) return <div className="text-center py-5">Product not found.</div>;

    const handleAddToCart = async () => {
        if (!product.products || product.products.inventory === 0) {
            toast.warn("This product is out of stock.");
            return;
        }



        // Logic to add the product to the cart
        // This could involve updating a global state or making an API call
        // For now, just navigate to the cart page

        try {
            const response = await api.post('/cart', {
                uid: user.id,
                pdi: product.products.pid,
                qyt: 1,
            });

            if (response.data) {
                toast.success("Product added to cart successfully!");
                // navigate('/cart'); // Redirect to cart page
            }

        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error("Failed to add product to cart. Please try again later.");
        }
    }

    return (
        <MainLayout>
            <div className="container py-5">
                <h2 className="text-center mb-4">{product.products?.name}</h2>
                <div className="row">
                    <div className="col-md-6">
                        {/* Display selected photo */}
                        <img
                            src={selectedPhoto}
                            alt={product.products?.name}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                        {/* Thumbnails */}
                        {product.products?.photos?.length > 1 && (
                            <div className="mt-3 d-flex gap-2">
                                {product.products.photos.map((photo, idx) => (
                                    <img
                                        key={idx}
                                        src={photo}
                                        alt={`${product.products?.name} ${idx + 1}`}
                                        className={`img-thumbnail ${photo === selectedPhoto ? 'border-primary' : ''}`}
                                        style={{ width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                                        onClick={() => setSelectedPhoto(photo)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <h4>
                            Price: <span className="text-success">₹{product.products?.price}</span>{' '}
                            <small className="text-muted text-decoration-line-through">₹{product.products?.originalPrice}</small>{' '}
                            <span className="badge bg-danger">{product.products?.discountPercentage}% OFF</span>
                        </h4>
                        <p>{product.products?.description}</p>
                        {product.products?.inventory === 0 ? (
                            <div className="text-danger fw-bold mb-3">Out of Stock</div>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-primary">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
