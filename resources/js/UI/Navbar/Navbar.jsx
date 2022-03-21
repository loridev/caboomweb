import { useState } from "react";
import Hamburger from "./Hamburger";
import Logo from "./Logo";
import classes from './styles/Navbar.module.css';

function Navbar(props) {
    const [showNav, setShowNav] = useState(false);

    const toggleNavbar = () => setShowNav(!showNav); 

    return (
        <div className={`${classes.navbar}`}>
            <Logo />
            <Hamburger onClick={toggleNavbar} />
            <div className={`${classes.links} ${showNav ? null: classes.hide}`}>
                { props.children }
            </div>
        </div>
    );
}

export default Navbar;