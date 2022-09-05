import { useEffect, useState } from 'react' ;
import jwt_decode from "jwt-decode" ;
import './App.css' ;
import axios from 'axios';




function App (){
    const [user, setUser] = useState({}) ;
    const [result, setResult] = useState(null);

    const chart = async () => {
      try{
         let res = await axios.get('')
         let result = res.data
         setResult(result)
      }
      catch(e)
      {
        console.log(e);
      }

      
    };

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token :" + response.credential);
       var userObject = jwt_decode(response.credential);
       console.log(userObject ) ;
       setUser (userObject);
       document.getElementById("signInDiv").hidden = true;
 }

    
     function handleSignOut(event){
       setUser({});
       document.getElementById("signInDiv").hidden = false ;
   }
  
  useEffect(() => {
  /* global google */
    google.accounts.id.initialize({
      client_id : "536807712640-ttljvqkekuhc88oc86h244narkitqsa4.apps.googleusercontent.com",
      callback : handleCallbackResponse
    });
  
    google.accounts.id.renderButton(
     document.getElementById("signInDiv") ,
     {theme: "outline", size: "large" }
  );

  }, []);

  //If we have no user: Sign In button
  //If we have a user: Show the log out button

  return(
    <div className="App">
      <div className='App-header'>
        
      <h1>React Login Page!!</h1> 
       
       <div id="signInDiv"></div>
        {user &&
         <div>
        
          <h3>{user.name}</h3>
          <img src={user.picture}></img>
         </div>
        } 
     {
        Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button> 
     }
      
      
      </div>
    </div>
  );

}

export default App
