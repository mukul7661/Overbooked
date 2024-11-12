import { useState, useEffect } from "react";
import { fetchRecommendationsApi } from "../services/api";
import { Input } from "./ui/input";

export function Recommendations() {
  // State management for recommendations data and UI
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Load user ID from local storage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch recommendations whenever userId changes
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!userId) return;

      try {
        const data = await fetchRecommendationsApi(userId);
        setRecommendations(data?.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("No recommendations found");
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div
      style={{
        marginLeft: "250px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Recommendations</h1>
      {/* User ID display field */}
      <div className="input-group">
        <label>User ID:</label>
        <Input
          type="text"
          value={userId}
          placeholder="Enter User ID"
          disabled={true}
        />
      </div>

      {/* Recommendations display section */}
      <div className="interests-list">
        <label>Recommendations:</label>
        {recommendations && recommendations.length > 0 ? (
          // Display list of recommendations if available
          recommendations.map((interest, index) => (
            <div
              key={index}
              className="interest-item"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                type="text"
                value={interest}
                placeholder="Enter interest"
                disabled={true}
              />
            </div>
          ))
        ) : (
          // Display error or no recommendations message
          <p>{error || "No recommendations found"}</p>
        )}
      </div>
    </div>
  );
}
