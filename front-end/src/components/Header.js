import React from "react";
import { useNavigate } from 'react-router-dom'
import { Navbar, NavLink, Nav } from 'react-bootstrap-v5'
import { NavDropdown } from 'react-bootstrap-v5'
import LogoImg from '../assets/images/logo.png'

const Header = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate(); //after update navigations automatlically react re-render component;
    const logout = () => {
        console.warn('Logout');
        localStorage.clear();
        navigate('/login');
    }
    console.log(LogoImg);

    return (
        <div className="header">
            <Navbar variant="dark" bg="dark" expand="lg" className="cutom-navbar">
                <div className="logoSection ms-4">
                    <img className="logo" src={LogoImg}
                    alt="logo" />
                </div>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                                    
            {
                auth ? <Navbar.Collapse id="navbar-dark-example" className="justify-content-left">
                <Nav> 
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Manage Products"
                        menuVariant="dark">
                        <NavDropdown.Item href="/products">Products</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavLink className="d-inline p-2 text-white" href="/profile">Profile</NavLink>                
                    <NavLink className="d-inline p-2 text-white" onClick={logout}>Logout ({JSON.parse(auth).name})</NavLink>
                </Nav>
                </Navbar.Collapse>
                :<Navbar.Collapse id="navbar-dark-example" className="justify-content-right">
                    <Nav className="justify-content-right navbar-nav ms-auto mb-2 col-lg-2 mb-lg-0-del">
                    <NavLink className="d-inline p-2 text-white" href="/register">Register</NavLink>
                    <NavLink className="d-inline p-2 text-white" href="/login">Login</NavLink>
                </Nav>
                </Navbar.Collapse>
            }                                                                                                                
                
            </Navbar>         
        </div>
    )
};

export default Header;