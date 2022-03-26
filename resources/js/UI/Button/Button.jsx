import clases from './Button.module.css';

function Button(props) {

    return (
        <button type={props.type} className={clases.button}><span>{props.children}</span></button>
    );
}

export default Button;