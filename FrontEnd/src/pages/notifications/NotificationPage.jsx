// /pages/notifications/NotificationPage.jsx
import React, { useEffect, useState } from 'react';
import './notificationPage.scss'; // Add styles for notifications
import axios from 'axios'; // Make sure to install axios with npm if you haven't
import Navbar from '../../components/Navbar/Navbar'; // Adjust the import path based on your project structure
import { Link } from 'react-router-dom'; // Import Link for navigation

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    // Fetch notifications from local API
    const fetchNotifications = async () => {
      try {
        console.log('Fetching notifications...');
        const response = await axios.get('http://localhost:8000/api/notifications/'); // Update with your actual API endpoint
        console.log('Response:', response.data);
        setNotifications(response.data); // Assuming your API returns an array of notifications
      } catch (err) {
        console.error('Error fetching notifications:', err); // Log the error for debugging
        setError('Failed to fetch notifications');
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    // Uncomment the following line to use mock data
    // fetchNotifications();
    // Use mock data for testing
    const mockData = [
      { id: 1, message: "New comment on your task", link: "/tasks/1" }, // Add a link for demonstration
      { id: 2, message: "Task completed!", link: "/tasks/2" },
      { id: 3, message: "New task assigned to you", link: "/tasks/3" },
    ];
    setNotifications(mockData);
    setLoading(false);

    // Uncomment the below line to use real API after testing
    //Once your API is ready, you can uncomment the fetchNotifications function and remove the mock data.
    // fetchNotifications();
  }, []);

  // Function to handle notification click
  const handleNotificationClick = (id) => {
    // Remove the clicked notification from the list
    setNotifications((prevNotifications) =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  if (loading) return <p>Loading notifications...</p>; // Show loading message
  if (error) return <p>{error}</p>; // Show error message

  return (
    <div className="notification-page">
      <Navbar />
      <div className="notification-content">
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          <ul className="notification-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                <Link 
                  to={notification.link} 
                  onClick={() => handleNotificationClick(notification.id)} // Call function on click
                >
                  {notification.message}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
