'use client';

import { CldImage, CldUploadWidget } from 'next-cloudinary';

import React from 'react';

/****
 * the upload widget is fully customizable
 * we can allow uploads from only certain source types
 * we can also limit uploads to just one image
 * The widget has an upload event that get triggered everytime a file is uploaded
 *
 */

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = React.useState('');
  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          alt='A random image uploaded'
          width={400}
          height={400}
        />
      )}
      <CldUploadWidget
        // Go to settings and go to uploads and set upload to unsigned and copy the id and paste it into the upload preset
        uploadPreset='ijz1vlmp'
        options={{
          multiple: false,
          sources: ['local', 'camera', 'url', 'google_drive'],
        }}
        onUpload={(result, widget) => {
          if (result.event !== 'success') return;
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => open()}
          >
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
