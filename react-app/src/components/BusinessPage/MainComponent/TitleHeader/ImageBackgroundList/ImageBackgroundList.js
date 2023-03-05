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

import { Modal } from '../../../../../context/Modal';

import ImageCarouselModal from './ImageCarouselModal/ImageCarouselModal';

function ImageBackgroundList({ id }) {

  const images = useSelector((state) => state?.singleBusiness[id]?.Images)
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {(Array.isArray(images) && images.length > 0) && <ImageList onClick={() => setShowModal(true)} sx={{ width: '100%', height: 300, overflow: 'hidden', cursor: 'pointer' }} cols={3} rowHeight={164}>
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
      </ImageList>}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImageCarouselModal images={images} />
        </Modal>
      )}
    </>
  );
}


export default ImageBackgroundList;