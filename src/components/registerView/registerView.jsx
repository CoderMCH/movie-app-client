import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const RegisterView = ({url, onRegister}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const onHandleEvent = () => {
        event.preventDefault();
        const registerData = {
            "username": username,
            "password": password,
            "email": email,
            "birthday": birthday
        };

        fetch(url + "/user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(registerData) }).then(res => {
            if (res.ok) {
                res.json().then(user => {
                    onRegister(null, user.username);
                })
            }
            else {
                res.text().then(text => {
                    onRegister(text, null);
                })
            }
        }).catch(fetchErr => {
            console.error(fetchErr);
        })
    }

    return (
        <Form onSubmit={onHandleEvent}>
            <Form.Group controlId="registerFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={ev => setUsername(ev.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="registerFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={ev => setPassword(ev.target.value)} required/>
                <Form.Text>Your password must contain at least 8 characters, including special character, number, lower and uppercase letter</Form.Text> 
            </Form.Group>
            <Form.Group controlId="registerFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={ev => setEmail(ev.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="registerFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" value={birthday} onChange={ev => setBirthday(ev.target.value)} />
            </Form.Group>
            <Button variant="dark" type="submit">Register</Button>
        </Form>
    );
};
