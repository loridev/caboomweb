import clases from './Button.module.css';

function Button(props) {

    return (
        <button className={clases.button}><span>{props.text}</span></button>
    );
}

export default Button;