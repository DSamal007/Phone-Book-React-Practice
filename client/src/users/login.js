import React from 'react'
import axios from 'axios'


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={           
            email:'',
            password:''

        }
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        
        const formData={
            
            email:this.state.email,
            password:this.state.password
        }
        
        axios.post('http://localhost:3005/users/login',formData)
        .then((response)=>{
            if(response.data.error){
                alert(response.data.error)
            }else{
                const token=response.data.token
                localStorage.setItem('authToken',token)
                alert('successfully logged in')
                this.props.history.push('/')
                window.location.reload()
               
            }
        })

        .catch((err)=>{
            console.log(err)
        })

    }

 

    handleChange=(e)=>{       
        this.setState({
            [e.target.name]:e.target.value
        })

    }

    render(){
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                
                <label>
                    email
                    <input type="text"value={this.state.email} onChange={this.handleChange} name="email"/>                    
                </label><br/>
                <label>
                    password
                    <input type="password"value={this.state.passwprd} onChange={this.handleChange} name="password"/>                    
                </label><br/>               
                <input type="submit"/>
                </form>

            </div>
        )
    }
}
export default Login