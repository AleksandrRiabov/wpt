import { PageHeader } from "../../components"
import { Container, Box } from "@mui/material"


const Dashboard = () => {
  return (
    <Box
      className="page"
      sx={{
        bgcolor: 'primary.main'
      }}
    >
      <Container maxWidth='xl'>
        <PageHeader title='Dashboard' />
      </Container>
    </Box>
  )
}

export default Dashboard