import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function ImageBackgroundList({ id }) {

    const images = useSelector((state) => state?.singleBusiness[id]?.Images)

    return (
        // <>Test</>
        <ImageList sx={{ width: '100%', height: 300, overflow:'hidden'}} cols={3} rowHeight={164}>
          {images?.map((item) => (
            <ImageListItem key={item?.image_url}>
              <img
                src={`${item?.image_url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item?.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item?.tag}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
    );
}


export default ImageBackgroundList;