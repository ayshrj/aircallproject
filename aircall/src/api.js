// api.js
const BASE_URL = "https://cerulean-marlin-wig.cyclic.app/";

export const getActivities = async () => {
  const response = await fetch(`${BASE_URL}/activities`);
  const data = await response.json();
  return data;
};

export const getActivityDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/activities/${id}`);
  const data = await response.json();
  return data;
};

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

export const resetActivities = async () => {
  const response = await fetch(`${BASE_URL}/reset`, {
    method: "PATCH",
  });
  const data = await response.json();
  return data;
};
