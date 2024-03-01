import { Container } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import { useParams, useNavigate } from 'react-router-dom';
import { useState  } from 'react';
import { useStateContext } from '../context/ContextProvider';
import SkeletonUserForm from './skeletons/SkeletonUserForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Form from './Form';
import { fetchUser, updateUser } from '../api/users';
const EditForm = () => {
    
    const { setNotification } = useStateContext()

    const navigate = useNavigate()
    const {id} = useParams()
    const [errors, setErrors] = useState('')

    const queryClient = useQueryClient()
   
    const { isLoading, isError, error, data } = useQuery({
      queryKey: ['users', id],
      queryFn: () => fetchUser(id)
    })

    const updateUserMutation = useMutation({
      mutationFn: updateUser,
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']})
            setNotification({
              open: true,
              message: 'User Updated Successfully'
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
    
    if(isLoading) {
      return <SkeletonUserForm/>
    }

    if (isError) {
      return <div>Error: {error.message}</div>;
    }

    const handleSubmit = (updatedUser) => {
        console.log({id, ...updatedUser})
        updateUserMutation.mutate({id, ...updatedUser})
    }

  return (
      <>
      <Container component="section" maxWidth="xs">
      <CssBaseline />
          <Form onSubmit={handleSubmit} initialValue={data} errors={errors} isPending={updateUserMutation.isPending}/>
      </Container>
      </>
  )
}

export default EditForm