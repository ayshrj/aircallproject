// Base URL for the activities API. This could have been done in dotenv but since it's an open assement I put it here
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";

// Function to fetch all activities
export const getActivities = async () => {
  const response = await fetch(`${BASE_URL}/activities`);
  const data = await response.json();
  return data;
};

// Function to fetch details for a specific activity by ID
export const getActivityDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/activities/${id}`);
  const data = await response.json();
  return data;
};

// Function to update an activity by ID with a given payload
export const updateActivity = async (id, payload) => {
  const response = await fetch(`${BASE_URL}/activities/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
};

// Function to reset all activities (potentially for testing purposes)
export const resetActivities = async () => {
  const response = await fetch(`${BASE_URL}/reset`, {
    method: "PATCH",
  });
  const data = await response.json();
  return data;
};
