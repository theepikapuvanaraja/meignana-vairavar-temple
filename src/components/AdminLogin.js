import { useState } from "react";

function AdminLogin({setAuth}){

const [user,setUser]=useState("");
const [pass,setPass]=useState("");


const login=()=>{

if(user==="TempleOwner" && pass==="KNAga@mey12/"){

setAuth(true);

}

else{

alert("Wrong Username or Password");

}

}



return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}>


<div style={{
width:"350px",
padding:"30px",
boxShadow:"0 0 20px gray",
textAlign:"center"
}}>


<h2>
🛕 Admin Login
</h2>


<input

placeholder="Username"

onChange={(e)=>setUser(e.target.value)}

style={{
padding:"10px",
margin:"10px",
width:"90%"
}}

/>


<input

type="password"

placeholder="Password"

onChange={(e)=>setPass(e.target.value)}

style={{
padding:"10px",
margin:"10px",
width:"90%"
}}

/>



<button

onClick={login}

style={{
padding:"10px 30px"
}}

>

Login

</button>


</div>


</div>


)


}


export default AdminLogin;