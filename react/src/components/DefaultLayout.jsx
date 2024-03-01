import { Alert, Container, Fade, Snackbar } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const DefaultLayout = () => {

  const {notification, handleClose} = useStateContext()
  
  return (
    <> 
      <Container component="main"  maxWidth="md">
        <Outlet/>
        <Snackbar 
            open={notification.open} 
            autoHideDuration={5000} 
            onClose={handleClose} 
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: 'bottom',horizontal: 'right'}}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                {notification.message}
              </Alert>
      </Snackbar>
      </Container>
     
    </>
  )
}

export default DefaultLayout