import React, { useEffect, useState } from "react";
import { getActivities, getActivityDetails, updateActivity } from "../api";
import "../styles/App.css";
import ActivityFeed from "./ActivityFeed";
import ArchivedCalls from "./ArchivedCalls";

const Layout = () => {
  const [activities, setActivities] = useState([]);
  const [archivedActivities, setArchivedActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    const data = await getActivities();
    const sortedActivities = data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setActivities(sortedActivities);
    setArchivedActivities(
      sortedActivities.filter((activity) => activity.is_archived)
    );
  };

  const loadActivityDetails = async (id) => {
    const data = await getActivityDetails(id);
    setSelectedActivity(data);
  };

  const archiveActivity = (id) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, is_archived: true } : activity
    );
    setActivities(updatedActivities);
    setArchivedActivities(
      updatedActivities.filter((activity) => activity.is_archived)
    );
    updateActivity(id, { is_archived: true });
  };

  const unarchiveActivity = (id) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, is_archived: false } : activity
    );
    setActivities(updatedActivities);
    setArchivedActivities(
      updatedActivities.filter((activity) => activity.is_archived)
    );
    updateActivity(id, { is_archived: false });
  };

  const archiveAll = async () => {
    const updatedActivities = activities.map((activity) => ({
      ...activity,
      is_archived: true,
    }));
    setActivities(updatedActivities);
    setArchivedActivities(updatedActivities);

    await Promise.all(
      activities.map((activity) =>
        updateActivity(activity.id, { is_archived: true })
      )
    );
  };

  const unarchiveAll = async () => {
    const updatedActivities = activities.map((activity) => ({
      ...activity,
      is_archived: false,
    }));
    setActivities(updatedActivities);
    setArchivedActivities([]);

    await Promise.all(
      activities.map((activity) =>
        updateActivity(activity.id, { is_archived: false })
      )
    );
  };

  const closeActivityDetails = () => {
    setSelectedActivity(null);
  };

  const filteredActivities = activities.filter(
    (activity) => !activity.is_archived && activity.to && activity.from
  );

  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    const createdAtDate = new Date(activity.created_at).toLocaleDateString();
    if (!acc[createdAtDate]) {
      acc[createdAtDate] = [];
    }
    acc[createdAtDate].push(activity);
    return acc;
  }, {});

  const [currentView, setCurrentView] = useState("activityFeed");

  const switchView = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      {currentView === "activityFeed" ? (
        <ActivityFeed
          archiveAll={archiveAll}
          groupedActivities={groupedActivities}
          archiveActivity={archiveActivity}
          loadActivityDetails={loadActivityDetails}
          switchView={() => switchView("archived")}
          setSelectedActivity={setSelectedActivity}
        />
      ) : (
        <ArchivedCalls
          unarchiveAll={unarchiveAll}
          archivedActivities={archivedActivities}
          unarchiveActivity={unarchiveActivity}
          loadActivityDetails={loadActivityDetails}
          switchView={() => switchView("activityFeed")}
          setSelectedActivity={setSelectedActivity}
        />
      )}
    </>
  );
};

export default Layout;
