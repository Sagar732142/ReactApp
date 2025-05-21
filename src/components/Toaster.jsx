import React from 'react'

export default function Toaster({ message }) {
    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto">Bootstrap</strong>
                <small className="text-body-secondary">11 mins ago</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
                {message ?? "Hello, world! This is a toast message.s"}
            </div>
        </div>
    )
}
