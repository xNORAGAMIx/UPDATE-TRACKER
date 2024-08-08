import { useEffect } from "react";
import axios from "axios";

const Background = () => {
  const updateBackground = async () => {
    try {
      const response = await axios.get("/api/usage");
      const usageData = response.data;

      const today = usageData.find((entry) => {
        const entryDate = new Date(entry.date);
        const todayDate = new Date().setHours(0, 0, 0, 0);
        return entryDate.getTime() === todayDate;
      });

      const totalDurationToday = today ? today.duration : 0;
      const percentageOfDay =
        (totalDurationToday / (24 * 60 * 60 * 1000)) * 100;

      const backgroundContainer = document.getElementById("background");
      backgroundContainer.style.backgroundSize = `${percentageOfDay}% 100%`;

      const numberOfImages = Math.floor((percentageOfDay / 100) * 24); // For example, 24 images
      backgroundContainer.innerHTML = ""; // Clear previous images
      for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement("img");
        img.src = `path/to/image${i}.jpg`;
        img.style.position = "absolute";
        img.style.top = `${Math.random() * 100}%`;
        img.style.left = `${Math.random() * 100}%`;
        img.style.width = "100px"; // Adjust size as needed
        backgroundContainer.appendChild(img);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    updateBackground();
    const interval = setInterval(updateBackground, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return <div id="background"></div>;
};

export default Background;
