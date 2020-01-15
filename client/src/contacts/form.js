import React from 'react'
// import axios from 'axios'


export default class ContactsForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.name?props.name:'',
            phone:props.phone?props.phone:'',
            email:props.email?props.email:''                   
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            phone:this.state.phone,
            email:this.state.email
            
        }
        this.props.handleSubmit(formData)
    }

    render(){
        return(
            <div>
               
                <form onSubmit={this.handleSubmit}>
                    <label>
                        name
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                    </label><br/>
                    <label>
                        phone
                        <input type="text" value={this.state.phone} onChange={this.handleChange} name="phone"/>
                    </label><br/>
                    <label>
                        email
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email"/>
                    </label><br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}