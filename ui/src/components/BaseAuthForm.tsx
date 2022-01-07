import React, {useEffect, useState} from 'react';
import Container from "@mui/material/Container"
import Card from "./Card"
import Avatar from "@mui/material/Avatar"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material"
import Button from "@mui/material/Button"
import {IDepartment} from "../types/appTypes"
import {fetchDepartments} from "../axios/DepartmentRepository"
import {useValidation} from "../hooks/useValidation"
import {emailPattern, modalShowDuration} from "../config/settings"
import UseModal from "../hooks/useModal"
import {useActions} from "../hooks/useActions"
import {useTSelector} from "../hooks/useTSelector"
import {rolesMapper} from "../lang/rus"
import {useHistory} from "react-router"
import {Paths} from "../routes/paths"

type IPage = {
  page: 'login' | 'auth'
}

const BaseAuthForm: React.FC<IPage> = ({page}) => {
  const [validationEmailError, setValidationEmailError] = useState<string>('');
  const [validationNameError, setValidationNameError] = useState<string>('');
  const [validationLastNameError, setValidationLastNameError] = useState<string>('');
  const [validationPasswordError, setValidationPasswordError] = useState<string>('');
  const [validationConfirmPasswordError, setValidationConfirmPasswordError] = useState<string>('');
  const [validationDepartmentError, setValidationDepartmentError] = useState<string>('');
  const [departments, setDepartments] = useState<Array<IDepartment>>([])
  const [selectDepartment, setSelectDepartment] = useState<string>('')
  const [disableButton, setDisableButton] = useState<boolean>(false)

  const {authentication, setAuthError, login} = useActions()
  const {message} = UseModal()
  const {authError, user} = useTSelector(state => state.auth)
  const history = useHistory()

  const emailChangeHandler = (): void => {
    setValidationEmailError('')
  }
  const nameChangeHandler = (): void => {
    setValidationNameError('')
  }
  const lastNameChangeHandler = (): void => {
    setValidationLastNameError('')
  }
  const passwordChangeHandler = (): void => {
    setValidationPasswordError('')
  }
  const confirmPasswordChangeHandler = (): void => {
    setValidationConfirmPasswordError('')
  }
  const departmentChangeHandler = (e: SelectChangeEvent): void => {
    setValidationDepartmentError('')
    setSelectDepartment(e.target.value)
  }

  const validationHasErrors = (): boolean => {
    return !!validationConfirmPasswordError ||
      !!validationPasswordError ||
      !!validationEmailError ||
      !!validationNameError ||
      !!validationLastNameError ||
      !!validationDepartmentError
  }

  useEffect(function () {
    fetchDepartments().then((departments: Array<IDepartment>) => {
      setDepartments(() => departments)
    })
  }, [])

  useEffect(function() {
    if (user) {
      const role = user.role
      if (role === rolesMapper.user){
        history.push(Paths.Panel)
      }

      if (role === rolesMapper.admin || role === rolesMapper.moderator){
        history.push(Paths.Dashboard)
      }
    }
  }, [user])

  useEffect(function () {
      if (authError) {
        message(authError, 'error')
        setTimeout(() => setAuthError(''), modalShowDuration)
      }

      if (validationHasErrors()) {
        setDisableButton(true)
      } else {
        setDisableButton(false)
      }
    },
    [
      validationConfirmPasswordError,
      validationPasswordError,
      validationEmailError,
      validationNameError,
      validationLastNameError,
      validationDepartmentError,
      authError
    ]
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const validator = useValidation(data, [
      {
        field: 'email',
        rules: {
          required: true,
          pattern: emailPattern
        },
      },
      {
        field: 'name',
        rules: {
          required: true,
          min: 2,
          cyrillic: true
        },
      },
      {
        field: 'lastName',
        rules: {
          required: true,
          min: 2,
          cyrillic: true
        },
      },
      {
        field: 'password',
        rules: {
          required: true,
          min: 5
        },
      },
      {
        field: 'confirmPassword',
        rules: {
          required: true,
          likeField: {'password': data.get('password') as string}
        },
      },
      {
        field: 'departmentId',
        rules: {
          required: true,
        },
      },
    ])

    if (validator.size === 0) {
      setDisableButton(true)
      if (page === 'auth') {
        await authentication(data)
      }
      if (page === 'login') {
        await login(data)
      }
      return
    }

    setValidationEmailError(validator.get('email') ?? '')
    setValidationPasswordError(validator.get('password') ?? '')
    setValidationConfirmPasswordError(validator.get('confirmPassword') ?? '')
    setValidationNameError(validator.get('name') ?? '')
    setValidationLastNameError(validator.get('lastName') ?? '')
    setValidationDepartmentError(validator.get('departmentId') ?? '')
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card className="p-1 authForm">
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация пользователя
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            error={!!validationEmailError}
            helperText={validationEmailError}
            variant="standard"
            margin="normal"
            fullWidth
            label="Электронная почта"
            name="email"
            onChange={emailChangeHandler}
            autoFocus
          />
          {page === 'auth' &&
              <>
                <TextField
                    error={!!validationNameError}
                    helperText={validationNameError}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    name="name"
                    onChange={nameChangeHandler}
                    label="Имя"
                />
                <TextField
                    error={!!validationLastNameError}
                    helperText={validationLastNameError}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    name="lastName"
                    onChange={lastNameChangeHandler}
                    label="Фамилия"
                />
              </>
          }
          <TextField
            error={!!validationPasswordError}
            helperText={validationPasswordError}
            variant="standard"
            margin="normal"
            fullWidth
            name="password"
            type="password"
            onChange={passwordChangeHandler}
            label="Пароль"
          />
          {page === 'auth' &&
              <>
                <TextField
                    error={!!validationConfirmPasswordError}
                    helperText={validationConfirmPasswordError}
                    margin="normal"
                    variant="standard"
                    fullWidth
                    name="confirmPassword"
                    label="Повторите пароль"
                    type="password"
                    onChange={confirmPasswordChangeHandler}
                />
                <FormControl sx={{mt: 2}} fullWidth>
                  <InputLabel
                      id="department"
                  >
                    Отдел
                  </InputLabel>
                  <Select
                      error={!!validationDepartmentError}
                      color='secondary'
                      labelId="department"
                      name="departmentId"
                      value={selectDepartment}
                      label="Отдел"
                      onChange={departmentChangeHandler}
                  >
                    <MenuItem value="">Выберите отдел...</MenuItem>
                    {departments && departments.map(
                      (department) =>
                        <MenuItem key={department.id} value={department.id}>
                          {department.name}
                        </MenuItem>)
                    }
                  </Select>
                  <Typography
                      color="secondary"
                      variant="caption"
                      gutterBottom
                      component="div"
                  >
                    {validationDepartmentError}
                  </Typography>
                </FormControl>
              </>
          }
          <Button
            type="submit"
            disabled={disableButton}
            fullWidth
            variant="contained"
            color="primary"
            sx={{mt: 3, mb: 2}}
          >
            {page === 'auth' && "Зарегистрироваться" }
            {page === 'login' && "Войти" }
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default BaseAuthForm;