import { Link } from "react-router-dom";

export default function CategoryCard({ image, title, description, link, buttonText }) {
    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow-sm" style={{ width: '18rem', borderRadius: '10px' }}>
                <img src={image} className="card-img-top" alt={title} style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                        {description}
                    </p>
                    <Link to={link} className="btn btn-primary btn-sm">
                        {buttonText ?? "Explore"}
                    </Link>
                </div>
            </div>
        </div>
    );
}
