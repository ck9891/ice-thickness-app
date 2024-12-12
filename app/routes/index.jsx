import { useState } from 'react';
import { useLoaderData } from 'remix';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const loader = async () => {
  const response = await fetch('/ice-thickness');
  const data = await response.json();
  return data;
};

export default function Index() {
  const data = useLoaderData();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [thickness, setThickness] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setToken(data.token);
      alert('Login successful');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();

    try {
      const response = await fetch('/ice-thickness', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ latitude, longitude, thickness, timestamp }),
      });

      const data = await response.json();
      alert('Ice thickness data submitted successfully');
    } catch (error) {
      alert('Failed to submit ice thickness data');
    }
  };

  return (
    <div>
      <header>
        <h1>Ice Fishing Safety App</h1>
      </header>
      <main>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.iceThicknessData.map((point) => (
            <Marker key={point.id} position={[point.latitude, point.longitude]}>
              <Popup>
                Ice Thickness: {point.thickness} cm
                <br />
                Timestamp: {new Date(point.timestamp).toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <div id="controls">
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button>
          </form>
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <label htmlFor="new-username">Username:</label>
            <input type="text" id="new-username" name="username" required />
            <label htmlFor="new-password">Password:</label>
            <input type="password" id="new-password" name="password" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <button type="submit">Register</button>
          </form>
          <form onSubmit={handleSubmit}>
            <h2>Input Ice Thickness</h2>
            <label htmlFor="latitude">Latitude:</label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
            <label htmlFor="longitude">Longitude:</label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
            <label htmlFor="thickness">Thickness (cm):</label>
            <input
              type="number"
              id="thickness"
              name="thickness"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
}
