import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { useState  } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Form from './Form';
import { createUser } from '../api/users';

const AddForm = () => {
    
    const {setNotification} = useStateContext()

    const navigate = useNavigate()
    const [errors, setErrors] = useState('')

    const queryClient = useQueryClient()

    const newUserMutation = useMutation({
      mutationFn: createUser,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']})
            setNotification({
              open: true,
              message: 'User Added Successfully'
            })
            navigate('/users')
          },
          onError: (err) => {
            const response = err.response;
            if (response && response.status === 422) {
                  setErrors(response.data.errors)
                }
          }
    })
   
    const handleSubmit = (payload) => {
        console.log(payload)
        newUserMutation.mutate(payload)
    }

  return (
      <>
      <Container component="section" maxWidth="xs">
      <CssBaseline />
          <Form onSubmit={handleSubmit} initialValue={''} errors={errors} isPending={newUserMutation.isPending}/>
      </Container>
      </>
  )
}

export default AddForm