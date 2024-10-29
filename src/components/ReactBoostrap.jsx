import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

const ReactBoostrap = () => {
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    name: "",
    age: "",
    roll: "",
    photo: "",
  });

  const handleInputValue = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }
  

  const handleModalShow = () => {
    setModal(true);
  };

  const handleInputHide = () => {
    setModal(false);
  };

  return (
    <>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xl={10}>
            <Button
              onClick={handleModalShow}
              className="mb-2"
              variant="success"
            >
              Add New Student
            </Button>
            <Card>
              <Card.Header>
                <Card.Title>All Students</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Roll</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                
                    <tr>
                      <td>1</td>
                      <td>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                          src="https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80"
                          alt=""
                        />
                      </td>
                      <td>Siddique Ahmed</td>
                      <td>12</td>
                      <td>50</td>
                      <td>
                        <Button className="me-2" variant="info">
                          Edit
                        </Button>
                        <Button className="me-2" variant="warning">
                          View
                        </Button>
                        <Button className="me-2" variant="danger">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal show={modal} onHide={handleInputHide} centered>
        <Modal.Header>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="">Name</label>
            <input
              name="name"
              type="text"
              className="form-control mb-2"
              onChange={handleInputValue}
              value={input.name}
            />
            <label htmlFor="">Roll</label>
            <input
              name="roll"
              type="text"
              className="form-control mb-2"
              onChange={handleInputValue}
              value={input.roll}
            />
            <label htmlFor="">Age</label>
            <input
              name="age"
              type="text"
              className="form-control mb-2"
              onChange={handleInputValue}
              value={input.age}
            />
            <label htmlFor="">Photo</label>
            <input
              name="photo"
              type="text"
              className="form-control mb-2"
              onChange={handleInputValue}
              value={input.photo}
            />
            <Button type="submit">Add</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReactBoostrap;
