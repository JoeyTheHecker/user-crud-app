import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import debounce from 'lodash.debounce';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Typography, Stack, Box, Pagination, TextField, IconButton } from '@mui/material';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { capitalizeFirstLetter, middleInitialFormat } from '../helper';
import { fetchUsers, deleteUser } from '../api/users';
import DialogError from './DialogError';
const Users = () => {
    const queryClient = useQueryClient()
    const { setNotification } = useStateContext()

    const navigate = useNavigate()
    
    const [searchTerm, setSearchTerm] = useState('');
    const [search, setSearch] = useState('');

    const [currentPage, setCurrentPage] = useState(1)
    
    const { isLoading, isError, error, data: users, refetch } = useQuery({
      queryKey: ['users', currentPage, search],
      queryFn: () => fetchUsers(currentPage, search),
    })  
    

    const handleRefetch = () => {
      refetch()
      console.log('refetch')
    }
    const deleteUserMutation = useMutation({
      mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
            setNotification({
              open: true,
              message: 'User Deleted Successfuly',
            })
        },
        onError: (err) => {
          console.log(err)
        }
    })

    const request = debounce((search) => {
          setSearch(search)   
    }, 500)

    const debounceRequest = useCallback(
      (search) => request(search),
      []
    )

    const onChange = (e) => {
      setSearchTerm(e.target.value)
      debounceRequest(e.target.value)
    }

    //HANDLE PAGINATION
    const handlePagination = (event,value) => {
        setCurrentPage(value)
    }

    //HANDLE DELETE
    const handleDelete = (userId) => {
      if(!confirm("Are you sure want to delete this user?")){
        return
      }
      deleteUserMutation.mutate(userId)
    }

    
    
  return (
      <>
    {isError  && <DialogError errorMessage={error.message} handleRefetch={handleRefetch}/>}
    <Stack direction="column" justifyContent="flex-start" alignItems="flex-end" sx={{ bgcolor: '', height: '100vh', marginTop: 6}}>
          <Box mb={2} sx={{ width: "100%", display: "flex", justifyContent:"space-between", alignItems: "flex-end"}}>
            <Typography variant='h4' component='h1'>Users</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, marginTop: '10px'}}>
                < Button onClick={() => {navigate('/users/new')}} variant="contained" size="small" color='success'>Add user</Button>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={onChange}
                    disabled={isError ? true : false}
                    />
            </Box>
          </Box>
        <TableContainer component={Paper} sx={{overflowY: 'hidden', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                   
                    <TableCell >Id</TableCell>
                    <TableCell align="right">Fullname</TableCell>
                    <TableCell align="right">Gender</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">Date Of Birth</TableCell>
                    <TableCell align="center" hidden>Action</TableCell>
                </TableRow>
                </TableHead>
                  {!isLoading && (
                    <TableBody>
                    {users?.data?.map(({id, firstname, middlename, lastname, gender, age, date_of_birth}) => (
                      <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                      <TableCell component="th" scope="row">
                          {id} 
                      </TableCell>
                      <TableCell align="right">
                          {capitalizeFirstLetter(firstname)} {middleInitialFormat(middlename)}. {capitalizeFirstLetter(lastname)}
                      </TableCell>
                      <TableCell align="right">{capitalizeFirstLetter(gender)}</TableCell>
                      <TableCell align="right">{age}</TableCell>
                      <TableCell align="right">{date_of_birth}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} justifyContent='center'>
                            <Button variant="contained" color='primary' size="small" onClick={() => {navigate(`/users/${id}`)}}>
                                    Edit
                            </Button>
                            <Button variant="contained" color='error' size="small" onClick={() => handleDelete(id)}>
                                    Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  )}
            </Table>
            {isLoading && (
                    <Box sx={{ marginTop: 1,marginBottom: 1,width: '100%', display: 'flex', justifyContent:'center'}}><Typography variant="h7"sx={{ background: '' }}>Loading...</Typography></Box>
                )}
            {users?.meta?.total < 1 &&(
                    <Box sx={{ marginTop: 1,marginBottom: 1,width: '100%', display: 'flex', justifyContent:'center'}}><Typography variant="h7"sx={{ background: '' }}>No Users Found...</Typography></Box>
                )}
            
        </TableContainer>
        <Stack direction="column" justifyContent="center" alignItems="flex-end" marginTop={2}>
                <Pagination count={users?.meta?.last_page > 0 ? users.meta.last_page : 0} color="primary" page={currentPage} onChange={handlePagination}/>
                <Typography variant="subtitle2" sx={{ marginRight: '20px', marginBottom: '15px', marginTop: 1 }}>{users?.meta?.from ? users?.meta?.from : 0} - {users?.meta?.to ? users?.meta?.to : 0} of {users?.meta?.total ? users?.meta?.total : 0}</Typography>
        </Stack>   
    </Stack>
    </>
  )
}

export default Users