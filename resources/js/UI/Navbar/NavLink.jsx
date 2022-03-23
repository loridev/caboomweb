import { Link } from 'react-router-dom';
import classes from './styles/NavLink.module.css';

function NavLink(props) {
    return (
        <li className={classes.option}>
            <Link to={props.to}>{props.text}</Link>
        </li>
    );
}

export default NavLink;