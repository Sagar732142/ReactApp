import React from 'react';

export default function AboutPage() {
    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">About Us</h2>
            <p className="text-center text-muted mb-5">
                Your one-stop destination for all event and puja essentials.
            </p>

            <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                    <img
                        src="https://source.unsplash.com/600x400/?festival,puja,market"
                        alt="Festival Items"
                        className="img-fluid rounded shadow-sm"
                    />
                </div>
                <div className="col-md-6">
                    <h4 className="mb-3">Bringing Traditions to Your Doorstep</h4>
                    <p>
                        We are passionate about festivals, rituals, and celebrations that bring people together.
                        Our mission is to simplify the way you shop for any kind of puja or event — from Diwali diyas and Holi colors to birthday decor and Eid gifts.
                    </p>
                    <p>
                        Founded with love and rooted in tradition, our store offers a curated selection of authentic, high-quality products for all your religious and festive needs.
                        Whether you're celebrating at home or organizing a grand event, we have something for everyone.
                    </p>
                    <p>
                        With fast delivery, dedicated customer support, and a wide variety of items, we're proud to be your trusted online event store.
                    </p>
                </div>
            </div>

            <div className="mt-5 p-4 bg-light rounded shadow-sm text-center">
                <h5>Why Choose Us?</h5>
                <ul className="list-unstyled mt-3 mb-0">
                    <li>✅ Authentic festival and puja items</li>
                    <li>✅ Quick delivery across India</li>
                    <li>✅ Handpicked quality products</li>
                    <li>✅ Trusted by 10,000+ customers</li>
                </ul>
            </div>
        </div>
    );
}
