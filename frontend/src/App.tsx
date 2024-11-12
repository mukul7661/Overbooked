import { Link, useLocation } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";

function App() {
  // Hook to get current route location
  const location = useLocation();

  return (
    // Navigation sidebar
    <nav
      className=""
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "250px",
        backgroundColor: "white",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div>
          <h3>OB Technical Test</h3>
          {/* Navigation buttons container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "30px",
            }}
          >
            {/* Create Interests navigation button */}
            <Link to="/create-interest">
              <Button
                style={{
                  backgroundColor:
                    location.pathname === "/create-interest"
                      ? "#007bff"
                      : "#e6dfdf",
                  width: "180px",
                  color:
                    location.pathname === "/create-interest"
                      ? "white"
                      : "black",
                }}
              >
                Create Interests
              </Button>
            </Link>
            {/* Recommendations navigation button */}
            <Link to="/recommendations">
              <Button
                style={{
                  backgroundColor:
                    location.pathname === "/recommendations"
                      ? "#007bff"
                      : "#e6dfdf",
                  width: "180px",
                  color:
                    location.pathname === "/recommendations"
                      ? "white"
                      : "black",
                  border: "none",
                }}
              >
                Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default App;
