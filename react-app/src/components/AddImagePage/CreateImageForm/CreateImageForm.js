import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Container,
    IconButton,
    Box,
    TextField,
    Typography,
} from '@mui/material';
import { AddBox, Delete } from '@mui/icons-material';

const CreateImageForm = () => {
    const { id } = useParams();
    const history = useHistory();

    const [imageFiles, setImageFiles] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);

    const handleAddImageField = () => {
        const newImageField = [...imageFiles, null];
        setImageFiles(newImageField);
    };

    const handleRemoveImageField = (index) => {
        const removeImageField = [...imageFiles];
        removeImageField.splice(index, 1);
        setImageFiles(removeImageField);
    };

    const handleImageInputChange = (index, event) => {
        const newFiles = [...imageFiles];
        newFiles[index] = event.target.files[0];
        setImageFiles(newFiles);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let i = 0; i < imageFiles.length; i++) {

            let file = imageFiles[i];

            const formData = new FormData();

            formData.append('image', file);
            // Your API endpoint for image upload
            const res = await fetch(`/api/images/businesses/${id}`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                await res.json();
                setImageLoading(false);
                history.push(`/businesses/${id}`);
            }
            else {
                setImageLoading(false);
                // a real app would probably use more advanced
                // error handling
                console.log("error");
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ background: 'white', borderRadius: '5px', display: 'flex', justifyContent: 'center', width: '100%', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Typography variant="h4" sx={{ display: 'flex', fontWeight: 'bold', mt: 3 }}> Add Images to Business </Typography>
                </Box>
                <Box>
                    <form onSubmit={handleSubmit}>
                        {imageFiles.map((file, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    type="file"
                                    variant="outlined"
                                    accept="image/*"
                                    onChange={(event) => handleImageInputChange(index, event)}
                                />
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => handleRemoveImageField(index)}
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        ))}
                        {(imageLoading) && <p>Loading...</p>}
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 1, mt: 2, mb: 2 }}>
                            <Button variant="contained" aria-label="add" onClick={handleAddImageField} sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}><AddBox /></Button>
                            <Button variant="contained" type="submit" sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Submit</Button>
                            <Button variant="contained" component={Link} to={`/businesses/${id}`} sx={{ background: '#f55d98', color: 'white', fontWeight: 'bold' }}>Cancel</Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateImageForm;





// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

// import { Container } from '@mui/system';
// import { Box, TextField, Button, Typography } from '@mui/material';

// const CreateImageForm = () => {
//     const { id } = useParams();
//     const history = useHistory(); // so that we can redirect after the image upload is successful
//     const [image, setImage] = useState(null);
//     const [imageLoading, setImageLoading] = useState(false);

//     console.log("\n\n", "HERE!", id)


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("image", image);

//         // aws uploads can be a bit slow—displaying
//         // some sort of loading message is a good idea
//         setImageLoading(true);

//         const res = await fetch(`/api/images/businesses/${id}`, {
//             method: "POST",
//             body: formData,
//         });

//         if (res.ok) {
//             await res.json();
//             setImageLoading(false);
//             history.push(`/businesses/${id}`);
//         }
//         else {
//             setImageLoading(false);
//             // a real app would probably use more advanced
//             // error handling
//             console.log("error");
//         }
//     }

//     const updateImage = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//     }

//     return (
//         <Container maxWidth='lg' sx={{ background: "white", borderRadius: '5px', display: 'flex', justifyContent: 'center', width: '100%', height: '100%' }}>
//             <Box>
//             <Typography variant='h4' sx={{ display: 'flex', fontWeight: 'bold' }}>Add Images to Business</Typography>
//                 <form onSubmit={handleSubmit}>
//                     {/* <input
//                         type="file"
//                         accept="image/*"
//                         onChange={updateImage}
//                     />
//                     <button type="submit">Submit</button> */}
//                     <TextField
//                         type='file'
//                         variant='outlined'
//                         accept='image/*'
//                         onChange={updateImage}
//                     />
//                     {(imageLoading) && <p>Loading...</p>}
//                 </form>
//             </Box>
//         </Container>
//     )
// }

// export default CreateImageForm;