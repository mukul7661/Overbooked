const API_BASE_URL = "http://localhost:8000";

export interface InterestPayload {
  userId: string;
  preferences: string[];
}

export const submitInterests = async (payload: InterestPayload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export interface Recommendation {
  userId: string;
  recommendations: string[];
}

export const fetchRecommendationsApi = async (
  userId: string
): Promise<Recommendation> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/recommendations`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};
