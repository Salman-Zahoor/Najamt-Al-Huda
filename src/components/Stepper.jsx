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
import { message } from "antd";
import { toast } from "react-toastify";

const steps = ["Service Info", "Appointment Schedule", "Payment Gateway"];

export default function HorizontalLinearStepper({ singlePageData }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [teamId, setTeamId] = React.useState(null);
  const [selectedDateTime, setSelectedDateTime] = React.useState(null);
  const [isAutoAssign, setIsAutoAssign] = React.useState(true);
  const [message,setMessage]=React.useState("")
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentType:""
  });
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep=== 2) {
      alert("called")
      const {name,email,phone,address,paymentType}=userDetails
      if (name ==="") {
        alert("Name is required")
        return
      } if (email ==="") {
        alert("Email is required")
        return
      } if (phone ==="") {
        alert("Phone is required")
        return
      } if (address ==="") {
        alert("address is required")
        return
      } if (paymentType ==="") {
        alert("address is required")
        return
      }
      let body={
        employeeId:teamId,
        serviceDate:new Date(selectedDateTime),
        serviceTime:new Date(selectedDateTime),
        serviceId:singlePageData?._id,
        date:new Date(),
        bookingId:Math.floor(100000 + Math.random() * 900000),
        price:singlePageData?.price,
        name,
        email,
        phone,
        address,
        paymentType,
      }
      addBooking(body).then((response)=> {
        if (response?.status==200) {
          alert("Appointment booked successfully")
          setMessage("To confirm your appointment, please pay the amount shared in the QR code or sent to your email address.")
        }
      }).catch((error)=>{

      })
    }
    if (activeStep === 1 && !selectedDateTime) {
      message.error('Please select a time and date')
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
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // handle check booking
  const handleCheckBooking = () => {
    let payload = {
      selectedTime: selectedDateTime,
      employeeId: isAutoAssign ? null  : teamId,
      autoAssign: isAutoAssign,
    };
    checkBooking(payload)
      .then((res) => {
        console.log(res,"check bookingres");
        
        if (res?.status==200) {
         if (res?.data?.employeeId) {
          setTeamId(res?.data?.employeeId)
         } 
        }       
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            {message}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Go to home</Button>
          </Box>
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
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )} */}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
