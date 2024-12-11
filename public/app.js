document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const iceThicknessForm = document.getElementById('ice-thickness-form');

  let token = null;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      token = data.token;
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const email = document.getElementById('email').value;

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email })
      });

      const data = await response.json();
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  });

  iceThicknessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;
    const thickness = document.getElementById('thickness').value;
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
  });

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

  // Example usage of fetchAggregatedData function
  fetchAggregatedData('monthly');
});
