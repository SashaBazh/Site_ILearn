    // Базовый URL для API
export const BASE_URL = "http://localhost:8000/v1";
// Для локальной разработки можно раскомментировать следующую строку:
// export const BASE_URL = "http://localhost:8000/api";

// Функция для получения URL изображения
export const getImageUrl = (imagePath) => {
  // Если передан путь к изображению, то формируем полный URL
  return imagePath
    ? `${BASE_URL}/data/image?image_path=${encodeURIComponent(imagePath)}`
    : `${BASE_URL}/data/image?image_path=%2Fassets%2Fimages%2Fdefault.jpg`; // Если пути нет, возвращаем путь к дефолтному изображению
};
