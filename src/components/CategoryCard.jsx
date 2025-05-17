export default function CategoryCard({ image, title, description, link }) {
    return (
        <div className="col-md-4 mb-4 d-flex justify-content-center">
            <div className="card shadow-sm" style={{ width: '18rem', borderRadius: '10px' }}>
                <img src={image} className="card-img-top" alt={title} style={{ height: '180px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>
                        {description}
                    </p>
                    <a href={link} className="btn btn-primary">
                        Explore
                    </a>
                </div>
            </div>
        </div>
    );
}
