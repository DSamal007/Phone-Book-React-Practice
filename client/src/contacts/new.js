import React from 'react'
import ContactsForm from "./form"
import axios from 'axios'

export default class ContactsNew extends React.Component{
    
handleSubmit=(formData)=>{
    console.log('codin new',formData )

    axios.post('http://localhost:3005/contacts',formData,{

        headers:{
            "x-auth":localStorage.getItem('authToken')
        }
    })
    .then((response)=>{
        console.log(response)
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.errors.message)
        }else{
            const contact=response.data
            this.props.history.push(`/contacts/${contact._id}`)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

    render(){
        return(
            <div>
                <h2>add Contact</h2>
                <ContactsForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}