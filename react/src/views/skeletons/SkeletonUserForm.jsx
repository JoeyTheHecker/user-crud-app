import React from 'react'
import { Box, Container, Skeleton } from '@mui/material';
const SkeletonUserForm = () => {
  return (
    <Container component="section" maxWidth="xs">
      <Box
        sx={{
          marginTop: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        
            
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="text" width="100%" height={60} />
      </Box>
    </Container>
  )
}

export default SkeletonUserForm