import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import hair from "../assets/hair-service.jpg";
import SinglePageFaq from './SinglePageFaq';

export default function Faqs({singlePageData}) {
  return (
    <>
   

     <div className=" mt-5 text-center" style={{objectFit:"cover"}}>
      <img src={singlePageData?.image} alt={singlePageData?.name} className='single-image mb-5' />
     </div> 

       <div className="service-name">
        <div className="service-detail d-flex align-items-center justify-content-between">
        <h3 className='fw-bold'>{singlePageData.name}</h3>
        <span className='location fw-bold text-dark'>AED {singlePageData.price}</span>
        </div>
        <div className="service-detail">
          <p className='mt-2'>{singlePageData.description}</p>
        </div>
        
        <SinglePageFaq singlePageData={singlePageData}/>
       </div>
      
    </>
  );
}
