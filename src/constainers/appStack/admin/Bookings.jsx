import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Backdrop from '@mui/material/Backdrop';
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
import { getAllBookings, updateStatus } from "../../../services/admin/Admin";

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
  const [formattedData, setFormattedData] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [status, setStatus] = useState("");

  // console.log(inputValues?.id, "id");
  
   const handleUpdateStatus = () => {
     const body= {
      status:status,
     }
    updateStatus(inputValues.id,body,user.token).then((res)=>{
        if(res.status === 200){
          setUpdateModal(false)
          toast.success("Booking Update Successfully")
          getEmployeesData()
        }
    }).catch((error)=>{
      console.log(error)
      toast.success("Booking Update Successfully")
      
    })
   }


  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }
  useEffect(() => {
  
    const formatted = employeeData.map((item) => {
      const formattedDate = new Date(item?.serviceDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const formattedTime = new Date(item?.serviceDate).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      return {
        ...item,
        formattedDate,
        formattedTime,
      };
    });

    setFormattedData(formatted);
  }, [employeeData]);

  

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

  // const handleFileSelect = async (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     const imageCompressor = new ImageCompressor();
  //     const compressedImage = await imageCompressor.compress(selectedFile, {
  //       quality: 0.6, // Adjust the quality as needed (0.6 is just an example)
  //       maxWidth: 800, // Set the maximum width of the compressed image
  //       maxHeight: 600, // Set the maximum height of the compressed image
  //     });
  //     setIsLoading(true);
  //     const form = new FormData();
  //     form.append("image", compressedImage);
  //     try {
  //       let res = await axios.post("https://amberstore.pk/upload.php", form);
  //       // let res = await axios.post("https://pizzafollia.com/upload.php", form);
  //       if (res.status == 200) {
  //         setIsLoading(false);
  //         setInputValues({
  //           ...inputValues,
  //           image: res?.data?.url,
  //         });
  //       } else {
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //     }
  //   }
  // };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageCompressor = new ImageCompressor();
  
      // Compress the image
      const compressedImage = await imageCompressor.compress(selectedFile, {
        quality: 0.6, // Adjust the quality as needed
        maxWidth: 800, // Set the maximum width of the compressed image
        maxHeight: 600, // Set the maximum height of the compressed image
      });
  
      setIsLoading(true);
  
      // Prepare the form data for Cloudinary
      const formData = new FormData();
      formData.append("file", compressedImage); // Cloudinary expects the file under 'file'
      formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name
  
      try {
        // Post the file to Cloudinary
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Cloudinary endpoint
          formData
        );
  
        if (res.status === 200) {
          setIsLoading(false);
          setInputValues({
            ...inputValues,
            image: res.data.secure_url, // Use Cloudinary's secure URL
          });
        } else {
          setIsLoading(false);
          console.error("Cloudinary upload failed");
        }
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
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
        bookingId:item?.bookingId,
        price:item?.price,
        serviceName:item?.serviceId?.name,
        email:item?.email,
        phone:item?.phone,
        address:item?.address,
        serviceDate:item?.formattedDate,
        serviceTime:item?.formattedTime,
        status:item?.status,
        paymentType:item?.paymentType,
        employeeName:item?.employeeId?.name,
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
                  <div className=" d-flex align-items-center gap-1 justify-content-start">
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
           
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="fw-bold text-muted" style={{width:"100px"}}>ID</TableCell>
                  <TableCell align="center" className="fw-bold text-muted">Service </TableCell>
                  <TableCell align="center" className="fw-bold text-muted">Charges</TableCell>
                  <TableCell align="center" className="fw-bold text-muted">Employee</TableCell>
                  <TableCell align="center" className="fw-bold text-muted">User Emial</TableCell>
                  <TableCell align="center" className="fw-bold text-muted">Contact</TableCell>
                  <TableCell align="center" className="fw-bold text-muted">Address</TableCell>
                  <TableCell align="center" className="fw-bold text-muted"> Date</TableCell>
                  <TableCell align="center" className="fw-bold text-muted"> Time</TableCell>
                  <TableCell align="center" className="fw-bold text-muted">Status</TableCell>
                  <TableCell align="center" className="fw-bold text-muted">Edit</TableCell>
                  {/* <TableCell align="center" className="fw-bold text-muted">Delete</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {formattedData.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {item?.bookingId}
                    </TableCell>
                    <TableCell scope="row" sx={{ width: '650px' }} align="center">
                      {item?.serviceId?.name}
                    </TableCell>
                    <TableCell align="center">{item?.price}</TableCell>
                    <TableCell align="center" >{item?.employeeId?.name}</TableCell>
                    <TableCell align="center">{item?.email}</TableCell>
                    <TableCell align="center">{item?.phone}</TableCell>
                    <TableCell align="center">{item?.address}</TableCell>
                    <TableCell align="center">{item.formattedDate}</TableCell>
                    <TableCell align="center">{item.formattedTime}</TableCell>
                    <TableCell align="center">{item?.status}</TableCell>
                   
                    <TableCell align="center">
                      <div 
                        className="text-success edit-product "
                        onClick={()=>updateToggle(item)}
                      >
                        <BorderColorIcon />
                      </div>
                    </TableCell>
                    {/* <TableCell align="center">
                      <div
                        className="text-danger edit-product"
                        onClick={() => deleteToggle(item._id)}
                      >
                        <DeleteIcon />
                      </div>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            className="pagination mt-3  d-flex align-items-center justify-content-center"
            total={totalPages}
            current={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
        <Modal isOpen={updateModal} toggle={()=>updateToggle()} className="" style={{maxWidth:"800px"}}>
              <ModalHeader toggle={()=>updateToggle()}>Update Booking</ModalHeader>
              <ModalBody
                className=""
                style={{ maxHeight: "60vh", overflowY: "auto", paddingLeft:"25px" }}
              >
                <div className="row">
                  <div className="col-md-4">
                   <span className="fw-bold">ID:</span>
                   <p>{inputValues?.bookingId}</p>
                  </div>
                  <div className="col-md-6">
                   <span className="fw-bold">Service:</span>
                   <p>{inputValues?.serviceName}</p>
                  </div>
                  <div className="col-md-2">
                   <span className="fw-bold">Charges:</span>
                   <p>{inputValues?.price}</p>
                  </div>
                  <div className="col-md-4 mt-3">
                   <span className="fw-bold">Employee:</span>
                   <p>{inputValues?.employeeName}</p>
                  </div>
                  <div className="col-md-6 mt-3">
                   <span className="fw-bold">User Email:</span>
                   <p>{inputValues?.email}</p>
                  </div>
                  <div className="col-md-2 mt-3">
                   <span className="fw-bold">Contact:</span>
                   <p>{inputValues?.phone}</p>
                  </div>
                  <div className="col-md-4 mt-3">
                   <span className="fw-bold">Date:</span>
                   <p>{inputValues?.serviceDate}</p>
                  </div>
                  <div className="col-md-6 mt-3">
                   <span className="fw-bold">Address:</span>
                   <p>{inputValues?.address}</p>
                  </div>
                  <div className="col-md-2 mt-3">
                   <span className="fw-bold">Time:</span>
                   <p>{inputValues?.serviceTime}</p>
                  </div>
                  <div className="col-md-4 mt-3">
                   <span className="fw-bold">Payment Type:</span>
                   <p>{inputValues?.paymentType}</p>
                  </div>
                  <div className="col-md-6 mt-3">
                   <span className="fw-bold">Status:</span>
                   <select className="form-select" value={status} onChange={handleStatusChange}>
                  <option value="confirm">Confirm</option>
                  <option value="cancel">Cancel</option>
                </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div onClick={handleUpdateStatus}>
                  <Buttons name="Update" />
                </div>
              </ModalFooter>
            </Modal>  
      </NavigationDrawer>
    </>
  );
};

export default Bookings;
