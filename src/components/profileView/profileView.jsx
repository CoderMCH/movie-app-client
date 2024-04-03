import { useEffect, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { MovieCard } from "../movieCard/movieCard";
import { API } from "../../functions/api";
import { Link } from "react-router-dom";

export const ProfileView = ({ user, onUpdate, onDeregister, movies }) => {
    let [username, setUsername] = useState(user.username);
    let [password, setPassword] = useState(user.password);
    let [email, setEmail] = useState(user.email);
    let dateStr = new Date(user.birthday).toISOString().split("T")[0];
    let [birthday, setBirthday] = useState(dateStr);

    useEffect(() => {
        API.getUserById(user, (err, userData) => {
            if (err) {
                alert("Fail to load user\nError: " + err.message);
                return;
            }
            setUsername(userData.username);
            setPassword(password);
            setEmail(userData.email);
            let updatedDateStr = new Date(userData.birthday).toISOString().split("T")[0];
            setBirthday(updatedDateStr);
        });
    }, [user])

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
                API.updateUserData(user, {
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
        <Row>{
            movies.map(thisMovie => {
                if (user.favoriteMovies.find(favorite => favorite === thisMovie._id)) {
                    return <Col md={3} key={ thisMovie._id }>
                        <Link to={`/movie/${thisMovie._id}`}>
                            <MovieCard className="h-100" movie={thisMovie} />
                        </Link>
                    </Col>
                }
            })
        }</Row>
    </>
}
