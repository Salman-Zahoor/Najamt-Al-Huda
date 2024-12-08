import React, { useState } from "react";
import TextFeilds from "./TextFeilds";
import { TextField } from "@mui/material";
import Buttons from "./Buttons";
import { contactUsForm } from "../services/admin/Admin";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";

const ContactUsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleContactUsForm = () => {
    setIsLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation
    if (!inputValues?.firstName) {
      toast.error("First Name is required", { position: "top-right" });
      setIsLoading(false);
      return;
    }
    if (!inputValues?.lastName) {
      toast.error("Last Name is required", { position: "top-right" });
      setIsLoading(false);
      return;
    }
    if (!inputValues?.email) {
      toast.error("Email is required", { position: "top-right" });
      setIsLoading(false);
      return;
    }
    if (!emailRegex.test(inputValues?.email)) {
      toast.error("Invalid email format", { position: "top-right" });
      setIsLoading(false);
      return;
    }
    if (!inputValues?.phone) {
      toast.error("Phone is required", { position: "top-right" });
      setIsLoading(false);
      return;
    }

    const body = {
      firstName: inputValues?.firstName,
      lastName: inputValues?.lastName,
      email: inputValues?.email,
      phone: inputValues?.phone,
      message: inputValues?.message,
    };

    contactUsForm(body)
      .then((res) => {
        if (res?.status === 200) {
          toast.success("Form Submitted Successfully", { position: "top-right" });
          setInputValues({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          toast.error("Failed to submit the form", { position: "top-right" });
        }
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.message || error?.message || "An error occurred";
        toast.error(errorMessage, { position: "top-right" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && <Loader isLoading={isLoading} />}
      <div className="contact-form bg-white p-3">
        <div className="row">
          <div className="col-md-6">
            <TextFeilds
              id="first name"
              type="text"
              label="First Name"
              className="w-100 border-text"
              name="firstName"
              value={inputValues.firstName}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
          <div className="col-md-6">
            <TextFeilds
              id="l-name"
              type="text"
              label="Last Name"
              className="w-100"
              name="lastName"
              value={inputValues.lastName}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <TextFeilds
              id="email"
              type="email"
              label="Email"
              className="w-100"
              name="email"
              value={inputValues.email}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <TextFeilds
              id="phone"
              type="text"
              label="Phone"
              className="w-100"
              name="phone"
              value={inputValues.phone}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
            <TextField
              id="outlined-multiline-flexible"
              label="Message"
              multiline
              rows={8}
              name="message"
              type="text"
              className="w-100 mb-3"
              value={inputValues.message}
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <Buttons
          onClick={handleContactUsForm}
          name="Send"
          className="w-100 send"
        />
      </div>
    </>
  );
};

export default ContactUsForm;
