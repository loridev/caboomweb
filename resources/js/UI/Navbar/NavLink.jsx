import classes from './styles/NavLink.module.css';

function NavLink(props) {
    return (
        <li className={classes.option}>
            <a href={props.to}>{props.text}</a>
        </li>
    );
}

export default NavLink;