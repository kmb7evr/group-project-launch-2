import Button from '@mui/material/Button';
import axios from "axios"
import React, { useState, useEffect, useRef, useContext } from "react";

function LikeButton(props) {
    const user=props.user
    const hasLiked = (likeArray) => {
        for (let i=0; i<likeArray.length; i++) {
            if(likeArray[i]===user) {
                return true;
            }
        }
        return false;
    }
    const [liked, setLiked] = useState(false);
    if (!hasLiked(props.likers)) {
        return(
        <Button type="submit"
            variant='outlined'
            onClick={() => {props.likePost(props.id); setLiked(true)}}
            sx={{ color: '#000000', borderColor: '#000000' }}>Like
        </Button>
        )
    }
    else {
        return (
            <div>Liked</div>
        )
    }
}
export default LikeButton;