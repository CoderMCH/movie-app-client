import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { API } from "../../functions/api";

import "../passwordValidation.scss"

export const RegisterView = ({onRegister}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const [isValidPwd, setIsValidPwd] = useState(false);

    const onHandleEvent = () => {
        event.preventDefault();

        if (!isValidPwd) {
            alert("pwd invalid");
            return;
        }

        const registerData = {
            "username": username,
            "password": password,
            "email": email,
            "birthday": birthday
        };
        API.register(registerData, onRegister);
    }

    return (
        <Form onSubmit={onHandleEvent}>
            <Form.Group controlId="registerFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={ev => setUsername(ev.target.value)} required/>
            </Form.Group>
            <Form.Group controlId="registerFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={ev => {
                    const pwdCtrl = ev.target;
                    setPassword(pwdCtrl.value);
                    let ctrlPair = [
                        [document.querySelector("#hasLength"), pwdCtrl.value.length > 7],
                        [document.querySelector("#hasSym"), pwdCtrl.value.match(/[`~!@#$%^&*()\-+=_,./<>?;':"\[\]\\{}|]/)],
                        [document.querySelector("#hasNum"), pwdCtrl.value.match(/[0-9]/)],
                        [document.querySelector("#hasUpper"), pwdCtrl.value.match(/[A-Z]/)],
                        [document.querySelector("#hasLower"), pwdCtrl.value.match(/[a-z]/)]
                    ]
                    setIsValidPwd(true);
                    ctrlPair.forEach(pair => {
                        if (pair[1]) {
                            pair[0].classList.remove("invalid");
                            pair[0].classList.add("valid");
                        } else {
                            pair[0].classList.remove("valid");
                            pair[0].classList.add("invalid");
                            setIsValidPwd(false);
                        }
                    })
                }} required/>
                <Form.Text>
                    Your password must contain at least 8 characters, including special character, number, lower and uppercase letter
                    <ul id="registerPasswordValidation">
                        <li className="passwordValidation invalid" id="hasLength">8 characters</li>
                        <li className="passwordValidation invalid" id="hasSym">special character</li>
                        <li className="passwordValidation invalid" id="hasNum">number</li>
                        <li className="passwordValidation invalid" id="hasUpper">upper case</li>
                        <li className="passwordValidation invalid" id="hasLower">lower case</li>
                    </ul>
                </Form.Text>
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
