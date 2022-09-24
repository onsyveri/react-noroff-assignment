//import { resolvePath } from "react-router-dom";
import { createHeaders } from ".";

const apiUrl = process.env.REACT_APP_API_URL;

export const addTranslation = async (user, translation) => {
  try {
    const response = await fetch(`${apiUrl}/${user.id}`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({
        translations: [...user.translations, translation],
      }),
    });
    if (!response.ok) {
      throw new Error("Could not translate");
    }
    const result = await response.json();
    return [null, result];
  } catch (error) {
    return [error.message, null];
  }
};

export const clearTranslation = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "PATCH",
      headers: createHeaders(),
      body: JSON.stringify({
        translations: [],
      }),
    });
    if (!response.ok) {
      throw new Error("Could not clear translations");
    }
    const result = await response.json();
    return [null, result];
  } catch (error) {
    return [error.message, null];
  }
};
