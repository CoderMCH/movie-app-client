import { Navbar, Container, Nav } from "react-bootstrap";

export const NavBar = () => {
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
        </Container>
    </Navbar>
}