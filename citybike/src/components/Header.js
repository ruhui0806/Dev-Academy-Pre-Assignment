import React from 'react'
import logo from './bikelogo.png'

export default function Header() {
    return (
        <nav className="navbar mb-4 p-0">
            <div className="container">
                <a href="/" className="navbar-brand">
                    <div className="d-flex">
                        <img
                            src={logo}
                            alt="City Bike Logo"
                            className="mr-2 img-fluid d-inline-block align-text-top"
                        />
                        <div>Helsinki City Bike App</div>
                    </div>
                </a>
            </div>
        </nav>
    )
}
