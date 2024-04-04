import { useState } from "react"
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap"

export const SearchBar = ({dropdown, checkbox, onSearch, onReset}) => {
    const [srchType, setSrchType] = useState(dropdown ? dropdown[0] : null);
    const [srchText, setSrchText] = useState("");
    const [srchFilter, setSrchFilter] = useState([]);
    
    return <>
        <div style={{margin: "5px"}}>
            {!srchType ? <></> :
                <Dropdown style={{display: "inline", marginRight: "10px"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">{srchType}</Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSrchType("Title")} >Title</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSrchType("Director")} >Director</Dropdown.Item>
                        {/* {dropdown.map(type => {
                            return <Dropdown.Item key={`${type}_dropdown`} onClick={() => setSrchType({type})}>{type}</Dropdown.Item>
                        })} */}
                    </Dropdown.Menu>
                </Dropdown>
            }
            <input type="text" id="searchText" placeholder="Search Bar" onChange={ev => {setSrchText(ev.target.value)}}
                style={{marginRight: "10px"}} value={srchText}/>
            <Button style={{marginRight: "10px"}} onClick={() => onSearch(srchType, srchText, srchFilter)}>Search</Button>
            <Button style={{marginRight: "10px"}} onClick={() => {
                onReset();
                setSrchText("");
            }}>Reset</Button>
        </div>
        <Row id="filter-block" style={{minHeight: "48px", marginTop: "10px"}}>
            {!checkbox ? <></> :
            checkbox.map(box => {
                return <Col md={2}>
                        <Form.Check type="checkbox" aria-label="radio 1">
                            <Form.Check.Input id={`${box}_checkbox`} onChange={ev => {
                                let filter = srchFilter;
                                if (ev.target.checked) {
                                    filter.push(box);
                                    setSrchFilter(filter)
                                } else {
                                    filter.splice(srchFilter.indexOf(box))
                                    setSrchFilter(filter);
                                }
                            }}/>
                            <Form.Check.Label htmlFor={`${box}_checkbox`}>{box.toUpperCase()}</Form.Check.Label>
                        </Form.Check>
                    </Col>
            })}
        </Row>
    </>
}