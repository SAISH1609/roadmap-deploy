import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const InvitePage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleInvitation = async () => {
      if (!token) {
        setError("Invalid invitation link");
        setLoading(false);
        return;
      }

      try {
        // Make the request without authentication - the backend should handle this with just the token
        console.log("Making request to join team with token:", token);
        const response = await fetch(
          `http://localhost:8000/api/teams/join/${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        if (response.ok) {
          const data = await response.json();
          console.log("Success response data:", data);
          setSuccess(`Successfully joined team: ${data.team_name}!`);
          // Give user time to read the success message before redirecting
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          const errorData = await response.json();
          console.log("Error response data:", errorData);

          // Handle specific error cases
          if (response.status === 404) {
            setError("This invitation link is invalid or has expired.");
          } else if (response.status === 400) {
            if (errorData.detail?.includes("already accepted")) {
              setError("This invitation has already been accepted.");
            } else if (errorData.detail?.includes("already a member")) {
              setError("You are already a member of this team.");
            } else if (errorData.detail?.includes("expired")) {
              setError("This invitation has expired.");
            } else {
              setError(errorData.detail || "Failed to join team.");
            }
          } else {
            setError(
              errorData.detail ||
                "Failed to join team. Please try again or contact support."
            );
          }
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    handleInvitation();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">
            Processing invitation...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    const isAlreadyAccepted =
      error.includes("already accepted") || error.includes("already a member");

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <div
              className={`text-6xl mb-4 ${
                isAlreadyAccepted ? "text-blue-500" : "text-red-500"
              }`}
            >
              {isAlreadyAccepted ? "✅" : "⚠️"}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {isAlreadyAccepted ? "Already Joined" : "Invitation Error"}
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            {isAlreadyAccepted && (
              <p className="text-sm text-blue-600 mb-4">
                You can log in to access your team dashboard.
              </p>
            )}
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to the Team!
            </h1>
            <p className="text-gray-600 mb-6">{success}</p>
            <p className="text-sm text-gray-500">
              You can now log in to access your team dashboard.
            </p>
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default InvitePage;
