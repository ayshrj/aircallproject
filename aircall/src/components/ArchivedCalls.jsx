import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const ArchivedCalls = ({
  unarchiveAll,
  archivedActivities,
  unarchiveActivity,
  loadActivityDetails,
  switchView,
  setSelectedActivity,
}) => {
  // Filter archived activities with necessary conditions
  const nonArchivedActivities = archivedActivities.filter(
    (activity) => activity.is_archived && activity.to && activity.from
  );

  // Function to extract subtext based on call type, direction, and recipient
  const extractSubtext = (call_type, direction, to) => {
    if (direction === "inbound") {
      if (call_type === "missed") {
        return `missed a call from ${to}`;
      } else if (call_type === "answered") {
        return `answered a call from ${to}`;
      } else {
        return `has a voicemail from ${to}`;
      }
    } else {
      if (call_type === "missed") {
        return `missed a call to ${to}`;
      } else if (call_type === "answered") {
        return `answered a call to ${to}`;
      } else {
        return `gave a voicemail to ${to}`;
      }
    }
  };

  // Function to extract and format time from HH:mm to 12-hour format with AM/PM
  const extractTime = (time) => {
    const [hour, minutes] = time.split(":");
    const hourUnder12 = (hour > 12 ? hour - 12 : hour) + ":" + minutes;
    const meridiem = parseInt(hour) > 11 ? " PM" : " AM";

    return hourUnder12 + meridiem;
  };

  // Function to add suffix to day number (e.g., 1st, 2nd, 3rd)
  const addSuffix = (number) => {
    if (number % 100 >= 11 && number % 100 <= 13) {
      return number + "th";
    }

    switch (number % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
      default:
        return number + "th";
    }
  };

  // Function to extract and format date for a specific activity
  const extractedDate = (date) => {
    const month = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      addSuffix(parseInt(date.substr(3, 2))) +
      " " +
      month[parseInt(date.substr(0, 2))]
    );
  };

  // Rendering the main ArchivedCalls component
  return (
    <div className="layout">
      <h1>{"A I R C A L L"}</h1>
      <div className="activity-section">
        <div className="archived-calls">
          <h2>Archived Calls</h2>
          <div className="action-buttons">
            <button onClick={() => switchView("activityFeed")}>
              View Activity Feed
            </button>
            <button onClick={unarchiveAll}>Unarchive All</button>
          </div>
          <ul>
            {nonArchivedActivities.map((activity) => (
              <li
                className="li-boooo"
                key={activity.id}
                style={{ color: "black" }}
              >
                <div className="list-box">
                  <div>
                    <div className="list-box-content">
                      {activity.from}{" "}
                      {extractSubtext(
                        activity.call_type,
                        activity.direction,
                        activity.to
                      )}
                    </div>
                    <div className="archivedSubtext">
                      {"at "}
                      {extractTime(activity.created_at.substr(11, 5))}
                      {" on "}
                      {extractedDate(activity.created_at.substr(5, 5))}
                    </div>
                  </div>
                  <div className="list-box-icons">
                    <FontAwesomeIcon
                      icon={faBoxOpen}
                      className="fas fa-archive archive-button"
                      onClick={() => unarchiveActivity(activity.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArchivedCalls;
