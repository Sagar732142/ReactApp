import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card" aria-hidden="true">
                <div className="card-img-top bg-secondary" style={{ height: '200px', opacity: 0.2 }}></div>
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
