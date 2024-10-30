import axios from "axios";
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
import Swal from "sweetalert2";

const ReactBoostrap = () => {
  // modal show hide state
  const [modal, setModal] = useState(false);

  // form value state
  const [input, setInput] = useState({
    name: "",
    age: "",
    roll: "",
    photo: "",
  });

  // get all students state
  const [students, setStudents] = useState([]);

  // form value taken
  const handleInputValue = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!input.name || !input.age || !input.roll || !input.photo) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
    } else {
      await axios.post("http://localhost:7070/students", input);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Student has been saved successfuly",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setInput({
      name: "",
      age: "",
      roll: "",
      photo: "",
    });
  };

  // get all students
  const getAllStudents = async () => {
    const allStudents = await axios.get("http://localhost:7070/students");

    setStudents(allStudents.data);
  };
  getAllStudents()

  // modal showing function
  const handleModalShow = () => {
    setModal(true);
  };

  // modal hide function
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
                    {students.map((item, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                  src={item.photo}
                                  alt=""
                                />
                              </td>
                              <td>{item.name}</td>
                              <td>{item.roll}</td>
                              <td>{item.age}</td>
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
                          );
                        })}
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
