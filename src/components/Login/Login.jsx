import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { InputAdornment, OutlinedInput, Snackbar, Alert, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

import './Login.css';

const ContainerMain = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%', // Set to full width
    
});

function Login(props) {
    const { refreshPosts } = props;
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false); // State to control mismatch alert
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setAlertOpen(false); // Close mismatch alert when clicking away
    };

    const logUser = async () => {
        try {
            const response = await fetch("/users");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserList(data);
            return data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    };

    const userCheck = (users) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].userName === userName && users[i].password === password) {
                return [true, users[i].id]; // Return true and the user's ID if both match
            }
        }
        return [false, null]; // Return false and null if no match is found
    };

    const mismatchUserInfo = () => {
        setAlertOpen(true); // Show the mismatch alert
    };

    const handleLogin = async () => {
        try {
            const users = await logUser(); // Wait for the users to be fetched
            const [isMatch, userId] = userCheck(users); // Pass the users list to userCheck

            if (isMatch) {
                // Redirect to the user's page with the correct userId
                navigate(`/users/${userId}`);
            } else {
                mismatchUserInfo(); // Show alert if no match is found
            }
        } catch (err) {
            console.error("Error during login:", err);
        } finally {
            setOpen(true); // Show snackbar after attempting to submit
            setUserName("");
            setPassword("");
        }
    };

    const handleTitle = (value) => {
        setUserName(value);
    };

    const handleText = (value) => {
        setPassword(value);
    };

    return (
        <ContainerMain>
            <div id='formContainer' className="postContainer">
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                        Your post has been sent successfully!
                    </Alert>
                </Snackbar>

                <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                        There is no username and password matching your input. Please enter your username & password again.
                    </Alert>
                </Snackbar>

                <Card>
                    <CardHeader
                        avatar={"Username"}
                        title={
                            <OutlinedInput
                                id='outlined-adornment-amount'
                                multiline
                                placeholder='Username'
                                inputProps={{ maxLength: 25 }}
                                fullWidth
                                value={userName}
                                onChange={(i) => handleTitle(i.target.value)}
                            />
                        }
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            <OutlinedInput
                                id='outlined-adornment-amount'
                                multiline
                                placeholder='Password'
                                inputProps={{ maxLength: 250 }}
                                fullWidth
                                value={password}
                                onChange={(i) => handleText(i.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <Button
                                            variant='contained'
                                            onClick={handleLogin}
                                        >
                                            Login
                                        </Button>
                                    </InputAdornment>
                                }
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            <div id='fullUserList'>
                {userList.map(user => (
                    <div key={user.id}>
                           Username: {user.userName}        --           Password:  {user.password}   -- UserID: {user.id}
                        
                    </div>
                ))}
            </div>
            
            </ContainerMain>
    );
}

export default Login;
