import React from 'react';
import MainLayout from '../layouts/MainLayout';
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
    return (
        <MainLayout>
            <div className="container py-5">
                <h2 className="text-center mb-4">Our Products</h2>
                <p className="text-center text-muted mb-5">
                    Explore our curated collection for all your event and puja needs.
                </p>

                {productCategories.map((category) => {
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
                                                <a href="#" className="btn btn-primary mt-auto">Buy Now</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </MainLayout>
    );
}
