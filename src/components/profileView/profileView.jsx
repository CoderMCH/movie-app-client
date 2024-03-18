import { useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { MovieCard } from "../movieCard/movieCard";

export const ProfileView = ({ url, user, onUpdate, onDeregister, movies }) => {
    // should be from fetching
    let [username, setUsername] = useState(user.username);
    let [password, setPassword] = useState(user.password);
    let [email, setEmail] = useState(user.email);
    let [birthday, setBirthday] = useState(user.birthday);
    
    // need to add api
    // fetch(url + `/user/${user._id}`, {method: "GET", headers: {'Authorization': `Bearer ${user.token}`}}).then(res => {
    //     return res.json();
    // }).then(json => {
    //     console.log(json);
    //     if (json.message) {
    //         alert(json.message);
    //     } else {
    //         alert(json.username);
    //     }
    // }).catch(err => {
    //     console.error(err);
    // })

    return <>
        <Form>
            <Form.Group controlId="profileUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={username} onChange={ev => {
                    setUsername(ev.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId="profilePassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} onChange={ev => {
                    setPassword(ev.target.value);
                }}/>
                <Form.Text>Your password must contain at least 8 characters, including special character, number, lower and uppercase letter</Form.Text> 
            </Form.Group>
            <Form.Group controlId="profileEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" value={email} onChange={ev => {
                    setEmail(ev.target.value)
                }}/>
            </Form.Group>
            <Form.Group controlId="profileBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" value={birthday}
                onChange={ev => {
                    setBirthday(ev.target.value)
                }}/>
            </Form.Group>
            <Button style={{margin: "10px"}} onClick={() => {
                // update user data
                fetch(url + `/user/${user._id}`, {
                    method: "PUT",
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${user.token}` },
                    body: JSON.stringify({
                        "username": username,
                        "password": password,
                        "email": email,
                        "birthday": birthday
                    })}).then(res => {
                        return res.json();
                    }).then(json => {
                        // onUpdate(err, user)
                        if (json._id == user._id) {
                            alert("Update success");
                        } else {
                            alert("Update fail");
                        }
                    }).catch(err => {
                        console.error(err);
                    })
            }}>Update</Button>
            <Button style={{margin: "10px"}} onClick={() => {
                // deregister
                fetch(url + `/user`, {method: "DELETE",
                headers: {"Authorization": `Bearer ${user.token}`, "Content-type": "application/json"},
                body: JSON.stringify({"id": user._id})}).then(res => {
                        return res.text();
                    }).then(text => {
                        // onDeregister(err, user)
                        alert(text);
                    }).catch(err => {
                        console.error(err);
                    })
            }}>Deregister</Button>
        </Form>
        <h2>Favorite Movies</h2>
    </>
}
