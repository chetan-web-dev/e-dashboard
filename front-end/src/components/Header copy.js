import React from "react";
import { useNavigate } from 'react-router-dom'
import { Navbar, NavLink, Nav } from 'react-bootstrap-v5'
import { NavDropdown } from 'react-bootstrap-v5'

const Header = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate(); //after update navigations automatlically react re-render component;
    const logout = () => {
        console.warn('Logout');
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div className="header">
            <Navbar variant="dark" bg="dark" expand="lg" className="cutom-navbar">
                <div className="logoSection">
                    <img className="logo" src="https://yt3.googleusercontent.com/ytc/AOPolaSpbKm2DF0CtKIde4QLZnbeabZON-IiDc1XqtYM0Q=s176-c-k-c0x00ffffff-no-rj"
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
                        <NavDropdown.Item href="/product/add">Add Product</NavDropdown.Item>
                        <NavDropdown.Item href="/product/update">Update Product</NavDropdown.Item>
                        <NavDropdown.Item href="/product/delete">Delete Product</NavDropdown.Item>
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
                    <Nav className="justify-content-right">
                    <NavLink className="d-inline p-2 text-white" href="/register">Register</NavLink>
                    <NavLink className="d-inline p-2 text-white" href="/login">Login</NavLink>
                </Nav>
                </Navbar.Collapse>
            }                                                                                                                
                
            </Navbar>
            {/* <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/delete">Delete Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li>
                    {auth ? <Link to="/register" onClick={logout}>Logout</Link>:
                    <li><Link to="/register">Register</Link></li>}  
                    <li><Link to="/login">Login</Link></li>                  
                </li>  
                {/* <li>{!auth?<Link to="/login">Login</Link>:''}</li>*/}
            { /*</ul> */}          
        </div>
    )
};

export default Header;