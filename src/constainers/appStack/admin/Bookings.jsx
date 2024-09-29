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
import { getAllBookings } from "../../../services/admin/Admin";

const Bookings = () => {
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



// console.log('====================================');
// console.log(employeeData,"employeeDataemployeeDataemployeeDataemployeeData");
// console.log('====================================');
  const [options, setOptions] = useState([
    {
      title: "",
      isOpened: false,
      subOptions: [
        {
          name: "",
          isSelected: false,
        },
      ],
    },
  ]);

  const [inputValues, setInputValues] = useState({
    id:"",
    name: "",
    email: "",
    description: "",
    contactNo: "",
    profession: "",
    image: "",
    category:"",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleOnChangeOptions = (e, mainIndex) => {
    const { name, value } = e.target;
    let dummy = [...options];
    dummy[mainIndex].title = value;
    console.log(dummy, "dummmmmmmmmmmmm");
    setOptions(dummy);
  };

  const handleOnChangeSuboptions = (e, mainIndex, subIndex) => {
    const { name, value } = e.target;
    let dummy = [...options];
    dummy[mainIndex].subOptions[subIndex].name = value;
    console.log(dummy, "dummmmmmmmmmmmm");
    setOptions(dummy);
  };
  const fileInputRef = useRef(null);

  useEffect(() => {
    getEmployeesData();
  }, [currentPage]);

  const productDelete = (deleteId) => {
    deleteEmployee(user.token, deleteId).then((res)=>{
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
    getAllBookings(user.token, currentPage)
      .then((res) => {
        console.log(res?.data, "productssssss")
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
    } else if (email == "") {
      toast.error("Email is required");
    } else if (contactNo == "") {
      toast.error("Email is required");
    } else if (profession == "") {
      toast.error("Email is required");
    } else if (category == "") {
      toast.error("Category is required");
    } else if (image == "") {
      toast.error("Image is required");
    } else {
      setIsLoading(true);
      updateEmployee(user.token,inputValues?.id,body)
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
    } else if (email == "") {
      toast.error("Email is required");
    } else if (contactNo == "") {
      toast.error("Email is required");
    } else if (profession == "") {
      toast.error("Email is required");
    } else if (category == "") {
      toast.error("Category is required");
    } else if (image == "") {
      toast.error("Image is required");
    } else {
      setIsLoading(true);
      getAllBookings(user.token)
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
  
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageCompressor = new ImageCompressor();
      const compressedImage = await imageCompressor.compress(selectedFile, {
        quality: 0.6, // Adjust the quality as needed (0.6 is just an example)
        maxWidth: 800, // Set the maximum width of the compressed image
        maxHeight: 600, // Set the maximum height of the compressed image
      });
      setIsLoading(true);
      const form = new FormData();
      form.append("image", compressedImage);
      try {
        let res = await axios.post("https://amberstore.pk/upload.php", form);
        // let res = await axios.post("https://pizzafollia.com/upload.php", form);
        if (res.status == 200) {
          setIsLoading(false);
          console.log(res, "urlllllllllllllll");
          setInputValues({
            ...inputValues,
            image: res?.data?.url,
          });
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const handleRemove = (index) => {
    let mummy = [...options];
    mummy.splice(index, 1);
    setOptions(mummy);
  };
  const handleRemoveFlavour = (index, subIndex) => {
    let mummy = [...options];
    mummy[index].subOptions.splice(subIndex, 1);
    setOptions(mummy);
  };

  const handleOnAdd = () => {
    const dummy = [...options];
    let obj = {
      title: "",
      isOpened: false,
      subOptions: [
        {
          name: "",
          isSelected: false,
        },
      ],
    };
    dummy.push(obj);
    setOptions(dummy);
  };
  const handleOnAddFlavour = (optionIndex) => {
    const dummy = [...options];
    let obj = {
      name: "",
      isSelected: false,
    };
    dummy[optionIndex].subOptions.push(obj);
    setOptions(dummy);
  };

  const toggle = () => {
    setInputValues({
      name: "",
      email: "",
      description: "",
      contactNo: "",
      profession: "",
      image: "",
      category:"",
    })
    setModal(false);
    setUpdateModal(false)
  }

  const updateToggle = (item) => {
    if (item) {
      setUpdateModal(!updateModal);
      setInputValues({
        id:item?._id,
        name:item?.name,
        email:item?.email,
        description:item?.description,
        contactNo:item?.contactNo,
        profession:item?.profession,
        image:item?.image,
        category:item?.category,
  
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
        swal("Your Employee is safe!");
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
                  <div className=" d-flex align-items-center gap-1">
                    <HomeIcon />
                    <Link to="/dashboard" className="mt-1">
                      Dashboard /{" "}
                    </Link>
                    <span className="  fs-3">Bookings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="add-product-modal ">
            <Modal isOpen={modal} toggle={toggle} className="pt-5 w-100">
              <ModalHeader toggle={toggle}>ADD Employees</ModalHeader>
              <ModalBody
                className="p-4"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                {
               inputValues?.image ? 
               <div className=" d-flex align-items-center justify-content-center" onClick={handleImageUpload}>
                   <img
                            src={inputValues.image}
                            alt="product image"
                            className="img-fluid rounded-circle"
                            height={"100px"}
                            width={"120px"}
                          />
               </div>
                :
                <div className="image-section bg-secondary d-flex align-items-center justify-content-center">
                  <i onClick={handleImageUpload}>
                    <CameraAltIcon className="camera-icon" />
                  </i>
                </div>
                  
                }
                {/* Hidden input for file selection */}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  id="image"
                  error={!!imageError}
                  helperText={imageError}
                />

                <div className="text-fields mt-3">
                  <TextFeilds
                    label="Employee Name"
                    size="small"
                    value={inputValues.name}
                    onChange={(e) => handleOnChange(e)}
                    name="name"
                    id="name"
                    error={!!nameError}
                    helperText={nameError}
                  />

                  <TextFeilds
                    label="Email"
                    size="small"
                    id="price"
                    error={!!priceError}
                    helperText={priceError}
                    value={inputValues.email}
                    onChange={(e) => handleOnChange(e)}
                    name="email"
                  />
                  <TextFeilds
                    label="Contact No"
                    size="small"
                    id="discount"
                    error={!!discountError}
                    helperText={discountError}
                    value={inputValues.contactNo}
                    onChange={(e) => handleOnChange(e)}
                    name="contactNo"
                    type={"numeric"}
                  />
                  <TextFeilds
                    label="Profession"
                    size="small"
                    id="discount"
                    error={!!discountError}
                    helperText={discountError}
                    value={inputValues.profession}
                    onChange={(e) => handleOnChange(e)}
                    name="profession"
                  />
                   <select
                    class="form-select"
                    aria-label="Default select example"
                    value={inputValues.category}
                    name="category"
                    onChange={(e) => handleOnChange(e)}
                    id="category"
                    error={!!catError}
                    helperText={catError}
                  >
                    <option selected>Category</option>
                    <option value="Saloon">Saloon</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                  <div class="mb-3 mt-3">
                    <textarea
                      class="form-control"
                      id="description"
                      placeholder="Description"
                      rows="3"
                      value={inputValues.description}
                      onChange={(e) => handleOnChange(e)}
                      name="description"
                      error={!!descError}
                      helperText={descError}
                    ></textarea>
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
              <ModalHeader toggle={()=>updateToggle(null)}>Update Employees</ModalHeader>
              <ModalBody
                className="p-4"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                {
               inputValues?.image ? 
               <div className=" d-flex align-items-center justify-content-center" onClick={handleImageUpload}>
                   <img
                            src={inputValues.image}
                            alt="product image"
                            className="img-fluid rounded-circle"
                            height={"120px"}
                            width={"120px"}
                          />
               </div>
                :
                <div className="image-section bg-secondary d-flex align-items-center justify-content-center">
                  <i onClick={handleImageUpload}>
                    <CameraAltIcon className="camera-icon" />
                  </i>
                </div>
                  
                }
                {/* Hidden input for file selection */}
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  id="image"
                  error={!!imageError}
                  helperText={imageError}
                />

                <div className="text-fields mt-3">
                  <TextFeilds
                    label="Employee Name"
                    size="small"
                    value={inputValues.name}
                    onChange={(e) => handleOnChange(e)}
                    name="name"
                    id="name"
                    error={!!nameError}
                    helperText={nameError}
                  />

                  <TextFeilds
                    label="Email"
                    size="small"
                    id="price"
                    error={!!priceError}
                    helperText={priceError}
                    value={inputValues.email}
                    onChange={(e) => handleOnChange(e)}
                    name="email"
                  />
                  <TextFeilds
                    label="Contact No"
                    size="small"
                    id="discount"
                    error={!!discountError}
                    helperText={discountError}
                    value={inputValues.contactNo}
                    onChange={(e) => handleOnChange(e)}
                    name="contactNo"
                    type={"numeric"}
                  />
                  <TextFeilds
                    label="Profession"
                    size="small"
                    id="discount"
                    error={!!discountError}
                    helperText={discountError}
                    value={inputValues.profession}
                    onChange={(e) => handleOnChange(e)}
                    name="profession"
                  />
                   <select
                    class="form-select"
                    aria-label="Default select example"
                    value={inputValues.category}
                    name="category"
                    onChange={(e) => handleOnChange(e)}
                    id="category"
                    error={!!catError}
                    helperText={catError}
                  >
                    <option selected>Category</option>
                    <option value="Saloon1">Saloon</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                  <div class="mb-3 mt-3">
                    <textarea
                      class="form-control"
                      id="description"
                      placeholder="Description"
                      rows="3"
                      value={inputValues.description}
                      onChange={(e) => handleOnChange(e)}
                      name="description"
                      error={!!descError}
                      helperText={descError}
                    ></textarea>
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
                  <TableCell align="center">Booking Id</TableCell>
                  <TableCell align="center">Service Name</TableCell>
                  <TableCell align="center">Service Charges</TableCell>
                  <TableCell align="center">Assigned Employee</TableCell>
                  <TableCell align="center">User Emial</TableCell>
                  <TableCell align="center">User Contact No</TableCell>
                  <TableCell align="center">User Address</TableCell>
                  <TableCell align="center">Booking Date</TableCell>
                  <TableCell align="center">Booking Time</TableCell>
                  <TableCell align="center">Status</TableCell>
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
                      {item.bookingId}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {item.serviceId?.name}
                    </TableCell>
                    <TableCell align="center">{item.price}</TableCell>
                    <TableCell align="center">{item.employeeId?.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.phone}</TableCell>
                    <TableCell align="center">{item.address}</TableCell>
                    <TableCell align="center">{item.serviceDate}</TableCell>
                    <TableCell align="center">{item.serviceTime}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                   
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

          <Pagination
            className="pagination"
            total={totalPages}
            current={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </NavigationDrawer>
    </>
  );
};

export default Bookings;
