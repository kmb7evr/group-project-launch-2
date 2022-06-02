import { common } from '@mui/material/colors';
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
        alignItems: 'right',
        justifyContent: 'right',
        color: 'black',
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        borderRadius: '25px',
        backgroundColor: '#1982FC',
        display: 'inline-block',
        padding: '5px', 
        marginLeft: '50px',
        marginBottom: '5px',
        marginTop: '5px',
        position: 'relative',
        left: "900px"
    }

    const divStyleMessageRec = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        border: '1px solid rgba(0, 0, 0, 0.05)', 
        borderRadius: '25px', 
        backgroundColor: '#D3D3D3',
        display: 'inline-block', 
        padding: '5px',
        marginLeft: '50px',
        marginBottom: '5px',
        marginTop: '5px',
        position: 'relative',
        left: "600px"
    }

export{buttonStyle, divStyleMessageSent, divStyleMessageRec};