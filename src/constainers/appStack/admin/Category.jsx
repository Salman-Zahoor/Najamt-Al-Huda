import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavigationDrawer from "../../../components/navigationDrawer";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import Buttons from "../../../components/Buttons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextFeilds from "../../../components/TextFeilds";
import DeleteIcon from "@mui/icons-material/Delete";
// import { addProduct, deleteProduct, getAllProducts } from "../../services/products/Products";
import { AppContext } from "../../../context";
import Loader from "../../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ImageCompressor from "image-compressor.js";
import axios from "axios";
import swal from "sweetalert";
import { Pagination } from "antd";
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from "../../../services/employee/Employee";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../../services/admin/Admin";

const Category = () => {
  const { user } = useContext(AppContext);
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [flavorError, setflavorError] = useState("");
  const [descError, setDescError] = useState("");
  const [catError, setCatError] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const [inputValues, setInputValues] = useState({
    id:"",
    name: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };


  useEffect(() => {
    getEmployeesData();
  }, [currentPage]);

  const productDelete = (deleteId) => {
    deleteCategory(user.token, deleteId).then((res)=>{
     if(res.status === 200){
      swal("Poof! Your Employee  has been deleted!", {
        icon: "success",
      });
      getEmployeesData();
     }
    }).catch((error)=>{
      toast.error("Somwthing went wrong")
    })
  };

  const getEmployeesData = () => {
    setIsLoading(true);
    getAllCategories(user.token, currentPage)
      .then((res) => {
        // console.log(res?.data?.data, "productssssss")
        setIsLoading(false);
        if (res.status === 200) {
          let data = res?.data?.data;
          setEmployeeData(data);
          let cPage = res?.data?.currentPage;
          let tPage = res?.data?.totalPages;
          tPage = tPage * pageSize;
          // console.log("Current: ", cPage)
          // console.log("Total: ", tPage)
          setCurrentPage(cPage);
          setTotalPages(tPage);
        }
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateProductss = () => {
    const { name } =
      inputValues;

    let body = {
      name,
    };
    let hasError = false;

    if (name == "") {
      toast.error("Name is required");
    } else {
      setIsLoading(true);
      updateCategory(user.token,inputValues?.id,body)
        .then((res) => {
          console.log(res,"resppppppppppppppp");
          setIsLoading(false);
          if (res.status === 200) {
            getEmployeesData();
            toggle();
            toast.success(res?.data?.message);
          }else{
            setIsLoading(false);
            toast.error("Something went wrong");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Something went wrong");
        });
    }
  };

  const handleAddProductss = () => {
    const { name, email, description, profession, image, contactNo,category } =
      inputValues;

    let body = {
      name,
      email,
      description,
      profession,
      image: image,
      contactNo,
      category
    };
    let hasError = false;

    if (name == "") {
      toast.error("Name is required");
    }  else {
      setIsLoading(true);
      createCategory(user.token, body)
        .then((res) => {
          console.log(res,"resppppppppppppppp");
          setIsLoading(false);
          if (res.status === 200) {
            getEmployeesData();
            toggle();
            toast.success(res?.data?.message);
          }else{
            setIsLoading(false);
            toast.error("Something went wrong");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Something went wrong");
        });
    }
  };

  const toggle = () => {
    setInputValues({
      name: "",
    })
    setModal(!modal);
    setUpdateModal(false)
  }

  const updateToggle = (item) => {
    if (item) {
      setUpdateModal(!updateModal);
      setInputValues({
        id:item?._id,
        name:item?.name,
      })
    }else{
      setUpdateModal(!updateModal)
    }
   
  };
  const deleteToggle = (id) => {
    setDeleteId(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        productDelete(id);
      } else {
        swal("Your Category is safe!");
      }
    });
  };

  return (
    <>
      <NavigationDrawer>
        {isLoading && <Loader isLoading={isLoading} />}
        <div>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="top-section text-center pt-3 mb-5">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className=" d-flex align-items-center justify-content-start gap-1">
                    <HomeIcon />
                    <Link to="/dashboard" className="mt-1">
                      Dashboard /{" "}
                    </Link>
                    <span className="  fs-3">Categories</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-end">
                    <Buttons name="Add Category" onClick={toggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="add-product-modal ">
            <Modal isOpen={modal} toggle={toggle} className="pt-5 w-100">
              <ModalHeader toggle={toggle}>ADD Category</ModalHeader>
              <ModalBody
                className="p-4"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
               <div className="row">
                <div className="col-md-12">
                <div className="text-fields mt-3 w-100">
                  <TextFeilds
                    label="Category Title"
                    className='w-100'
                    size="small"
                    value={inputValues.name}
                    onChange={(e) => handleOnChange(e)}
                    name="name"
                    id="name"
                    error={!!nameError}
                    helperText={nameError}
                  />
                </div>
                </div>
               </div>
              </ModalBody>
              <ModalFooter>
                <div onClick={handleAddProductss}>
                  <Buttons name="Create" />
                </div>
              </ModalFooter>
            </Modal>
          </div>
          <div className="add-product-modal ">
            <Modal isOpen={updateModal} toggle={()=>updateToggle(null)} className="pt-5 w-100">
              <ModalHeader toggle={()=>updateToggle(null)}>Update Category</ModalHeader>
              <ModalBody
                className="p-4"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                <div className="row">
                  <div className="col-md-12">
                  <div className="text-fields mt-3">
                  <TextFeilds
                    label="Category Title"
                    className='w-100'
                    size="small"
                    value={inputValues.name}
                    onChange={(e) => handleOnChange(e)}
                    name="name"
                    id="name"
                    error={!!nameError}
                    helperText={nameError}
                  />       
                </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div onClick={handleUpdateProductss}>
                  <Buttons name="Update" />
                </div>
              </ModalFooter>
            </Modal>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeData.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className="text-success edit-product "
                        onClick={()=>updateToggle(item)}
                      >
                        <BorderColorIcon />
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className="text-danger edit-product"
                        onClick={() => deleteToggle(item._id)}
                      >
                        <DeleteIcon />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="d-flex align-items-center justify-content-center mt-3">
          <Pagination
            className="pagination"
            total={totalPages}
            current={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
          </div>
        </div>
      </NavigationDrawer>
    </>
  );
};

export default Category;
