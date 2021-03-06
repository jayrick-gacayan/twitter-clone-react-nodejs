import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const SideNavigation = ({ userId }) => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light bg-white">
                <div className="container-fluid">
                    <ul className="navbar-nav d-flex flex-column flex-grow-1">
                        <li className="nav-item mb-3 clearfix">
                            <a className="navbar-brand" 
                                href="/dashboard">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="currentColor" 
                                    className="bi bi-twitter text-info" 
                                    viewBox="0 0 16 16"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        maxHeight: "50px",
                                        maxWidth: "50px"
                                    }}>
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                </svg>
                            </a>
                            <span className="fw-bold fs-5 d-lg-none d-inline-block float-end"
                                data-bs-dismiss="offcanvas" 
                                aria-label="Close">
                                &times;
                            </span>
                        </li>
                        {
                            userId && 
                            (
                                <React.Fragment>
                                    <SideNavigationMenuLink 
                                        activeOnlyWhenExact={ true }
                                        to="/dashboard"
                                        icon="house-door-fill"
                                        label="Home"
                                    />
                                    <SideNavigationMenuLink 
                                        activeOnlyWhenExact={ true }
                                        to={ `/profile/${ userId }` }
                                        icon="person-fill"
                                        label="Profile"
                                    />
                                </React.Fragment>
                            )
                        }
                        <SideNavigationMenuLink 
                            activeOnlyWhenExact={ true }
                            to={ `/explore` }
                            icon="hash"
                            label="Explore"
                        />
                        <li className="nav-item">
                            <a className="nav-link fs-2 " 
                                href="/dashboard">
                                <h6>
                                    <i className="bi bi-card-text me-3"></i>
                                    List
                                </h6>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

function SideNavigationMenuLink({ label, to, icon, activeOnlyWhenExact}){
    let resolved = useResolvedPath(to);
    
    let match = useMatch(
        {
            path: resolved.pathname,
            end: activeOnlyWhenExact
        }
    );

    return (
        <li className="nav-item">
            <Link className={ `nav-link fs-2 ${ match ? ' active': '' }` }
                to={ to }>
                <h6>
                    <i className={ `bi bi-${ icon } me-3` }></i>
                    { label }
                </h6>
            </Link>
        </li>
    );
}

export default SideNavigation;