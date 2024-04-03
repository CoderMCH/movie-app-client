import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API } from "../../functions/api";

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onHandleEvent = () => {
        event.preventDefault();
        API.login({"username": username, "password": password}, onLoggedIn);
    }

    return (
        <Form onSubmit={onHandleEvent}>
            <Form.Group controlId="loginFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={ev => setUsername(ev.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="loginFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={ev => setPassword(ev.target.value)} required/>
            </Form.Group>
            <Button variant="dark" type="submit" style={{marginTop: "5px"}}>Login</Button>
        </Form>
    );
};
