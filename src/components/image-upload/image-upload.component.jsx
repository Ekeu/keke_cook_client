import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';

import ProductImage from '../product-image/product-image.component';
import Loader from '../loader/loader.component';

const ImageUpload = ({ images, setImages }) => {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allImages = images;

  const handleImageUploadAndResize = (e) => {
    const files = e.target.files;
    if (files) {
      setUploading(true);
      for (let index = 0; index < files.length; index++) {
        Resizer.imageFileResizer(
          files[index],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                '/api/v1/images/',
                { image: uri },
                {
                  headers: {
                    Authorization: userInfo?.token,
                  },
                }
              )
              .then(({ data }) => {
                console.log('API Response ==> ', data);
                setUploading(false);
                allImages.push(data);
                setImages([...allImages]);
              })
              .catch((error) => {
                setUploading(false);
                console.log('Upload Error ==> ', error);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleImageRemove = (public_id, index) => {
    setDeleting(true);
    axios
      .post(
        '/api/v1/images/delete',
        { public_id },
        {
          headers: {
            Authorization: userInfo?.token,
          },
        }
      )
      .then((result) => {
        setDeleting(false);
        console.log(result);
        const allImages = [...images];
        allImages.splice(index, 1);
        setImages([...allImages]);
      })
      .catch((error) => {
        setDeleting(false);
        console.error(error);
      });
  };

  return (
    <div>
      <label className='block text-sm font-medium text-blue-gray-700'>
        Images du produit
      </label>
      <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-blue-gray-300 border-dashed rounded-md'>
        <div className='space-y-1 text-center'>
          <div className='space-x-4 space-y-2'>
            {uploading ? (
              <Loader height='h-6' width='h-6' />
            ) : (
              images.map((image, index) => (
                <ProductImage
                  key={image.public_id}
                  loading={deleting}
                  removeImage={() => handleImageRemove(image.public_id, index)}
                  public_id={image.public_id}
                  imageURL={image.imageURL}
                />
              ))
            )}
          </div>
          <>
            <svg
              className='mx-auto h-12 w-12 text-blue-gray-400'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'
            >
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className='flex text-sm justify-center text-blue-gray-600'>
              <label
                htmlFor='file-upload'
                className='relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none'
              >
                <span>Charger une image</span>
                <input
                  id='file-upload'
                  name='file-upload'
                  accept='images/*'
                  multiple
                  type='file'
                  className='sr-only'
                  onChange={handleImageUploadAndResize}
                />
              </label>
              {/* <p className='pl-1'>or drag and drop</p> */}{' '}
              {/* TODO: Implement drag & drop */}
            </div>
            <p className='text-xs text-blue-gray-500'>PNG, JPG</p>
          </>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
