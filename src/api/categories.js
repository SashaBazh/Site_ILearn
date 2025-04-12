import { BASE_URL } from "./config";
import { fetchWithAuth } from "./auth";

export const fetchCategories = async () => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/courses/categories`);

    if (!response.ok) {
      throw new Error("Ошибка при загрузке категорий");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при подключении к серверу:", error);
    return [];
  }
};