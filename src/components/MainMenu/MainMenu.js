import { NavLink } from "react-router-dom";
import './MainMenu.css';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MainMenu() {
    return (
    <div className="mainmenu">
        <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item className="leftTab">
            <Nav.Link eventKey="/">
                <NavLink to="/" className="navButton" style={({ isActive }) => ({ 
                                    color: isActive ? 'white' : 'orange' })}>Home</NavLink></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="/explore">
                <NavLink to="/explore" className="navButton" style={({ isActive }) => ({ 
                                color: isActive ? 'white' : 'orange' })}>Explore</NavLink></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="/title">
                <NavLink to="/title" className="navButton" style={({ isActive }) => ({ 
                                color: isActive ? 'white' : 'orange' })}>Title</NavLink></Nav.Link>
        </Nav.Item>
        </Nav>
    </div>
    
    );
}

export default MainMenu;