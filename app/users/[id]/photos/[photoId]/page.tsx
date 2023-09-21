import React from 'react';

interface Props {
  params: { photoId: number };
}

const PhotoDetail = ({ params: { photoId } }: Props) => {
  return <div>PhotoDetail {photoId}</div>;
};

export default PhotoDetail;
