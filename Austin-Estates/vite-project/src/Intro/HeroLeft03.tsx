import * as React from 'react';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './TwoSidedLayout';

import { NavLink } from 'react-router-dom';

export default function HeroLeft03() {
  return (
    <TwoSidedLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        The power to do more
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Revolutionizing Real Estate: Our AI Powered Website
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
       Our platform specializes in intelligent property listings and streamlined home selling. Discover homes tailored to your preferences through our smart listings, and experience a hassle-free selling process.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          my: 2,
          '& > *': { flex: 'auto' },
        }}
      >
        <Button size="lg" variant="outlined" color="neutral" component="a" href="https://github.com/int-sys-team/int-sys-project">
          Learn More
        </Button>
        <Button size="lg" endDecorator={<ArrowForward fontSize="large" />} component={NavLink} to="/overview/">
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          textAlign: 'left',
          '& > *': {
            flexShrink: 0,
          },
        }}
      >
        <AvatarGroup size="lg">
          <a href="https://github.com/AsinaMilic" target="_blank" rel="noopener noreferrer">
            <Avatar src="https://github.com/AsinaMilic.png"/>
          </a>
          <a href="https://github.com/VukGr" target="_blank" rel="noopener noreferrer">
            <Avatar src="https://github.com/VukGr.png"/>
          </a>
          <a href="https://github.com/KatarinaM14" target="_blank" rel="noopener noreferrer">
            <Avatar src="https://github.com/KatarinaM14.png"/>
          </a>
          <a href="https://github.com/matija-speletic" target="_blank" rel="noopener noreferrer">
            <Avatar src="https://github.com/matija-speletic.png"/>
          </a>
          <a href="https://github.com/15Milica" target="_blank" rel="noopener noreferrer">
            <Avatar src="https://github.com/15Milica.png"/>
          </a>
        </AvatarGroup>
        <Typography textColor="text.secondary">
        This site was crafted exclusively by a team of <b>5</b> developers,<br />
        Showcasing our collaborative skills in bringing ideas to life!
        </Typography>
      </Box>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Welcome to a Smarter Way to navigate Real Estate!
      </Typography>
    </TwoSidedLayout>
  );
}
