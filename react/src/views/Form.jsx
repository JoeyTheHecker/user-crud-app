import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Button from '@mui/material/Button';
import { Alert, Box, CircularProgress, Fab, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react';
import dayjs from 'dayjs';
import { createRef } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
const Form = ({onSubmit, initialValue, errors, isPending}) => {

    const navigate = useNavigate()

    const firstnameRef = createRef()
    const middlenameRef = createRef()
    const lastnameRef = createRef()
    const ageRef = createRef()
    const genderRef = createRef()
    const dateOfBirthRef = createRef()

    const [user, setUser] = useState({
        firstname: initialValue?.data?.firstname || '',
        middlename: initialValue?.data?.middlename || '',
        lastname: initialValue?.data?.lastname || '',
        age: initialValue?.data?.age || '',
        gender: initialValue?.data?.gender || '',
        date_of_birth: initialValue?.data?.date_of_birth || ''
    })

    const [date, setDate] = useState(dayjs('2024-01-01'))

    const formatDateForApi = (selectedDate) => {
        return dayjs(selectedDate).format('YYYY-MM-DD'); 
      };

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
          firstname: firstnameRef.current.value,
          middlename: middlenameRef.current.value,
          lastname: lastnameRef.current.value,
          age: ageRef.current.value,
          gender: genderRef.current.value,
          date_of_birth: formatDateForApi(dateOfBirthRef.current.value),
        }

        onSubmit(payload)
    }

  return (
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      >
      <Fab variant="extended" size="small"  sx={{ marginBottom: 3, alignSelf: 'flex-end' }} onClick={() => navigate('/users')}>
        <ArrowBackIosNewIcon sx={{ mr: 1 }} /> 
        Back to users
      </Fab>
      <Typography component="h1" variant="h5">
        {initialValue?.data?.id ? 'Update user: '+ user.firstname : 'New user'}
      </Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {errors && 
          <Grid item xs={12} sm={12}>
              {Object.keys(errors).map(key => (
                <Alert variant="filled" severity="error" key={key}>
                  {errors[key][0]}
                </Alert>
              ))}
          </Grid>
            }
          <Grid item xs={12} sm={12}>
            <TextField
              name='firstname'
              id='First Name'
              required
              fullWidth
              label="First Name"
              InputLabelProps={{
                shrink: Boolean(user.firstname) || undefined,
              }}
              value={user.firstname}
              onChange={(e) => setUser({...user, firstname: e.target.value})}
              inputRef={firstnameRef}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name='middlename'
              id='Middle Name'
              required
              fullWidth
              label="Middle Name"
              InputLabelProps={{
                shrink: Boolean(user.middlename || undefined),
              }}
              value={user.middlename}
              onChange={(e) => setUser({...user, middlename: e.target.value})}
              inputRef={middlenameRef}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name='lastname'
              id='Last Name'
              required
              fullWidth
              label="Last Name"
              InputLabelProps={{
                shrink: Boolean(user.lastname || undefined),
              }}
              value={user.lastname}
              onChange={(e) => setUser({...user, lastname: e.target.value})}
              inputRef={lastnameRef}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              name='age'
              id='Age'
              required
              fullWidth
              label="Age"
              InputLabelProps={{
                shrink: Boolean(user.age || undefined),
              }}
              value={user.age}
              onChange={(e) => setUser({...user, age: e.target.value})}
              inputRef={ageRef}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                name='gender'
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={user.gender}
                label="Gender"
                onChange={(e) => setUser({...user, gender: e.target.value})}
                inputRef={genderRef}
              >
                <MenuItem value='male'>Male</MenuItem>
                <MenuItem value='female'>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'DatePicker',
                ]}
              >
                <DatePicker label="Date Of Birth"
                          id='Date Of Birth' 
                          name='date_of_birth'
                          value={user.date_of_birth ? dayjs(user.date_of_birth.toString()) : date} 
                          onChange={(newValue) => setDate(newValue)}
                          slotProps={{ textField: { fullWidth: true } }}
                          inputRef={dateOfBirthRef}/>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isPending && true}
          startIcon={isPending && <CircularProgress color="inherit" size={20}/>}
        >
          {isPending ? 'Processing...' : 'Submit'}
        </Button>
      </Box>
      </Box>
  )
}

export default Form