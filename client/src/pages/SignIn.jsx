import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector  } from "react-redux";
import { signInSuccess, signInFailure,signInStart } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData,setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleChange = (e) =>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // setLoading(true)
        dispatch(signInStart())
        const res = await fetch('/api/auth/signin', 
          {
            method: 'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
          }
        );
        const data = await res.json();
        console.log('handleSubmit',data);
        if(data.success===false){
          dispatch(signInFailure(data.message))
          return;
        } 
        // setLoading(false)
        // setError(null)
        dispatch(signInSuccess(data))
        navigate('/')
      } catch (error) {
        // setLoading(false)
        // setError(error.message)
        dispatch(signInFailure(data.message))
        console.log('data client',error);
      }
      
    }

  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
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
          {loading ? 'Loading...':'Sign In'}
          </button>
          <OAuth/>
      </form>
      <div className="flex gap-3 mt-2">
        <p>Dont have an account?</p>
        <Link to={'/sign-up'} className="text-blue-700">Sign Up</Link>
      </div>
      {error && <p className="text-red-700 mt-3">{error}</p>}
    </div>
  );
}
