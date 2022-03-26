import Form from "../components/Form/Form";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Link } from 'react-router-dom';

function Login() {
    const logIn = () => console.log('hola');

    return (
        <div className="container">
            <Form onSubmit={logIn}>
                <Input id="user" label="Username: " />
                <Input id="pwd" label="Password: " />
                <Button type="submit">Submit</Button>
            </Form>
            <p>
                Still without an account? <Link to="/register">Register</Link>
            </p>
        </div>

    );
}

export default Login;