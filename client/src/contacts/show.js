import React from 'react'
import axios from 'axios'
import {Link }from 'react-router-dom'

export default class ContactsShow extends React.Component{
    constructor(){
        super()
        this.state={
            Contact:{}
        }
    }

    componentDidMount(){
        const id= this.props.match.params.id
        axios.get(`http://localhost:3005/contacts/${id}`,{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const Contact=response.data
            this.setState({Contact})
        })


    }
    render(){
        const {name,phone,email}=this.state.Contact
        const id= this.props.match.params.id

        return(
            <div>
                <h2>{name}-{phone}-{email}</h2>
                
                <Link to={`/contacts/edit/${id}`}>Edit</Link><br/>
                <Link to="/contacts">Back</Link>
            </div>
        )
    }
}