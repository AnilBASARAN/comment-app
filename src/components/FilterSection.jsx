import * as React from 'react';
import { useState } from 'react';
import { Card, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

const ContainerMain = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width: '100%', // Set to full width
});

const FilterSection = (props) => {
    const { userId,setFilter ,setPersonalFilter} = props;

    const [selectedFilter, setSelectedFilter] = useState("ALL");
    const [personamPreferencesFilter,setPersonalPreferencesFilter] = useState("ALL");

    const filterOptions = ["ALL", "HTML", "CSS", "JAVASCRIPT", "REACT"];
    const personamPreferences = ["ALL" , "WRITTENBYME"];

    const handleSelection = (value) => {

        setSelectedFilter(value);
        setFilter(value);
    };

    const handleSelection2 = (value) => {
     
            setPersonalPreferencesFilter(value);
            setPersonalFilter(value);
         };

    return (

        <Card>

        {(userId == null) ?
             
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <ContainerMain>
                        {filterOptions.map((option) => (
                            <Button
                                key={option}
                                variant={selectedFilter === option ? 'contained' : 'text'}
                                onClick={() => handleSelection(option)}
                            >
                                {option}
                            </Button>
                        ))}
                    </ContainerMain>
                </Typography>
            </CardContent>
        
        :
        
        
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    <ContainerMain>
                        {personamPreferences.map((option) => (
                            <Button
                                key={option}
                                variant={personamPreferencesFilter === option ? 'contained' : 'text'}
                                onClick={() => handleSelection2(option)}
                            >
                                {option}
                            </Button>
                        ))}
                    </ContainerMain>
                </Typography>
            </CardContent>
            }

        </Card>
    
    );
};

export default FilterSection;
