import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import Modal from "./Modal/Modal";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./Read.css";
import TextBox from "./TextBox";
//useEffect ek hook hai jo hit hoga jab bhi aapke data me koi bhi change hoga

// toast.configure();
let boxColor;
const Read = () => {
  const [isUpdate, setIsUpdate] = useState(null);

  const form = useForm();
  const { register, handleSubmit, formState, reset, control, setValue } = form;
  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState;
  const [show, setShow] = useState(false);

  const [data, setData] = useState([]); //Creating an empty array for storing the data which is recieved
  const [tabledark, setTabledark] = useState(""); //For Dark mode
  // const navigate = useNavigate();
  //Reading the Data from the API-Why it is getting Data two times?

  //React Toastify
  const showToastMessage = (notificationType, message) => {
    toast[notificationType](message);
    // console.log(toast.success("Success Notification !"));
  };

  //Sweet Alert
  async function alert(title, icon, text, confirmButtonText) {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText,
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  function getData() {
    axios
      .get(
        "https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube"
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data); //Storing the recieved data for showing it on the page.
      });
  }

  const handleClose = () => {
    setShow(false);
    reset({});
    // getData();
    setIsUpdate(null);
  };
  const handleShow = () => setShow(true);

  //Handling Delete
  async function handleDelete(id) {
    const askUser = await alert(
      "Are you sure you want to delete",
      "warning",
      "You won't be able to revert this!",
      "Yes, delete it"
    );
    if (askUser) {
      axios
        .delete(
          `https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube/${id}`
        )
        .then(() => {
          getData();
          showToastMessage("error", "Entry Deleted!!");
        })
        .catch((err) => {
          Swal.fire({
            title: "Operation failed",
            text: "An Error has been Occur.",
            icon: "error",
          });
        });
    }
  }
  /*
    Swal.fire({
      title: "Are you sure you want to delete",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube/${id}`
          )
          .then(() => {
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your file has been deleted.",
            //   icon: "success",
            // });
            getData();
            showToastMessage("error", "Entry Deleted!!");
          })
          .catch((err) => {
            Swal.fire({
              title: "Operation failed",
              text: "An Error has been Occur.",
              icon: "error",
            });
          });
      }
    });
    // axios
    //   .delete(
    //     `https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube/${id}`
    //   )
    //   .then(() => {
    //     getData();
    //   });*/
  // }
  //This is for showing the data to the local storage if we click on edit button for particular id.
  // const setToLocalStorage = (id, name, email) => {
  //   localStorage.setItem("id", id);
  //   localStorage.setItem("name", name);
  //   localStorage.setItem("email", email);
  // };
  useEffect(() => {
    getData();
  }, []); //This wil hit every time when we change the data on our site. Also if we pass data in this empty array [data] it continue to call infinite times. So pass it empty it, so this function is called only one time.

  //Handle Update - manage
  //Local server ka data show/get karvane ke liye.
  // useEffect(() => {
  //   setId(localStorage.getItem("id"));
  //   setName(localStorage.getItem("name"));
  //   setEmail(localStorage.getItem("email"));
  // }, []);

  //Updated data by user handled by this.
  const update = async (data) => {
    console.log(data);
    const askUser = await alert(
      "Update",
      "question",
      "Are you sure you, want to update",
      "Yes, Update"
    );
    if (askUser) {
      axios
        .put(
          `https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube/${data.id}`,
          {
            name: data.name,
            email: data.email,
            status: data.status,
          }
        )
        .then(() => {
          console.log(data);
          showToastMessage("success", "Field has been updated");
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    /*Swal.fire({
      title: "Are you sure, you want to update?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube/${data.id}`,
            {
              name: data.name,
              email: data.email,
            }
          )
          .then(() => {
            console.log(data);
            showToastMessage("success", "Field has been updated");
            getData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }); */
  };

  //Handle Create
  const add = async (data) => {
    console.log("Form Submitted", data);
    const askUser = await alert(
      "Are you sure",
      "question",
      "You want to create this field!",
      "Yes, Create"
    );
    if (askUser) {
      try {
        const response = await fetch(
          "https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
      showToastMessage("success", "Field has been created!");
      getData();
    }

    /*
    Swal.fire({
      title: "Are you sure?",
      text: "You want to create this field!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            "https://666a85eb7013419182cf988b.mockapi.io/crud-operations/crud-youtube",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.log(error);
        }
        // Swal.fire({
        //   title: "Created!",
        //   text: "Your file has been created.",
        //   icon: "success",
        // });
        showToastMessage("success", "Field has been created!");
        getData();
      }
    }); */
  };

  //For only opening the form Modal
  const openFormEditor = (data) => {
    // if (data) {
    //   handleShow();
    //   reset();
    // } else {
    //   handleShow();
    //   reset();
    // }
    // console.log(data);
    reset(data || {});
    handleShow();
  };

  //Handle Update
  // const onUpdate = (data) => {
  //   console.log(data);
  //   update(data);
  //   handleClose();
  // };
  // //Handle Add
  // const onAdd = (data) => {
  //   console.log(data);
  //   add(data);
  //   handleClose();
  // };

  //On Submit
  const onsubmit = async (data) => {
    if (isUpdate) {
      console.log("Update");
      console.log(data);
      update(data);
    } else {
      console.log("Add");
      console.log(data);
      add(data);
    }
    handleClose();

    console.log("Data Submitted", data);
  };

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") {
              setTabledark("");
            } else {
              setTabledark("table-dark");
            }
          }}
        />
        <label className="form-check-label">Dark Mode</label>
      </div>
      <div className="d-flex justify-content-between">
        <h2>Read Operation</h2>

        <button
          className="btn btn-secondary"
          onClick={() => openFormEditor()}
          id="add"
        >
          Create New Field
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Field</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form noValidate>
              <TextBox
                labelName={"Username"}
                regName="name"
                typeName="text"
                formReg={register("name", {
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  maxLength: {
                    value: 50,
                    message: "Max 50 characters allowed",
                  },
                })}
              />
              <p className="error">{errors.name?.message}</p>

              <TextBox
                labelName={"Email"}
                typeName={"email"}
                formReg={register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    //Validation
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Invalid E-mail Format",
                  },
                })}
              />
              <p className="error">{errors.email?.message}</p>

              {/* Status */}
              <div>
                {" "}
                <label htmlFor="status">Choose Status: </label>
                <select name="status" id="status" {...register("status")}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit(onsubmit)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {data.map((eachData, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>{eachData.name}</td>
                <td>{eachData.email}</td>
                <td>
                  {eachData.status === "active"
                    ? (boxColor = "active")
                    : (boxColor = "inactive")}
                  <div className={boxColor}></div>
                </td>

                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setIsUpdate(eachData);
                      openFormEditor(eachData);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(eachData.id)} //Why we use arrow function in this?
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Read;
