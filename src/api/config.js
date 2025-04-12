
export const BASE_URL = "http://localhost:8000/v1";


export const getImageUrl = (imagePath) => {
  
  return imagePath
    ? `${BASE_URL}/data/image?image_path=${encodeURIComponent(imagePath)}`
    : `${BASE_URL}/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg`; 
};
