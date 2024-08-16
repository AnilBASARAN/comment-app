import React from "react";
import { useParams } from "react-router-dom";
import { InputAdornment, OutlinedInput, Snackbar, Alert, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";
import Navbar from "./NavBar/NavBar";
    
    const ContainerMain = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%', // Set to full width
        
    });
    
    const ContainerText = styled('div')({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "5px",
        marginTop: "10px",
        width: '100%', // Set to full width
        
    });
    
    function CreateUser() {

      const { userId } = useParams();

      // user details / info you fetch ile çekerek alanları doldur, sonrasında update user info tuşuna update/ post fetch 
      // navbar a da hem username hem de user ıd yolla ki welcome {username } diyebilsin ve homedaki gibi login çıkmasın

        return (
            <ContainerMain>
                <Navbar userId={userId}></Navbar>
                <div id='formContainer' className="postContainer">
    
    
                    <Card>
                        <CardHeader
                            avatar={"User ID"}
                            title={
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    multiline
                                    placeholder='Username'
                                    inputProps={{ maxLength: 25 }}
                                    fullWidth
                                    value= {userId}
                                  
                                />
                            }
                        />
    
                        <CardHeader
                            avatar={"Password"}
                            title={
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    multiline
                                    placeholder='Password'
                                    inputProps={{ maxLength: 25 }}
                                    fullWidth
                                    value=""
                                  
                                />
                            }
                        />
    
                        <CardHeader
                            avatar={"Email info "}
                            title={
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    multiline
                                    placeholder="Email info"
                                    inputProps={{ maxLength: 25 }}
                                    fullWidth
                                    value=""
                                  
                                />
                            }
                        />
    
                        <CardHeader
                            avatar={"First Name"}
                            title={
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    multiline
                                    placeholder="First Name"
                                    inputProps={{ maxLength: 25 }}
                                    fullWidth
                                    value=""
                                  
                                />
                            }
                        />
    
                        <CardHeader
                            avatar={"Last Name"}
                            title={
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    multiline
                                    placeholder='Last Name'
                                    inputProps={{ maxLength: 25 }}
                                    fullWidth
                                    value=""
                                  
                                />
                            }
                        />
    
                        
    
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                <OutlinedInput
                                    id='outlined-adornment-amount'
                                    multiline
                                    placeholder='I here by accept whatever you say'
                                    inputProps={{ maxLength: 250 }}
                                    fullWidth
                                    value=""
                                    
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <Button
                                                variant='contained'
                                                
                                            >
                                                Update User Info
                                            </Button>
                                        </InputAdornment>
                                    }
                                />
                            </Typography>
                           
                        </CardContent>
                    </Card>
                </div>
        
            </ContainerMain>
        );
    
    }
    
    export default CreateUser;
