import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {CopyToClipboard} from 'react-copy-to-clipboard';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
        margin: theme.spacing(1),
      },
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
      width: 50,
      
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function LayoutTextFields() {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  const [url, setUrl] = useState('');
  const [link, setLink] = useState('')
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);


 

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setUrl(
        event.target.value
    );
  };

  const handleCopy = () =>{
      setCopied(true)
  }

  
      
  const handleClick=()=>{
      setCopied(false)
    const data= {
        "group_guid": "Bk3b5WdTwFC",    
        "domain": "bit.ly",
        "long_url": url
    }

   
    fetch('https://api-ssl.bitly.com/v4/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 86d4d16f4092e217ca951d2a37c0b22b01a5874e'
        },
        body: JSON.stringify(data),
    })
    .then((response)=> response.json())
    .then((data)=> {
        console.log('print data', data)
        setLink(data.link);
        setOpen(true)
    })
    .catch((error)=>{
        console.log('Error', error)
    })
}
console.log({val: link})
  return (
    <div className={classes.root}>
    <TextField
          id="outlined-full-width"
          value={url}  
          onChange={handleChange}
          style={{ margin: 100}}
          placeholder="Enter url"
          
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />

        <Button variant="contained" color="primary"   
            onClick={handleClick}
            margin="normal" style={{width: 350, margin: 'auto', padding: 10}}
        >
            Submit
        </Button>
    <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
       
          <p id="simple-modal-description">
           {link}
          </p>
          <CopyToClipboard text={link} onCopy = {handleCopy} 
        >
        <Button variant="contained" color="primary"   
            
            margin="normal" style={{width: 150, margin: 'auto', padding: 5}}
        >
            Copy Url
        </Button>
      
      </CopyToClipboard>
    
      {copied ? <span style={{color: 'red', padding: 25}}>Copied.</span> : null}
        </div>
        
      </Modal>  
      
    </div>
  );
}


