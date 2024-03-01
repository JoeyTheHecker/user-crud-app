import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const DialogError = ({errorMessage, handleRefetch}) => {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        handleRefetch()
        setOpen(false)
    };

    const StyledDialog = styled (Dialog) ({
      '& .MuiDialogTitle-root': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Adjust alignment of the title actions
        alignItems: 'center',
      },
      '& .MuiDialogContent-root': {
        display: 'flex',
        justifyContent: 'center', // Adjust alignment of the content actions
      },
      '& .MuiDialogActions-root': {
        justifyContent: 'center', // Adjust alignment of the dialog actions
      },
      '& .MuiButton-root': {
      
      },
    })

  return (
    <>
      <StyledDialog
        fullWidth={true}
        maxWidth='xs'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle variant='h4'>
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 100 }} color='error'/>
            Error
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='primary'>OK</Button>
        </DialogActions>
      </StyledDialog>
    </>
  )
}

export default DialogError