import React from 'react';

import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'

import Home from './common/home'

import Register from './users/register'
import Login from './users/login'

import ContactsEdit from './contacts/edit'
import ContactsNew from './contacts/new'
import ContactsList from './contacts/list'
import ContactsShow from './contacts/show'

import Logout from './users/logout'

function App() {
  return (
    <BrowserRouter>
   <div>
     <h1>Contact Manager App</h1>
     <ul>
       <li><Link to = '/'>Home</Link></li>
       {
         localStorage.getItem('authToken')?(
           <div>
              <li><Link to="/contacts">Contacts</Link></li>            
              <li><Link to="/users/logout">logout</Link></li>
            </div>
         ):(
           <div>
             <li><Link to='/users/register'>Register</Link></li>
             <li><Link to='/users/login'>log in</Link></li>
           </div>
         )
       }
     </ul>
     <Switch>

            <Route path="/" component ={Home} exact={true}/>
            <Route path="/users/register" component ={Register}/>
            <Route path="/users/login" component ={Login}/>            
            <Route path="/users/logout" component ={Logout}/>

            <Route path = "/contacts" component ={ContactsList} exact={true}/>            
            <Route path="/contacts/new" component ={ContactsNew} />
            <Route path="/contacts/edit/:id" component ={ContactsEdit}/>
            <Route path="/contacts/:id" component ={ContactsShow}/>                      

            
</Switch>
     
   </div>
   </BrowserRouter>
  );
}

export default App;
