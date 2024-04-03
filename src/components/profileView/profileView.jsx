import { useEffect, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { MovieCard } from "../movieCard/movieCard";
import { API } from "../../functions/api";
import { Link } from "react-router-dom";

import "../passwordValidation.scss"

export const ProfileView = ({ user, onUpdate, onDeregister, movies }) => {
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    let dateStr = user.birthday ? new Date(user.birthday).toISOString().split("T")[0] : "";
    const [birthday, setBirthday] = useState(dateStr);

    const [isValidPwd, setIsValidPwd] = useState(true);

    useEffect(() => {
        API.getUserById(user, (err, userData) => {
            if (err) {
                alert("Fail to load user\nError: " + err.message);
                return;
            }
            setUsername(userData.username);
            setPassword(password);
            setEmail(userData.email);
            let updatedDateStr = userData.birthday ? new Date(userData.birthday).toISOString().split("T")[0] : "";
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
                        <li className="passwordValidation valid" id="hasLength">8 characters</li>
                        <li className="passwordValidation valid" id="hasSym">special character</li>
                        <li className="passwordValidation valid" id="hasNum">number</li>
                        <li className="passwordValidation valid" id="hasUpper">upper case</li>
                        <li className="passwordValidation valid" id="hasLower">lower case</li>
                    </ul>
                </Form.Text>
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
                if (!isValidPwd) {
                    alert("invalid password");
                    return;
                }
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
