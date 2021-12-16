import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Card from "../../components/Card";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useValidation} from "../../hooks/useValidation";
import {emailPattern} from "../../config/rfc";
import {useState} from "react";

const AuthPage = () => {
    const [validationEmailError, setValidationEmailError] = useState('');
    const [validationPasswordError, setValidationPasswordError] = useState('');
    const [validationConfirmPasswordError, setValidationConfirmPasswordError] = useState('');
    const [validationDepartmentError, setValidationDepartmentError] = useState('');

    const emailChangeHandler = (): void => setValidationEmailError('')
    const passwordChangeHandler = (): void => setValidationPasswordError('')
    const confirmPasswordChangeHandler = (): void => setValidationConfirmPasswordError('')
    const departmentChangeHandler = (): void => setValidationDepartmentError('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
                    likeField: {'password' : data.get('password') as string}
                },
            },
            {
                field: 'department',
                rules: {
                    required: true,
                },
            },
        ])

        setValidationEmailError(validator.get('email') ?? '')
        setValidationPasswordError(validator.get('password') ?? '')
        setValidationConfirmPasswordError(validator.get('confirmPassword') ?? '')
        setValidationDepartmentError(validator.get('department') ?? '')
    };

    return (
        <Container component="main" maxWidth="xs">
            <Card className="p-1 authForm">
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <HowToRegIcon/>
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
                    <FormControl fullWidth>
                        <InputLabel id="department">Отдел</InputLabel>
                        <Select
                            error={!!validationDepartmentError}
                            labelId="department"
                            name="department"
                            value=""
                            variant="standard"
                            label="Отдел"
                            onChange={departmentChangeHandler}
                        >
                            <MenuItem value="">Выберите отдел...</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        Зарегистрироваться
                    </Button>
                </Box>
            </Card>
        </Container>
    );
}

export default AuthPage