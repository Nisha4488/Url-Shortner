import React from 'react'
const fetch = require('node-fetch');

class Main extends React.Component{
    constructor(){
        super()
        this.state={
            url: '',
            link:''
            
        }
    }

    handleChange=(event)=>{
        this.setState({url:event.target.value});

    }

   
    
    handleClick=()=>{
        const data= {
            "group_guid": "Bk3b5WdTwFC",    
            "domain": "bit.ly",
            "long_url": this.state.url
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
            this.setState({link:data})
        })
        .catch((error)=>{
            console.log('Error', error)
        })
    }
    render(){
        return(
            <div>
            <input type="text" value={this.state.url}  onChange={this.handleChange}></input><br/>
            <button type="button" onClick={this.handleClick}>Submit</button>
            <p>The new Url is: {this.state.link.link}</p>
            </div>
        )
    }
}


export default Main