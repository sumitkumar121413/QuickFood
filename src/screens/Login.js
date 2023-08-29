import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'


export default function Login() {

   let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }

     if (json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    } 
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
        </form>
      </div>
    </div>
  )
}
