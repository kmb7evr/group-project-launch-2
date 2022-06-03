import { Calculate } from '@mui/icons-material';
import { common } from '@mui/material/colors';
import { textAlign } from '@mui/system';
// function pagescss(){
    const buttonStyle = {
        display: 'flex',
        alignItems: 'right',
        justifyContent: 'center',
        color: 'blue',
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        height: "50px",
        width: "200px",
        fontSize: '20px',
        borderRadius: '10px',
        padding: '20px'
    }

    const divStyleMessageSent = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        borderRadius: '25px',
        backgroundColor: '#1982FC',
        padding: '5px', 
        marginBottom: '5px',
        marginTop: '5px',
        position: 'relative',
        width: '300px',
        display: 'inline-block',
        textAlign: 'center',
        borderBottomRightRadius: "0px"
    }

    const divStyleMessageRec = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        borderRadius: '25px', 
        backgroundColor: '#D3D3D3',
        padding: '5px',
        marginBottom: '5px',
        marginTop: '5px',
        position: 'relative',
        textAlign: 'center',
        width: '300px',
        display: 'inline-block',
        borderBottomLeftRadius: "0px"
    }

export{buttonStyle, divStyleMessageSent, divStyleMessageRec};