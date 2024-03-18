import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../loginView/loginView";
import { RegisterView } from "../registerView/registerView";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { NavBar } from "../navBar/navBar";
import { ProfileView } from "../profileView/profileView";

const appUrl = "https://mch-flix-app-813b2fce5e48.herokuapp.com"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY0Y2NjMGJmZDE0ODM5NTIxMDhkMmYiLCJ1c2VybmFtZSI6Ik1DSDEyMyIsInBhc3N3b3JkIjoiJDJiJDEwJHlJakFTSG9iQUV4aE0yQXliV1o4aHUzWDNsNndvbVY5MEVKVFBIM3JWMUw2RVUyTUltMXVhIiwiZW1haWwiOiJtYW5jaGluZ2hpbkBnbWFpbC5jb20iLCJiaXJ0aGRheSI6bnVsbCwiZmF2b3JpdGVNb3ZpZXMiOltdLCJfX3YiOjAsImlhdCI6MTcxMDY1MzE1NSwiZXhwIjoxNzExMjU3OTU1LCJzdWIiOiJNQ0gxMjMifQ.MpUuyZ-boIorZVjWOcPwkCJfI_KUDhBteynILCoHOjU";

export const MainView = () => {
    // user: { username: "", token: "", _id: "" }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser && "username" in storedUser ? storedUser : null);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        if (!user) return;
        fetch(appUrl + "/movies", {method: "GET", headers: { 'Authorization': `Bearer ${user.token}` }})
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            }).catch(err => {
                console.error(err);
            })
    }, [user])

    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route path="/" element={ <>HomePage</> } />
                    <Route path="/login" element={
                        user ? <Navigate to="/" /> :
                        <Col md={5}>
                            <LoginView url={appUrl} onLoggedIn={(err, user) => {
                                if (err) {
                                    alert(`Login fail\nError: ${err}`);
                                } else {
                                    alert(`Login success\nUsername: ${user.username}`)
                                    setUser(user);
                                }
                            }}/>
                        </Col>
                    } />
                    <Route path="/signup" element={
                        user ? <Navigate to="/" /> :
                        <Col md={5}>
                            <RegisterView url={appUrl} onRegister={(err, username) => {
                                if (err) {
                                    alert(`Register fail\nError: ${err}`);
                                } else {
                                    alert(`Register success\nUsername: ${username}`);
                                }
                            }}/>
                        </Col>
                    } />
                    <Route path="/movies" element={
                        !user ? <Navigate to={"/login"} /> :
                        (movies.length === 0) ? <>The list is empty</> :
                            <Row>{movies.map((movie) => {
                                return <Col md={3} key={ movie._id }>
                                    <Link to={`/movie/${movie._id}`}>
                                        <MovieCard movie={ movie } />
                                    </Link>
                                </Col>
                            })}</Row>
                    } />
                    <Route path="/movie/:id" element={
                        !user ? <Navigate to={"/"} /> : <MovieView className="h-100" movies={movies} />
                    } />
                    <Route path="/user" element={
                        !user ? <Navigate to={"/login"} /> :
                        <ProfileView url={appUrl} user={user} movies={movies} />
                    } />
                </Routes>
            </Row>
        </BrowserRouter>
    )
    
};
