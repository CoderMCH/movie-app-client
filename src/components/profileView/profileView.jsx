import { useEffect, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { MovieCard } from "../movieCard/movieCard";
import { API } from "../../functions/api";

export const ProfileView = ({ user, onUpdate, onDeregister, movies }) => {
    // should be from fetching
    let [username, setUsername] = useState(user.username);
    let [password, setPassword] = useState(user.password);
    let [email, setEmail] = useState(user.email);
    let [birthday, setBirthday] = useState(user.birthday);

    // need to add api
    // useEffect(() => {
    //     API.getUserById(user, (err, userData) => {
    //         setUsername(userData.username);
    //         setPassword(userData.password);
    //         setEmail(userData.email);
    //         setBirthday(userData.birthday);
    //     });
    // }, [user])

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
                API.updateUserData(url, user, {
                    "username": username,
                    "password": password,
                    "email": email,
                    "birthday": birthday
                }, onUpdate)
            }}>Update</Button>
            <Button style={{margin: "10px"}} onClick={() => {
                API.deregister(user, onDeregister);
            }}>Deregister</Button>
        </Form>
        <h2>Favorite Movies</h2>
    </>
}
