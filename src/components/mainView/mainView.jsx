import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard/movieCard";
import { MovieView } from "../movieView/movieView";
import { LoginView } from "../loginView/loginView";
import { RegisterView } from "../registerView/registerView";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { NavBar } from "../navBar/navBar";
import { ProfileView } from "../profileView/profileView";
import { API } from "../../functions/api";

export const MainView = () => {
    // user: { username: "", password: "", email: "", birthday: "", token: "", _id: "" }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser && "username" in storedUser ? storedUser : null);
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        API.getMoviesList(user, (data) => {setMovies(data)});
    }, [user])

    return (
        <BrowserRouter>
            <NavBar onLoggedOut={() => {
                setUser(null);
                localStorage.removeItem("user");
            }}></NavBar>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route path="/" element={ <>HomePage</> } />
                    <Route path="/login" element={
                        user ? <Navigate to="/" /> :
                        <Col md={5}>
                            <LoginView onLoggedIn={(err, user) => {
                                if (err) {
                                    alert(`Login fail\nError: ${err}`);
                                } else {
                                    alert(`Login success\nUsername: ${user.username}`)
                                    setUser(user);
                                }
                            }}/>
                            <br />
                            <div>Don't have an account? <Link to="/signup">Signup</Link></div>
                        </Col>
                    } />
                    <Route path="/signup" element={
                        user ? <Navigate to="/" /> :
                        <Col md={5}>
                            <RegisterView onRegister={(err, username) => {
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
                        !user ? <Navigate to={"/"} /> : <MovieView className="h-100" user={user} movies={movies} />
                    } />
                    <Route path="/user" element={
                        !user ? <Navigate to={"/login"} /> :
                        <ProfileView user={user} movies={movies}
                        onUpdate={(mesg, newUser) => {
                            if (mesg) {
                                alert(`Update fail\nError: ${mesg}`)
                            } else {
                                newUser.token = user.token;
                                setUser(newUser);
                                localStorage.setItem("user", JSON.stringify(user));
                                alert("Update Success");
                            }
                        }}
                        onDeregister={(mesg) => {
                            alert(mesg);
                            setUser(null);
                        }} />
                    } />
                </Routes>
            </Row>
        </BrowserRouter>
    )
    
};
