import clases from '../../components/Background/styles/Background.module.css';
function Video(props) {

    return (
        <video autoPlay="autoplay" muted="muted" loop="loop" className={clases.background}>
            <source src={props.src} type="video/mp4"></source>
            {props.children}
        </video>
    );
}

export default Video;