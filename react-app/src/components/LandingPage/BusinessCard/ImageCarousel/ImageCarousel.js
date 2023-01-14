import React, { useState } from "react";
import { Box, MobileStepper, Button } from "@mui/material";
import { makeStyles } from '@mui/styles'

// import './ImageCarousel.css'


import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const useStyles = makeStyles({
    imageSwipper: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 220,
        objectFit: 'contain'
    },

    imageContainer: {
        display: 'flex',
        maxWidth: "100%",
        maxHeight: "100%"
    },

    rightArrow: {
        position: 'absolute',
        top: '50%',
        right: '-18px',
        color: "#d9d9d9",
    },

    leftArrow: {
        position: 'absolute',
        top: '50%',
        left: '-18px',
        color: "#d9d9d9",
    },

    businessMedia: {
        borderRadius: "8%",
        width: "220px",
        height: "220px",
        objectFit: 'cover'
    }
})

function ImageCarousel({ images }) {
    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length ? images.length : null;

    const handleNext = () => {
        setActiveStep(activeStep === maxSteps - 1 ? 0 : activeStep + 1)
        // setActiveStep((prevActiveStep) => prevActiveStep + 1)
    };
    const handlePrevious = () => {
        setActiveStep(activeStep === 0 ? maxSteps - 1 : activeStep - 1)
        // setActiveStep((prevActiveStep) => prevActiveStep - 1)
    };

    if (!Array.isArray(images) || images.length <= 0) return null

    return (

        <Box className={classes.imageSwipper}>
            {maxSteps > 1 && <Button className={classes.leftArrow} onClick={handlePrevious} ><ArrowCircleLeftIcon /></Button>}
            {maxSteps > 1 && <Button className={classes.rightArrow} onClick={handleNext} ><ArrowCircleRightIcon /></Button>}
            {images.map((image, index) => {
                return (
                    // { index === activeStep && <Box className={classes.businessMedia} component="img" src={image.image_url} key={image.id} />}
                    <Box className={classes.imageContainer} key={index}>
                        {index === activeStep && <Box className={classes.businessMedia} component="img" src={image.image_url} key={image.id} />}
                    </Box>
                )
            })}
        </Box>

        // <div className="image-swiper">
        //     {maxSteps > 1 && <div className='right-arrow' onClick={handleNext}><ArrowCircleRightIcon /></div>}
        //     {maxSteps > 1 && <div className='left-arrow' onClick={handlePrevious}><ArrowCircleLeftIcon /></div>}
        //     {images.map((image, index) => {
        //         return (
        //             <div className='image-container' key={index}>
        //                 {index === activeStep &&
        //                     <img
        //                         className="business-media"
        //                         src={image.image_url}
        //                         key={image.id}
        //                         alt='aPicture'
        //                     />
        //                 }
        //             </div>
        //         )
        //     })}
        // </div>
    )
}

export default ImageCarousel;