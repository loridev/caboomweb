import { Link } from 'react-router-dom';
import classes from './styles/NavLink.module.css';
// TODO : FUNCION QUE LLAMA A LA API EN UN ONCLICK DE UN DIV SI PROPS.TEXT ES LOG OUT
function NavLink(props) {
    return (
        <li className={classes.option}>
            <Link to={props.to}>{props.text}</Link>
        </li>
    );
}

export default NavLink;