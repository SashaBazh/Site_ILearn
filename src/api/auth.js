import { BASE_URL } from "./config";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Неверные учетные данные или ошибка сервера");
    }

    const data = await response.json();

    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);

    return data;
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({name, email, password }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Ошибка регистрации");
    }
    
    return response.json();
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Токен доступа отсутствует");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    console.warn("Токен истек, требуется обновление.");
  }

  return response;
};