import React from"react"
import ContactsForm from "./form"
import axios from 'axios'


export default class ContactsEdit extends React.Component{
    constructor(props){
        super(props)
        this.state={
            contact:{}
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`http://localhost:3005/contacts/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response)
            const contact = response.data
            this.setState({contact})
        })
    }
    handleSubmit=(formData)=>{
        console.log('codin new',formData )
        axios.put(`http://localhost:3005/contacts/${this.state.contact._id}`,formData,{
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
        return (
            <div>
                <h3><b>Edit contact details {this.state.contact.name}</b></h3>               
                   
                
                {
                       Object.keys(this.state.contact).length!==0 && <ContactsForm {...this.state.contact} handleSubmit={this.handleSubmit}/>
                }
            </div>
        )
    }
}