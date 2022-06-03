import { React, useState } from 'react'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function FilterList(props) {

    const filteredData = props.forumNames.filter((el) => {
        if (props.input === '') {
            return el;
        }
        else {
            return el.forumName.toLowerCase().includes(props.input)
        }
    })

    return (
        <center>
        <ul>
        <Grid container spacing={3}>
          {filteredData.map((f, index) => (
            <ol key={f.id}>
                <Grid item xs>
                    <Link to='IndivForum' state={{ id: f.id, name: f.forumName, creator: f.creator, currentUser: props.user}}>
                        <Button
                            variant='outlined'
                            sx={{ color: '#000000', borderColor: '#000000' }}>{f.forumName} <br></br>
                            Created By: {f.creator}<br></br>
                            Posts: {f.posts}<br></br>
                        </Button>
                        <br></br>
                    </Link> 
                </Grid> <br></br>
            </ol>))
          }
          </Grid>
        </ul>
        </center>
    )

}

export default FilterList;