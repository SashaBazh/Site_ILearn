import { BASE_URL } from "./config";
import { fetchWithAuth } from "./auth";

export const fetchCourses = async (
  categoryId = null,
  searchQuery = null,
  limit = 20,
  offset = 0
) => {
  try {
    const params = new URLSearchParams();
    if (categoryId) params.append("category_id", categoryId);
    if (searchQuery) params.append("search_query", searchQuery);
    params.append("limit", limit);
    params.append("offset", offset);


    const response = await fetchWithAuth(
      `${BASE_URL}/courses?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error; 
  }
};
