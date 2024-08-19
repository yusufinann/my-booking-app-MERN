/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage(){
    
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const handleLoginSubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4">Register</h1>
          <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="text"
                   placeholder="Your Name"
                   value={name}
                   onChange={e => setName(e.target.value)} />
            <input type="email"
                   placeholder="your@email.com"
                   value={email}
                   onChange={e => setEmail(e.target.value)} />
            <input type="password"
                   placeholder="password"
                   value={password}
                   onChange={e => setPassword(e.target.value)} />
            <button className="primary">Register</button>
            <div className="text-center py-2 text-gray-500">
              Do you have an account yet? <Link className="underline text-black" to={'/login'}>Login now</Link>
            </div>
          </form>
        </div>
      </div>
    )
}