import { useState } from "react";

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
        console.log("JSON " + JSON.stringify(registerData))

        fetch(`${url}/user`, { method: "POST", body: JSON.stringify(registerData), mode: "no-cors" }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <form onSubmit={onHandleEvent}>
            <label>Username:
                <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} required/>
            </label>
            <br></br>
            <label>Password:
                <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} required/>
            </label>
            <br></br>
            <label>Email:
                <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} required/>
            </label>
            <br></br>
            <label>Birthday:
                <input type="date" value={birthday} onChange={ev => setBirthday(ev.target.value)} />
            </label>
            <br></br>
            <button type="submit">Register</button>
        </form>
    );
};
