import { Navbar, Container, Nav, Button } from "react-bootstrap";

export const NavBar = ({onLoggedOut}) => {
    var user = JSON.parse(localStorage.getItem("user"));

    const logoutBtn = <Button
    onClick={ev => onLoggedOut()} >Logout</Button>

    const loginBtn = <Nav.Link href="/login">
        <Button>Login</Button>
    </Nav.Link>

    return <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Movie app</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/user">User</Nav.Link>
                <Nav.Link href="/movies">Movies</Nav.Link>
            </Nav>
            </Navbar.Collapse>
            {user ? logoutBtn : loginBtn}
        </Container>
    </Navbar>
}