import Form from "../components/Form/Form";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import Http from "../utils/Http";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const logIn = async (ev) => {
        ev.preventDefault();

        setIsLoading(true);

        const responseFromApi = await Http.fetchData({
            url: '/api/v1/users/login',
            method: 'POST',
            body: {
                username: ev.target[0].value,
                password: ev.target[1].value,
            }
        });

        setIsLoading(false);

        if (responseFromApi.status) {
            navigate('/');
        }
    };

    return (
        <div className="container">
            <Form onSubmit={logIn}>
                <Input id="user" label="Username: " />
                <Input id="pwd" label="Password: " />
                <Button type="submit">Submit</Button>
            </Form>
            <LoadingSpinner show={isLoading} />
            <p>
                Still without an account? <Link to="/register">Register</Link>
            </p>
        </div>

    );
}

export default Login;