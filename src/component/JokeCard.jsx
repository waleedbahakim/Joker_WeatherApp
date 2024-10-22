import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { FaLaughSquint } from 'react-icons/fa'; // Using react-icons

const JokeCard = ({ joke }) => {
  const props = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
    config: { duration: 400 },
  });

  // Function to generate a random pastel background
  const getRandomBackground = () => {
    const colors = ['#FFEBEE', '#FFF3E0', '#E3F2FD', '#E8F5E9', '#F3E5F5'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <animated.div style={props}>
      <Card
        sx={{
          background: getRandomBackground(),
          boxShadow: 3,
          borderRadius: 2,
          p: 2,
          mt: 2,
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <FaLaughSquint size={24} color="#FF6F00" />
            <Typography variant="body1">{joke}</Typography>
          </Box>
        </CardContent>
      </Card>
    </animated.div>
  );
};

export default JokeCard;
