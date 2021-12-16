import * as React from 'react'
import {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {NavLink} from 'react-router-dom'
import {Paths} from '../../routes/paths'
import Card from "../../components/Card";
import {useValidation} from "../../hooks/useValidation";
import {emailPattern} from "../../config/rfc";


const loginPage = () => {
    const [validationEmailError, setValidationEmailError] = useState('');
    const [validationPasswordError, setValidationPasswordError] = useState('');

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
        ])

        setValidationEmailError(validator.get('email') ?? '')
        setValidationPasswordError(validator.get('password') ?? '')
    };

    const emailChangeHandler = (): void => setValidationEmailError('')
    const passwordChangeHandler = (): void => setValidationPasswordError('')

    return (
        <Container component="main" maxWidth="xs">
            <Card className="p-1 authForm">
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box autoComplete="off" component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        error={!!validationEmailError}
                        helperText={validationEmailError}
                        variant="standard"
                        margin="normal"
                        fullWidth
                        label="Электронная почта"
                        name="email"
                        id="email"
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
                        id="password"
                        type="password"
                        onChange={passwordChangeHandler}
                        label="Пароль"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="secondary"/>}
                        label="Запомнить меня"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{mt: 3, mb: 2}}
                    >
                        Войти
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to={Paths.AuthPage} style={{fontSize: '14px'}}>
                                {"Нет учетной записи? Зарегистрироваться!"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        </Container>
    );
}

export default loginPage