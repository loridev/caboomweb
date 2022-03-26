import { Link } from "react-router-dom";
import Form from "../components/Form/Form";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

function Register() {
    const register = () => console.log('hola');

    return (
        <div className="container">
            <Form onSubmit={register}>
                <Input id="user" label="Username: " />
                <Input id="email" label="Email: " />
                <Input id="pwd" label="Password: " />
                <Input id="repeat" label="Repeat password: " />
                <Button type="submit">Submit</Button>
            </Form>
            <p>
                Have an account already? <Link to="/login">Log in</Link>
            </p>
        </div>

    );
}

export default Register;