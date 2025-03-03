import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData,setFormData] = useState({})
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e) =>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true)
        const res = await fetch('/api/auth/signup', 
          {
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
          }
        );
        const data = await res.json();
        console.log(data);
        if(data.success===false){
        console.log('error from api ');
          setError(data.message)
          setLoading(false)
          return;
        } 
        setLoading(false)
        setError(null)
        console.log('data from api');
        navigate('/sign-in')
      } catch (error) {
        setLoading(false)
        setError(error.message)
        console.log('data client',error);
      }
      
    }

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="User name"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 p-3 rounded-lg text-white hover:opacity-95 disabled:opacity-85 uppercase ">
          {loading ? 'Loading...':'Sign Up'}
          </button>
          <OAuth/>
      </form>
      <div className="flex gap-3 mt-2">
        <p>Have an account?</p>
        <Link to={'/sign-in'} className="text-blue-700">Sign In</Link>
      </div>
      {error && <p className="text-red-700 mt-3">{error}</p>}
    </div>
  );
}
