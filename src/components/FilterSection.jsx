import * as React from 'react';
import { useState } from 'react';
import { CardHeader, Avatar, OutlinedInput, Select, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { InputAdornment, Card,  Button } from '@mui/material';
import { Link } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';



const ContainerMain = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: `20px`,
    width: '100%', // Set to full width
    
});


const FilterSection = (props) => {
const {userId} = props;
 const [selectedFilter,setSelectedFilter] = useState("ALL");
const filterOptions = ["HTML","CSS","JAVASCRIPT","REACT"]
const handleSelection = (value) => {
    setSelectedFilter(value);
}

    return(
        <Card>
             {userId ?( <CardHeader
                   
                   title={
                       <>
                         {/* Select Dropdown */}
                         <Select
                         sx={{ minWidth: 200 }}  // Set the minimum width for the dropdown
                           id="select-dropdown"
                           value={selectedFilter}  // Bind the select value to the selectedFilter
                           onChange={handleSelection}  // Handle the change event directly with handleSelection
                           displayEmpty
                           fullWidth
                         >
                           <MenuItem  value="Select a subject" disabled>
                             Select a subject
                           </MenuItem>
                           {filterOptions.map((option, index) => (
                             <MenuItem key={index} value={option}>
                               {option}
                             </MenuItem>
                           ))}
                         </Select>
                       </>
                     }
               />):(  <CardContent>
                <Typography variant="body2" color="text.secondary">
                   
                
                                 <ContainerMain>
                                   
                                <Button
                                    variant='contained'
                                    
                                >
                                    ALL
                                </Button>
                                <Button
                                    variant='contained'
                                    
                                >
                                    HTML
                                </Button>
                                <Button
                                    variant='contained'
                                    
                                >
                                    CSS
                                </Button>
                                <Button
                                    variant='contained'
                                    
                                >
                                    JAVASCRIPT
                                </Button>
                                <Button
                                    variant='contained'
                                    
                                >
                                    REACT
                                </Button>
                                </ContainerMain>
                          
                        
                    
               
                </Typography>
            </CardContent>)}
               

              
            </Card>
    )
}

export default FilterSection;