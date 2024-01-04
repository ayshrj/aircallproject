import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faVoicemail } from "@fortawesome/free-solid-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

// Function to format date for subheading
const extractedDateForSubheading = (date) => {
  // Array to convert numeric month to abbreviated month names
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
    month[parseInt(date.substr(3, 2))] +
    ", " +
    date.substr(0, 2) +
    " " +
    date.substr(6, 4)
  );
};

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

// Function to extract human-readable duration from seconds
function extractDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let result = "";
  if (hours > 0) {
    result += `${hours} Hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    result += `${minutes} Minute${minutes > 1 ? "s" : ""} `;
  }
  if (remainingSeconds > 0) {
    result += `${remainingSeconds} Second${remainingSeconds > 1 ? "s" : ""}`;
  }

  return result.trim();
}

const ActivityFeed = ({
  archiveAll,
  groupedActivities,
  archiveActivity,
  loadActivityDetails,
  switchView,
  setSelectedActivity,
}) => {
  // State to manage the currently selected detail activity
  const [selectedDetailActivity, setSelectedDetailActivity] = useState(null);

  // Function to display activity details
  const showActivityDetails = (activity) => {
    loadActivityDetails(activity.id);
    setSelectedDetailActivity(activity);
  };

  // Function to extract and format time from HH:mm to 12-hour format with AM/PM
  const extractTime = (time) => {
    const [hour, minutes] = time.split(":");
    const hourUnder12 = (hour > 12 ? hour - 12 : hour) + ":" + minutes;
    const meridiem = parseInt(hour) > 11 ? " PM" : " AM";

    return hourUnder12 + meridiem;
  };

  // Component for rendering detailed information about a specific activity
  const ActivityDetail = ({ selectedDetailActivity, onClose }) => {
    return (
      <>
        <div className="activity-detail">
          <button className="activity-detail-close-button" onClick={onClose}>
            <FontAwesomeIcon
              icon={faX}
              onClick={() => showActivityDetails(activity)}
            />
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <div style={{ marginTop: 0, textAlign: "center", fontSize: 20 }}>
              {selectedDetailActivity.direction === "inbound"
                ? "Incoming"
                : "Outgoing"}
            </div>
            {selectedDetailActivity.call_type === "missed" ? (
              <div>{"Missed Call"}</div>
            ) : (
              <div>
                {extractDuration(parseInt(selectedDetailActivity.duration))}
              </div>
            )}
          </div>
          <div>{"------------------------------------------------------"}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 17,
            }}
          >
            <div>
              <strong>From:</strong> {selectedDetailActivity.from}
            </div>
            <div>
              <strong>To:</strong> {selectedDetailActivity.to}
            </div>
          </div>
          <div>{"------------------------------------------------------"}</div>
          <div>
            <strong>Via:</strong> {selectedDetailActivity.via}
          </div>
        </div>
      </>
    );
  };

  // Rendering the main ActivityFeed component
  return (
    <div className="layout">
      <h1>{"A I R C A L L"}</h1>
      <div className="activity-section">
        <div className="activity-feed">
          <h2>Activity Feed</h2>
          <div className="action-buttons">
            <button onClick={() => switchView("archived")}>
              View Archived Calls
            </button>
            <button onClick={archiveAll}>Archive All</button>
          </div>
          {Object.keys(groupedActivities).map((date) => (
            <div key={date}>
              <h3 className="activity-feed-date">
                {extractedDateForSubheading(date)}
                {"||||"}
                {date}
              </h3>
              <ul>
                {groupedActivities[date].map((activity) => (
                  <>
                    <li className="li-boooo" key={activity.id}>
                      <div>
                        <div className="list-box">
                          {activity.call_type === "voicemail" ? (
                            <FontAwesomeIcon
                              icon={faVoicemail}
                              className="call-type-icon"
                              onClick={() => showActivityDetails(activity)}
                            />
                          ) : activity.call_type === "missed" ? (
                            <FontAwesomeIcon
                              icon={faPhoneSlash}
                              className="call-type-icon"
                              onClick={() => showActivityDetails(activity)}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faPhoneVolume}
                              className="call-type-icon"
                              onClick={() => archiveActivity(activity.id)}
                            />
                          )}
                          <div className="list-box-content">
                            <div className="list-box-main-number">
                              {activity.from}
                              {"||||"}
                              {activity.created_at}
                              {/* <div>{activity.from}</div>
                              <div>{activity.created_at}</div> */}
                            </div>
                            <div className="list-box-information-about-caller">
                              {extractSubtext(
                                activity.call_type,
                                activity.direction,
                                activity.to
                              )}
                            </div>
                          </div>
                          <div className="list-box-time">
                            {extractTime(activity.created_at.substr(11, 5))}
                          </div>
                          <div className="list-box-icons">
                            <FontAwesomeIcon
                              icon={faArchive}
                              className="fas fa-archive archive-icon"
                              onClick={() => archiveActivity(activity.id)}
                            />
                            {"   "}
                            <FontAwesomeIcon
                              icon={faCircleInfo}
                              className="fas fa-circle-info info-icon"
                              onClick={() => showActivityDetails(activity)}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    <div>
                      {selectedDetailActivity &&
                        selectedDetailActivity.id === activity.id && (
                          <ActivityDetail
                            selectedDetailActivity={selectedDetailActivity}
                            onClose={() => setSelectedDetailActivity(null)}
                          />
                        )}
                    </div>
                  </>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
