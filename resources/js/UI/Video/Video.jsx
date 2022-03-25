import clases from '../../components/styles/Background.module.css'
function Video(props) {

    return (
        <video autoPlay="autoplay" muted="muted" loop="loop" className={clases.background}>
            <source src={props.src} type="video/mp4"></source>
        </video>
    );
}

export default Video;