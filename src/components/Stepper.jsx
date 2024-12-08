import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Faqs from "./Faqs";
import ProfessionalsSlider from "./ProfessionalsSlider";
import PaymentMethod from "./PaymentMethod";
import { addBooking, checkBooking } from "../services/products/Products";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const steps = ["Service Info", "Appointment Schedule", "Payment Gateway"];

export default function HorizontalLinearStepper({ singlePageData }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [teamId, setTeamId] = React.useState(null);
  const [selectedDateTime, setSelectedDateTime] = React.useState(null);
  const [isAutoAssign, setIsAutoAssign] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentType: "",
  });

  const navigate = useNavigate();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    setIsLoading(true);
    if (activeStep === 2) {
      const { name, email, phone, address, paymentType } = userDetails;
    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!name) {
        toast.error("Name is required");
        setIsLoading(false);
        return;
      }
      if (!email) {
        toast.error("Email is required");
        setIsLoading(false);
        return;
      }
      if (!emailRegex.test(email)) {
        toast.error("Invalid email format");
        setIsLoading(false);
        return;
      }
      if (!phone) {
        toast.error("Phone is required");
        setIsLoading(false);
        return;
      }
      if (!address) {
        toast.error("Address is required");
        setIsLoading(false);
        return;
      }
      if (!paymentType) {
        toast.error("Payment type is required");
        setIsLoading(false);
        return;
      }
    
      const body = {
        employeeId: teamId,
        serviceDate: new Date(selectedDateTime),
        serviceTime: new Date(selectedDateTime),
        serviceId: singlePageData?._id,
        date: new Date(),
        bookingId: Math.floor(100000 + Math.random() * 900000),
        price: singlePageData?.price,
        name,
        email,
        phone,
        address,
        paymentType,
      };
    
      try {
        const response = await addBooking(body);
        if (response?.status === 200) {
          toast.success("Appointment booked successfully");
          setMessage(
            "To confirm your appointment, please pay the amount shared in the QR code or sent to your email address."
          );
          setTimeout(() => navigate("/"), 3000);
        }
      } catch (error) {
        toast.error("Failed to book appointment");
      } finally {
        setIsLoading(false);
      }
      return;
    }
    

    if (activeStep === 1 && !selectedDateTime) {
      toast.error("Please select a time and date");
      setIsLoading(false);
      return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    handleCheckBooking();
    setIsLoading(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCheckBooking = async () => {
    const payload = {
      selectedTime: selectedDateTime,
      employeeId: isAutoAssign ? null : teamId,
      autoAssign: isAutoAssign,
    };
    try {
      const res = await checkBooking(payload);
      if (res?.status === 200 && res?.data?.employeeId) {
        setTeamId(res?.data?.employeeId);
      }
    } catch (error) {
      console.error("Error checking booking:", error);
    }
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>{message}</Typography> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && <Faqs singlePageData={singlePageData} />}
            {activeStep === 1 && (
              <ProfessionalsSlider
                setTeamId={setTeamId}
                teamId={teamId}
                selectedDateTime={selectedDateTime}
                setSelectedDateTime={setSelectedDateTime}
                isAutoAssign={isAutoAssign}
                setIsAutoAssign={setIsAutoAssign}
              />
            )}
            {activeStep === 2 && (
              <PaymentMethod
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            )}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0 || isLoading}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                onClick={handleNext}
                disabled={isLoading}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </>
  );
}