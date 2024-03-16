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
