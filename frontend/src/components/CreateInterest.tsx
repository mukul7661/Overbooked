import { useState, useEffect } from "react";
import { submitInterests } from "../services/api";
import "./CreateInterest.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// Helper function to generate random user IDs
const generateRandomUserId = () => {
  return "user_" + Math.random().toString(36).substring(2, 15);
};

export function CreateInterest() {
  const navigate = useNavigate();
  // State management for form data and UI
  const [userId, setUserId] = useState("");
  const [interests, setInterests] = useState<string[]>([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    userId?: string;
    interests?: string[];
  }>({});
  const [error, setError] = useState<string>("");

  // Initialize or retrieve user ID on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = generateRandomUserId();
      localStorage.setItem("userId", newUserId);
      setUserId(newUserId);
    }
  }, []);

  // Form field handlers
  const handleUserIdChange = (value: string) => {
    setUserId(value);
    localStorage.setItem("userId", value);
    setErrors({});
  };

  const addInterest = () => {
    setInterests([...interests, ""]);
    setErrors({});
  };

  const removeInterest = (index: number) => {
    const newInterests = interests.filter((_, i) => i !== index);
    setInterests(newInterests.length ? newInterests : [""]);
    setErrors({});
  };

  const updateInterest = (index: number, value: string) => {
    const newInterests = [...interests];
    newInterests[index] = value;
    setInterests(newInterests);
    setErrors({});
  };

  // Form validation
  const validateForm = () => {
    const newErrors: { userId?: string; interests?: string[] } = {};
    const interestErrors: string[] = [];

    if (!userId.trim()) {
      newErrors.userId = "User ID is required";
    }

    interests.forEach((interest, index) => {
      if (!interest.trim()) {
        interestErrors[index] = "Interest cannot be empty";
      }
    });

    if (interestErrors.length > 0) {
      newErrors.interests = interestErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitInterests({
        userId: userId.trim(),
        preferences: interests.map((i) => i.trim()),
      });

      console.log(response);
      // Reset form and navigate on success
      setUserId("");
      setInterests([""]);
      setErrors({});
      navigate(`/recommendations`);
    } catch (err) {
      setError("Failed to submit interests. Please try again.");
      setErrors({ userId: "Failed to submit interests. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ marginLeft: "250px" }}>
      <div>
        <h1>Create Interest</h1>
        {/* User ID input field */}
        <div className="input-group">
          <label>User ID:</label>
          <Input
            type="text"
            value={userId}
            onChange={(e) => handleUserIdChange(e.target.value)}
            placeholder="Enter User ID"
            disabled={true}
            style={{ width: "100%" }}
          />
        </div>

        {/* Dynamic interests input list */}
        <div className="interests-list">
          <label>Interests:</label>
          {interests.map((interest, index) => (
            <div key={index}>
              <div
                className="interest-item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="remove-btn"
                  onClick={() => removeInterest(index)}
                >
                  -
                </Button>
                <Input
                  type="text"
                  value={interest}
                  onChange={(e) => updateInterest(index, e.target.value)}
                  placeholder="Enter interest"
                  className={errors.interests?.[index] ? "border-red-500" : ""}
                />
              </div>
              {errors.interests?.[index] && (
                <div className="error-message">{errors.interests[index]}</div>
              )}
            </div>
          ))}
          <Button size="icon" className="add-btn" onClick={addInterest}>
            +
          </Button>
        </div>

        {/* Submit button */}
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: "100%",
            marginTop: "50px",
            backgroundColor: "#007bff",
            color: "white",
          }}
        >
          {isSubmitting ? "Submitting..." : "Submit Interests"}
        </Button>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
