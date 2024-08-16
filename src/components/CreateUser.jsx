import React, { useState, useEffect, useCallback } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { InputAdornment, OutlinedInput, Snackbar, Alert, Button } from '@mui/material';
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
    return (
        <ContainerMain>
            <Navbar createUser={true}></Navbar>
            <div id='formContainer' className="postContainer">


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
                                value=""
                              
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
                                            Create New User
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