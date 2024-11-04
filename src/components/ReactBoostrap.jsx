import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import './ReactBootstrap.css'
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const ReactBoostrap = () => {
  // add modal show hide state
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

  // student edit state
  const [editModalShow, setEditModalShow] = useState(false);

  // view modal state
  const [viewModal, setViewModal] = useState(false);

  // view student
  const [viewStudent, setViewStudent] = useState([]);

  //student form value taken
  const handleInputValue = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // form validation
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
        showConfirmButton: true,
        timer: 2000,
      });
      setTimeout(() => {
        handleModalHide();
        getAllStudents();
      }, 1000);
      setInput({
        name: "",
        age: "",
        roll: "",
        photo: "",
      });
    }
  };

  // get all students
  const getAllStudents = async () => {
    const allStudents = await axios.get("http://localhost:7070/students");

    setStudents(allStudents.data);
  };

  //student add modal show
  const handleModalShow = () => {
    setModal(true);
  };

  //student add modal hide
  const handleModalHide = () => {
    setModal(false);
    setInput({
      name: "",
      age: "",
      roll: "",
      photo: "",
    });
  };

  // student delete
  const handleStudentDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:7070/students/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
      getAllStudents();
    });
  
    
  };

  // protect student reRender
  useEffect(() => {
    getAllStudents();
  }, []);
  // student edit modal show
  const handleEditModal = (id) => {
    setInput(students.find((data) => data.id === id));

    setEditModalShow(true);
  };

  // student edit modal hide
  const handleEditModalHide = () => {
    setEditModalShow(false);
    setInput({
      name: "",
      age: "",
      roll: "",
      photo: "",
    });
  };

  // student edit form submit
  const handleEditForm = async (e) => {
    e.preventDefault();

    await axios.patch(`http://localhost:7070/students/${input.id}`, input);
    getAllStudents();
    handleEditModalHide();
  };

  // handle view modal show
  const handleViewModalShow = async (id) => {
    try {
      const viewStu = await axios.get(`http://localhost:7070/students/${id}`);
      setViewStudent(viewStu.data);
      setViewModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  // handle view modal hide
  const handleViewModalHide = () => {
    setViewModal(false);
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
                  {/* student table header */}
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
                    {students.length === 0 ? (
                      <tr>No Data Found</tr>
                    ) : (
                      students.map((item, index) => {
                        return (
                          <tr key={index}>
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
                              <Button
                                onClick={() => handleEditModal(item.id)}
                                className="me-2"
                                variant="info"
                              >
                                <FaRegEdit />
                              </Button>
                              <Button
                                onClick={() => handleViewModalShow(item.id)}
                                className="me-2"
                                variant="warning"
                              >
                                <FaEye />
                              </Button>
                              <Button
                                onClick={() => handleStudentDelete(item.id)}
                                className="me-2"
                                variant="danger"
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* student add modal with form */}
      <Modal show={modal} onHide={handleModalHide} centered>
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
      {/* student edit modal */}
      <Modal show={editModalShow} onHide={handleEditModalHide} centered>
        <Modal.Header>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditForm}>
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
      {/* student data view */}
      <Modal show={viewModal} onHide={handleViewModalHide} centered>
        <Modal.Header>
          <Modal.Title>View Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <>
              <Col xl={6}>
                <img className="w-100" src={viewStudent.photo} alt="" />
              </Col>
              <Col xl={6}>
                <h3 className="name-truncate" title={viewStudent.name}>
                  {viewStudent.name > 10
                    ? `${viewStudent.name.slice(0, 12)}...`
                    : viewStudent.name}
                </h3>
                <h5>{viewStudent.roll}</h5>
                <h5>{viewStudent.age}</h5>
              </Col>
            </>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReactBoostrap;
