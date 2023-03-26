import { Box, Container } from '@mui/system'

const Footer = () => {

  return (
    <Box sx={{ 
      bgcolor: "primary.main",
      padding: '30px',
      color: 'primary.light'
      }}>
      <Container maxWidth="xl">
        <Box sx={{
          textAlign: 'center',
        }}

          color="secondary"
        >
          @WebDevApplications@gmail.com 2023
        </Box>
      </Container>
    </Box>
  )
}

export default Footer