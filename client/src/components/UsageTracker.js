import { useEffect, useState } from "react";
import axios from "axios";

const UsageTracker = () => {
  const [usageData, setUsageData] = useState([]);
  const [activeTime, setActiveTime] = useState(0);

  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        const res = await axios.get("/api/usage");
        setUsageData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsageData();
  }, []);

  useEffect(() => {
    const startTime = new Date().getTime();
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      setActiveTime((prevTime) => prevTime + (currentTime - startTime));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const saveUsageData = async () => {
      try {
        await axios.post("/api/usage", { duration: activeTime });
      } catch (err) {
        console.error(err);
      }
    };

    window.addEventListener("beforeunload", saveUsageData);

    return () => window.removeEventListener("beforeunload", saveUsageData);
  }, [activeTime]);

  return (
    <div>
      <h1>Usage Tracker</h1>
      <p>
        Today&apos;s Active Time: {Math.floor(activeTime / 1000 / 60)} minutes
      </p>
      <ul>
        {usageData.map((entry, index) => (
          <li key={index}>
            {new Date(entry.date).toLocaleDateString()}:{" "}
            {Math.floor(entry.duration / 1000 / 60)} minutes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsageTracker;
