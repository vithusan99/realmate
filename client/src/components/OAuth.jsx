import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            console.log('efff',result);
            const res = await fetch('/api/auth/google',{
              method:'POST',
              headers:{
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify({ name: result.user.displayName, email: result.user.email, userImg: result.user.photoURL})
            })
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.log('could not connected with google!',error);
            
        }
    }
  return (
    <button type='button' onClick={handleGoogleAuth} className='bg-red-600 text-white rounded-lg p-3 uppercase hover:opacity-95' >Continue with Google</button>
  )
}
