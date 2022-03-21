import classes from './styles/Hamburger.module.css';

function Hamburger(props) {
    return (
        <div onClick={props.onClick} className={classes.hamburger}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default Hamburger;