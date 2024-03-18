import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({url, onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onHandleEvent = () => {
        event.preventDefault();
        let loginData = {
            "username": username,
            "password": password
        };

        console.log(url + `/login?username=${username}&password=${password}`);
        fetch(url + `/login?username=${username}&password=${password}`, { method: "POST" }).then(res => {
            console.log(res);
            if (res.ok) {
                return res.json;
            } else {
                throw new Error(res);
            }
        }).then(resJson => {
            localStorage.setItem("user", JSON.stringify(resJson));
            onLoggedIn(username);
        }).catch(err => {
            console.log("error: ")
            console.error(err);
        })
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
            <Button variant="light" type="submit">Login</Button>
        </Form>
    );
};
