import React from 'react'
import { Box, Button, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <Box
    >
      <Typography
        sx={{
          color: 'primary.main'
        }}>NavbarOut</Typography>
      <Typography
        sx={{
          color: 'primary.light'
        }}>NavbarOut</Typography>
      <Typography
        sx={{
          color: 'secondary.main'
        }}>NavbarOut</Typography>
      <Typography
        sx={{
          color: 'secondary.light'
        }}>NavbarOut</Typography>
      <Button variant='contained' color="secondary">Navbar</Button>
    </Box>
  )
}

export default Navbar