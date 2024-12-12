import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const mapRef = useRef(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      const thickness = prompt('Enter ice thickness (cm):');
      if (thickness) {
        addIceThicknessData(lat, lng, thickness);
      }
    });

    fetchAggregatedData('monthly');
  }, []);

  const addIceThicknessData = async (latitude, longitude, thickness) => {
    const timestamp = new Date().toISOString();

    try {
      const response = await fetch('/ice-thickness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ latitude, longitude, thickness, timestamp })
      });

      const data = await response.json();
      alert('Ice thickness data submitted successfully');
    } catch (error) {
      alert('Failed to submit ice thickness data');
    }
  };

  const fetchAggregatedData = async (timePeriod) => {
    try {
      const response = await fetch(`/aggregated-ice-thickness?timePeriod=${timePeriod}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      // Process and display aggregated data on the map
    } catch (error) {
      alert('Failed to fetch aggregated ice thickness data');
    }
  };

  return (
    <div>
      <div id="map" ref={mapRef} style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default Map;
