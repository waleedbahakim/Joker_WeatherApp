import React, { useState } from 'react';
import {
  Container, Button, TextField, Typography, Divider, Box, Card, CardContent, Grid
} from '@mui/material';
import JokeCard from './component/JokeCard';
import WeatherCard from './component/WeatherApp';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import './App.css';

const App = () => {
  const [joke, setJoke] = useState('Click the button to get a joke!');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fade = useSpring({ opacity: loading ? 0 : 1, from: { opacity: 0 } });

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
      const data = response.data;
      const newJoke = data.type === 'twopart'
        ? `${data.setup} - ${data.delivery}`
        : data.joke;
      setJoke(newJoke);
    } catch (error) {
      setJoke('Oops! Something went wrong, try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const apiKey = '5a21fe51f26e40c3b2085009241510';
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: 'center',
        mt: 4,
        bgcolor: 'white',
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          color: 'primary.main',
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        Joke & Weather App ☀️🤣
      </Typography>

      {/* Clouds Background */}
      <Box className="clouds-container">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </Box>

      <Grid 
        container 
        spacing={4} 
        justifyContent="center" 
        alignItems="flex-start"
        sx={{ mt: 4 }}
      >
        {/* Joke Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
            }}
          >
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={fetchJoke}
                sx={{ mb: 2, width: '100%' }}
              >
                Get New Joke
              </Button>
              <animated.div style={fade}>
                <JokeCard joke={joke} />
              </animated.div>
            </CardContent>
          </Card>
        </Grid>

        {/* Weather Section */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
            }}
          >
            <CardContent>
              <TextField
                label="Enter City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={fetchWeather}
                sx={{ width: '100%' }}
              >
                Get Weather
              </Button>

              <animated.div style={fade}>
                {loading && <Typography variant="h6">Loading...</Typography>}
                {error && <Typography variant="h6" color="error">{error}</Typography>}
                {weatherData && <WeatherCard data={weatherData} />}
              </animated.div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
