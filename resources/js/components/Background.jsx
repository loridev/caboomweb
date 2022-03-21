import clase from './styles/Background.module.css';
function Background(props) {
    return (
        <div className='clase'>
            {props.children}
        </div>
    );
}

export default Background;