import React from 'react'
import axios from 'axios'
import{Link} from 'react-router-dom'

export default class ContactsList extends React.Component{

constructor(props){
    super(props)
    this.state={
        contacts:[]
    }
}
    componentDidMount(){
        axios.get('http://localhost:3005/contacts',{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response)
            const contacts=response.data
            this.setState({contacts})

        })
        .catch((err)=>{
            console.log(err)
        })
    }


    handleRemove=(id)=>{
        axios.delete(`http://localhost:3005/contacts/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            this.setState(prevState=>({
                contacts: prevState.contacts.filter(contact=> contact._id!==id)
            }))
        })
    }

    render(){
        return(
            <div>
                <h2>listing Saved Contacts - {this.state.contacts.length}</h2>
               
                <table border="1">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>phone</th>
                            <th>email</th>
                            <th>action</th>
                            
                        </tr>

                    </thead>
                    <tbody>
                       {
                           this.state.contacts.map((contact)=>{
                               return(
                                   <tr key={contact._id}>
                                       <td><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></td>
                                       <td>{contact.phone}</td>
                                       <td>{contact.email}</td>  
                                       <td>
                                           <Link to={`/contacts/${contact._id}`}>Show</Link>
                                           <button onClick={()=>{
                                               const confirmRemove=window.confirm('Are you Sure')
                                               if(confirmRemove){
                                                this.handleRemove(contact._id)
                                               }
                                               
                                           }}>Remove</button>
                                        </td>  

                                   </tr>
                               )
                           })
                       }
                    </tbody>
    
                </table>
               
                <Link to="/contacts/new/">add a new Contact</Link>
            </div>
        )
    }
}