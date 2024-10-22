import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';

const WeatherCard = ({ data }) => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });

  return (
    <animated.div style={props}>
      <Card
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          boxShadow: 3,
          borderRadius: 2,
          mt: 2,
          p: 2,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" component="h2">
                {data.location.name}, {data.location.region}
              </Typography>
              <Typography variant="h6">
                Temperature: {data.current.temp_c}°C
              </Typography>
              <Typography variant="body1">
                Weather: {data.current.condition.text}
              </Typography>
              <Typography variant="body1">Humidity: {data.current.humidity}%</Typography>
              <Typography variant="body1">Wind Speed: {data.current.wind_kph} kph</Typography>
            </Box>
            <Box>
              <img src={data.current.condition.icon} alt="weather-icon" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </animated.div>
  );
};

export default WeatherCard;
