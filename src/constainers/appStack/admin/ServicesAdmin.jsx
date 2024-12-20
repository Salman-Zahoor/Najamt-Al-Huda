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
import {
  addEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../../../services/employee/Employee";

import { addServices, deleteService, getAllServices, updateService,getAllCategories, } from "../../../services/admin/Admin";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import remove from "../../../assets/remove.png"
import add from "../../../assets/add.png"

// import { addServices, deleteService,  getAllServices, updateService } from "../../../services/admin/Admin";


const ServicesAdmin = () => {
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
  const [categories,setCategoires]=useState([])
  const [inputValues, setInputValues] = useState({
    id: "",
    name: "",
    description: "",
    price:"",
    discount: "",
    priceOptions: [{
      price:"",
      option:""
    }],
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
    category: "",
    features: [{
      feature:""
    }],
    image: "",
  });


  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
 
  const handleOnChangeUpdate = (e, mainIndex, stateName) => {
    const { name, value } = e.target;
  
    // Access the dynamic state property using bracket notation
    const updatedState = [...inputValues[stateName]];
  
    // Update the specific object at the given index (mainIndex)
    updatedState[mainIndex] = {
      ...updatedState[mainIndex],
      [name]: value,
    };
  
    // Update the state with the modified dynamic property
    setInputValues({
      ...inputValues,
      [stateName]: updatedState,  // Use bracket notation to dynamically update the state
    });
  };
  const fileInputRef = useRef(null);

  useEffect(() => {
    getEmployeesData();
  }, [currentPage]);

  const productDelete = (deleteId) => {
    deleteService(user.token, deleteId)
      .then((res) => {
        if (res.status === 200) {
          swal("Poof! Your service has been deleted!", {
            icon: "success",
          });
          getEmployeesData();
        }
      })
      .catch((error) => {
        toast.error("Somwthing went wrong");
      });
  };

  
  const getEmployeesData = () => {
    setIsLoading(true);
    getAllServices(user.token, currentPage)
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
          console.log( res?.data?.data,"salman adatatjhcjhdjh");
          
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
    const { name, category, priceOptions, description, price, faqs, features, image, discount } = inputValues;
  
    let body = { name, category, priceOptions, description, price, faqs, features, image, discount };
  
    let hasError = false;
  
    // Validate required fields
    if (name === "") {
      toast.error("Name is required");
      hasError = true;
    } else if (category === "") {
      toast.error("Category is required");
      hasError = true;
    } else if (image === "") {
      toast.error("Image is required");
      hasError = true;
    } else if (description === "") {
      toast.error("Description is required");
      hasError = true;
    } else if (price === "") {
      toast.error("Price is required");
      hasError = true;  
    }
    // Validate FAQs
    for (let i = 0; i < faqs.length; i++) {
      if (!faqs[i].question) {
        toast.error(`Question is required for FAQ #${i + 1}`);
        hasError = true;
        return
      }
      if (!faqs[i].answer) {
        toast.error(`Answer is required for FAQ #${i + 1}`);
        hasError = true;
        return
      }
    }
    // If there is an error, stop the function here
    if (hasError) {
      return;
    }
  
    // No validation errors, proceed with submission
    setIsLoading(true);
    updateService(user.token,inputValues?.id,body)
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          getEmployeesData();
          setUpdateModal(false)
          toast.success(res?.data?.message);
        } else {
        
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error,"errrrooooooooooooooo");
        
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  };

  const handleAddProductss = () => {
    const { name, category, priceOptions, description, price, faqs, features, image, discount } = inputValues;
  
    let body = { name, category, priceOptions, description, price, faqs, features, image, discount,date: new Date() };
  
    let hasError = false;
  
    // Validate required fields
    if (name === "") {
      toast.error("Name is required");
      hasError = true;
      return
    } else if (category === "") {
      toast.error("Category is required");
      hasError = true;
      return
    } else if (image === "") {
      toast.error("Image is required");
      hasError = true;
      return
    } else if (description === "") {
      toast.error("Description is required");
      hasError = true;
      return
    } else if (price === "") {
      toast.error("Price is required");
      hasError = true;  
      return
    }
    // Validate FAQs
    for (let i = 0; i < faqs.length; i++) {
      if (!faqs[i].question) {
        toast.error(`Question is required for FAQ #${i + 1}`);
        hasError = true;
        return
      }
      if (!faqs[i].answer) {
        toast.error(`Answer is required for FAQ #${i + 1}`);
        hasError = true;
        return
      }
    }
    // If there is an error, stop the function here
    if (hasError) {
      return;
    }
  
    // No validation errors, proceed with submission
    setIsLoading(true);
    addServices(user.token, body)
      .then((res) => {
        console.log(res, "response");
        setIsLoading(false);
        if (res.status === 200) {
          getEmployeesData();
          toggle();
          toast.success(res?.data?.message);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error,"errrrooooooooooooooo");
        
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  };
  

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIsLoading(true);
  
      // Prepare the form data for Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile); // Attach the file directly
      formData.append("upload_preset", "salman"); // Replace with your Cloudinary upload preset
      formData.append("cloud_name", "ddg5474bs"); // Replace with your Cloudinary cloud name
  
      try {
        // Upload the file to Cloudinary
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/ddg5474bs/image/upload", // Cloudinary endpoint
          formData
        );
  
        if (res.status === 200) {
          setIsLoading(false);
          setInputValues({
            ...inputValues,
            image: res.data.secure_url, // Cloudinary's uploaded image URL
          });
        } else {
          setIsLoading(false);
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        setIsLoading(false);
      }
    }
  };  

  const handleOnAdd = async () => {
    const dummy = inputValues?.faqs;
    const obj = {
      question: "",
      answer: "",
    };
    dummy?.push(obj);
    setInputValues({
      ...inputValues,
      faqs: dummy,
    });
  };


  

  const handleRemove = (index,name) => {
    const dummy = inputValues[name];
    if (dummy.length <= 1) {
      toast.error(`${name} can't be less then 1`);
      return
    }
    dummy?.splice(index,1);
    setInputValues({
      ...inputValues,
      [name]: dummy,
    });
  };
 

  const handleOnAddFeature = async () => {
    const dummy = inputValues?.features;
    const obj = {
      question: "",
      answer: "",
    };
    dummy?.push(obj);
    setInputValues({
      ...inputValues,
      features: dummy,
    });
  };

  const handleOnAddPriceOpt = async () => {
    const dummy = inputValues?.priceOptions;
    const obj = {
      price:"",
      option:""
    };
    dummy?.push(obj);
    setInputValues({
      ...inputValues,
      priceOptions: dummy,
    });
  };

  const toggle = () => {
    handleGetAllCategories();
    setInputValues({
      id: "",
      name: "",
      description: "",
      date: "",
      discount: "",
      priceOptions: [
        {
        price:"",
        option:""
      }
    ],
      faqs: [
        {
          question: "",
          answer: "",
        },
      ],
      category: "",
      features: [
        {
        feature:""
        }
    ],
      image: "",
    });
    setModal(!modal);
    setUpdateModal(false);
  };

  const updateToggle = (item) => {
    handleGetAllCategories();
    if (item) {
      setUpdateModal(!updateModal);
      setInputValues({
        id: item?._id,
        name: item?.name,
        description: item?.description,
        image: item?.image,
        category: item?.category,
        price:item?.price,
        priceOptions:item?.priceOptions,
        faqs:item?.faqs,
        features:item?.features,
      });
    } else {
      setUpdateModal(!updateModal);
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
        swal("Your Service is safe!");
      }
    });
  };

  const handleGetAllCategories=()=>{
    getAllCategories(user.token)
      .then((res) => {
        // console.log(res?.data?.data, "productssssss")
        setIsLoading(false);
        if (res.status === 200) {
          let data = res?.data?.data;
          setCategoires(data);
        }
      })
      .catch((error) => {
        // toast.error(error);
        setIsLoading(false)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
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
              <div className="row d-flex align-items-center justify-content-space-between">
                <div className="col-md-6">
                  <div className=" d-flex align-items-center justify-content-start gap-1">
                    <HomeIcon />
                    <Link to="/dashboard" className="mt-1">
                      Dashboard /
                    </Link>
                    <span className="  fs-3">Servies</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-end">
                    <Buttons name="Add Services" onClick={toggle} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="add-product-modal ">
            <Modal isOpen={modal} toggle={toggle} className=" w-100">
              <ModalHeader toggle={toggle}>ADD Services</ModalHeader>
              <ModalBody
                className="p-4"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
                {inputValues?.image ? (
                  <div
                    className=" d-flex align-items-center justify-content-center"
                    onClick={handleImageUpload}
                  >
                    <img
                      src={inputValues.image}
                      alt="product image"
                      className="img-fluid rounded-circle"
                      height={"200px"}
                      width={"120px"}
                    />
                  </div>
                ) : (
                  <div className="image-section bg-secondary d-flex align-items-center justify-content-center">
                    <i onClick={handleImageUpload}>
                      <CameraAltIcon className="camera-icon" style={{width:'100px', height:'150px'}} />
                    </i>
                  </div>
                )}
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
                  <div className="row">
                    <div className="col-md-6">
                    <TextFeilds
                    label="Service Title"
                    size="small"
                    value={inputValues.name}
                    onChange={(e) => handleOnChange(e)}
                    name="name"
                    id="name"
                    error={!!nameError}
                    helperText={nameError}
                  />
                    </div>
                    <div className="col-md-6">
                    <TextFeilds
                    label="Price"
                    size="small"
                    id="price"
                    error={!!priceError}
                    helperText={priceError}
                    value={inputValues.price}
                    onChange={(e) => handleOnChange(e)}
                    name="price"
                    type={"numeric"}
                  />
                    </div>
                  </div>
                  
                 <div className="row">
                  <div className="col-md-6">
                  <TextFeilds
                    label="discount"
                    size="small"
                    id="discount"
                    error={!!discountError}
                    helperText={discountError}
                    value={inputValues.discount}
                    onChange={(e) => handleOnChange(e)}
                    name="discount"
                    type={"numeric"}
                  />
                  </div>
                  <div className="col-md-6">
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
                    {categories?.map((value,ind)=>{
                      return <option key={ind} value={value?._id}>{value?.name}</option>
                    })}
                  </select>
                  </div>
                 </div>
                  
                   <div className="row">
                    <div className="col-md-12">
                    <div class="mb-3">
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
                   </div>
                  {inputValues?.faqs?.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <div className="row">
                          <div className="col-md-6">
                          <TextFeilds
                          label="Question"
                          size="small"
                          id={`question-${ind}`}
                          value={item?.question}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"faqs")}
                          name="question"
                        />
                          </div>
                          <div className="col-md-6">
                          <TextFeilds
                          label="Answer"
                          size="small"
                          id={`answer-${ind}`}
                          value={item?.answer}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"faqs")}
                          name="answer"
                        />
                          </div>
                        </div>
                        
                        

                  <div className="d-flex align-items-center justify-content-end gap-3">
                  <div onClick={()=>handleRemove(ind,"faqs")}>
                    {/* <Buttons name="Remove Faqs" /> */}
                    <img src={remove} alt="remove-icon" width={20} style={{cursor:"pointer"}} />
                  </div>
                  <div onClick={handleOnAdd}>
                    {/* <Buttons name="Add More Faqs" /> */}
                    {/* <AddIcon/> */}
                    <img src={add} alt="remove-icon" width={20} style={{cursor:"pointer"}} />
                  </div>
                  </div>
                      </React.Fragment>
                    );
                  })}

                

                  {inputValues?.features?.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <div className="row">
                          <div className="col-md-12">
                          <TextFeilds
                          label="feature"
                          className="w-100 mt-4"
                          size="small"
                          id={`feature-${ind}`}
                          value={item?.feature}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"features")}
                          name="feature"
                        />
                          </div>
                          
                        </div>
                        
                  <div className="d-flex align-items-center justify-content-end gap-3">
                  <div onClick={()=>handleRemove(ind,"features")}>
                    {/* <Buttons name="Remove Feature" /> */}
                    <img src={remove} alt="remove-icon" width={20} style={{cursor:"pointer"}} />
                  </div>
                  <div onClick={handleOnAddFeature}>
                    {/* <Buttons name="Add More Features" /> */}
                    <img src={add} alt="remove-icon" width={20} style={{cursor:"pointer"}} />
                  </div>
                  </div>
                      </React.Fragment>
                    );
                  })}
                  {/* {inputValues?.priceOptions?.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <div className="row mt-3">
                          <div className="col-md-6">
                          <TextFeilds
                          label="Option"
                          size="small"
                          id={`option-${ind}`}
                          value={item?.option}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"priceOptions")}
                          name="option"
                        />
                          </div>
                          <div className="col-md-6">
                          <TextFeilds
                          label="Price"
                          size="small"
                          id={`price-${ind}`}
                          value={item?.price}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"priceOptions")}
                          name="price"
                        />
                          </div>
                        </div>
                        
                        
                  <div className="d-flex align-items-center justify-content-end gap-3">
                  <div onClick={()=>handleRemove(ind,"priceOptions")}>
                    <Buttons name="Remove Price Options" />
                    <img src={remove} alt="remove-icon" width={20} style={{cursor:"pointer"}} />
                  </div>
                  <div onClick={handleOnAddPriceOpt}>
                    <Buttons name="Add More Options" />
                    <img src={add} alt="remove-icon" width={20} style={{cursor:"pointer"}} />
                  </div>
                  </div>
                      </React.Fragment>
                    );
                  })} */}
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
            <Modal
              isOpen={updateModal}
              toggle={() => updateToggle()}
              className=" w-100"
            >
              <ModalHeader toggle={() => updateToggle()}>
                Update Service
              </ModalHeader>
              <ModalBody
                className="p-4"
                style={{ maxHeight: "60vh", overflowY: "auto" }}
              >
              {inputValues?.image ? (
                  <div
                    className=" d-flex align-items-center justify-content-center"
                    onClick={handleImageUpload}
                  >
                    <img
                      src={inputValues.image}
                      alt="product image rounded"
                      className="w-100"
                      height={"200px"}
                      width={"200px"}
                    />
                  </div>
                ) : (
                  <div className="image-section bg-secondary d-flex align-items-center justify-content-center">
                    <i onClick={handleImageUpload}>
                      <CameraAltIcon className="camera-icon bg-dark" />
                    </i>
                  </div>
                )}
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
                  <div className="row">
                    <div className="col-md-6">
                    <TextFeilds
                    label="Service Title"
                    size="small"
                    value={inputValues.name}
                    onChange={(e) => handleOnChange(e)}
                    name="name"
                    id="name"
                    error={!!nameError}
                    helperText={nameError}
                  />
                    </div>
                    <div className="col-md-6">
                    <TextFeilds
                    label="Price"
                    size="small"
                    id="price"
                    error={!!priceError}
                    helperText={priceError}
                    value={inputValues.price}
                    onChange={(e) => handleOnChange(e)}
                    name="price"
                    type={"numeric"}
                  />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                    <TextFeilds
                    label="discount"
                    size="small"
                    id="discount"
                    error={!!discountError}
                    helperText={discountError}
                    value={inputValues.discount}
                    onChange={(e) => handleOnChange(e)}
                    name="discount"
                    type={"numeric"}
                  />
                    </div>
                    <div className="col-md-6">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={inputValues.category._id}
                    name="category"
                    onChange={(e) => handleOnChange(e)}
                    id="category"
                    error={!!catError}
                    helperText={catError}
                  >
                    <option selected>Category</option>
                    {categories?.map((value,ind)=>{
                      return <option key={ind} value={value?._id}>{value?.name}</option>
                    })}
                  </select>
                  </div>
                 </div>
                  <div class="mb-3">
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
                  {inputValues?.faqs?.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <div className="row mt-4">
                          <div className="col-md-6">
                          <TextFeilds
                          label="Question"
                          size="small"
                          id={`question-${ind}`}
                          value={item?.question}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"faqs")}
                          name="question"
                        />
                          </div>
                          <div className="col-md-6">
                          <TextFeilds
                          label="Answer"
                          size="small"
                          id={`answer-${ind}`}
                          value={item?.answer}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"faqs")}
                          name="answer"
                        />
                          </div>
                        </div>
                        
                       

                 <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                 <div className="text-end" onClick={()=>handleRemove(ind,"faqs")}>
                    <Buttons name="Remove Faqs" />
                    {/* <img src={remove} alt="remove-icon" width={20} style={{cursor:"pointer"}} /> */}
                  </div>
                  <div onClick={handleOnAdd}>
                    <Buttons name="Add More Faqs" />
                  </div>
                 </div>
                      </React.Fragment>
                    );
                  })}

                  

                  {inputValues?.features?.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <TextFeilds
                          label="feature"
                          size="small"
                          id={`feature-${ind}`}
                          value={item?.feature}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"features")}
                          name="feature"
                          className='w-100'
                        />
                  <div className="d-flex align-items-center justify-content-center gap-3">
                  <div onClick={()=>handleRemove(ind,"features")}>
                    <Buttons name="Remove Feature" />
                  </div>
                  <div onClick={handleOnAddFeature}>
                    <Buttons name="Add More Features" />
                  </div>
                  </div>
                      </React.Fragment>
                    );
                  })}

                 

                  {inputValues?.priceOptions?.map((item, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <div className="row mt-4">
                          <div className="col-md-6">
                          <TextFeilds
                          label="Option"
                          size="small"
                          id={`option-${ind}`}
                          value={item?.option}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"priceOptions")}
                          name="option"
                        />
                          </div>
                          <div className="col-md-6">
                          <TextFeilds
                          label="Price"
                          size="small"
                          id={`price-${ind}`}
                          value={item?.price}
                          onChange={(e) => handleOnChangeUpdate(e, ind,"priceOptions")}
                          name="price"
                        />
                          </div>
                        </div>
                       
                       <div className="d-flex align-items-center justify-content-center gap-3">
                       <div onClick={()=>handleRemove(ind,"priceOptions")}>
                    <Buttons name="Remove Price Options" />
                  </div>
                  <div onClick={handleOnAddPriceOpt}>
                    <Buttons name="Add More Options" />
                  </div>
                       </div>
                  
                      </React.Fragment>
                    );
                  })}

                  
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
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">descroption</TableCell>
                  <TableCell align="center">Image</TableCell>
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
                    <TableCell align="center">{item?.price} AED</TableCell>
                    <TableCell align="center">{item?.category?.name}</TableCell>
                    <TableCell align="center">
                      {item?.description?.slice(0, 20)}
                    </TableCell>
                    <TableCell align="center">
                      <div className="products_images ">
                        <Link to={item.image} target="_blank">
                          <img
                            src={item.image}
                            alt="product image"
                            className="  rounded-circle"
                            height={"40px"}
                            width={"40px"}
                          />
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className="text-success edit-product "
                        onClick={() => updateToggle(item)}
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
            className="pagination text-center"
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

export default ServicesAdmin;
