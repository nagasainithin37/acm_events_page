// export default App;
import "./App.css";
import { ReactComponent as WorkIcon } from "./work.svg";
import { BsFillCalendarEventFill } from "react-icons/bs";
import timelineContent from "./timelineContent";
import { GrLocation } from "react-icons/gr";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import  { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width:700,
  transform: 'translate(-50%, -50%)',
  // bgcolor: 'background.paper',
  boxShadow: 24,
  bgcolor:'#60A0C4',
  p: 4,
  maxHeight:'80vh',
  overflowY:'scroll'
};

function App() {
  const [currEle,setCurrEle]=useState({})
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // let workIconStyles = { background: "#06D6A0" };
  let workIconStyles = { background: "#a9ee89" };

  return (
    <div>
      <h1 className="title">Timeline of ACM VNRVJIET Events</h1>
      <VerticalTimeline>
        {timelineContent.map((element) => {
          let isWorkIcon = element.icon === "work";
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== "";

          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
              iconStyle={workIconStyles}
              icon={<WorkIcon />}
            >
              <div style={{display:'flex',justifyContent:'space-around'}} className="card-body">
              <div>
            
              <h3 className="vertical-timeline-element-title">
                {element.title}
              </h3> 
              
             <h5 className="date-smallscreen"><BsFillCalendarEventFill/>   {element.date} </h5>
              <h5 className="vertical-timeline-element-subtitle location">
               <GrLocation/> {element.location}
              </h5>
              <p id="description">{element.description.slice(0,50)}{element.description.length>50 && <span >.....</span>}</p>
              {showButton && !element.isUpcoming && (
                <a
                  className={`button ${
                    isWorkIcon ? "workButton" : "schoolButton"
                  }`}
                
                  onClick={()=>{
                    setCurrEle(element)
                    handleOpen()}}
                >
                  {element.buttonText}
                </a>
              )}
              </div>
              {/* for upcoming events only */}
              <div>
                 {element.isUpcoming && 
                 <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                   <div>
                   <img src={element.qrCode}alt="" width="150px" height='150px' />
                    </div>
                   <div >Scan To Register</div>
                   </div>
                }

                </div>
               </div>   
                
            </VerticalTimelineElement>
          );
        })}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='box' sx={style}>
         {/* <h6 className="text-primary">{currEle.name}</h6> */}
         <Carousel  autoPlay={true} infiniteLoop={true} showThumbs={false}>
                {/* <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div> */}
                {currEle && currEle.photos&& currEle.photos.length>0 &&
                   currEle.photos.map((image,imgIdx)=>{
                    return <div>
                    <img src={image} style={{height:'50vh',width:'auto'}}/>
                   
                </div>
                   })

                }
            </Carousel>
            <h6 className="title-modal">{currEle.title}</h6>
            <p className="lead">{currEle.description}</p>
        </Box>
      </Modal>
      </VerticalTimeline>
    </div>
  );
}

export default App;