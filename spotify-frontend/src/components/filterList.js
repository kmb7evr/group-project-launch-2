import { React, useState } from 'react'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Card, CardMedia, Typography, CardContent, createTheme, ThemeProvider } from '@mui/material/';

function FilterList(props) {
    const theme = createTheme({
        palette: {
            neutral: {
                main: '#64748B',
                contrastText: '#fff',
            },
            selected: {
                main: '#1DB954',
                contrastText: '#fff',
            },
            black: {
                main: '#000000',
                contrastText: '#fff',
            },
        },
    });
    const filteredData = props.forumNames.filter((el) => {
        if (props.input === '') {
            return el;
        }
        else {
            return el.forumName.toLowerCase().includes(props.input)
        }
    })

    return (
        <ThemeProvider theme={theme}>

            <center>
                <ul>
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                        {filteredData.map((f, index) => (<Box>
                            <ol key={f.id}>
                                <Card sx={{
                                    display: 'flex',
                                    minWidth: 200,
                                    maxWidth: 200,
                                    justifyContent: 'right',
                                    m: 2,
                                    margin: '20px'
                                }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', flexGrow: 1 }}>
                                        <CardContent sx={{
                                            flex: '1 0 auto',
                                        }}>
                                            <Typography component="div" variant="h5">
                                                <Link to='IndivForum' style={{ textDecoration: 'none' }} state={{ id: f.id, name: f.forumName, creator: f.creator, currentUser: props.user }}>
                                                    <Button
                                                        variant='contained' color='black'
                                                        sx={{}}>{f.forumName} <br></br>
                                                    </Button>
                                                </Link>
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Created By: {f.creator}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Posts: {f.posts}
                                            </Typography>

                                        </CardContent>
                                    </Box>

                                </Card>
                            </ol>
                        </Box>))
                        }
                    </Box>

                </ul>
            </center>
        </ThemeProvider>
    )

}

export default FilterList;