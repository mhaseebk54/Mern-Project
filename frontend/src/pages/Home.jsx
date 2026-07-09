import { signInWithPopup } from 'firebase/auth'
import {auth,googleprovider} from '../../utilis/firebase.js'
import api from '../../utilis/axios.js'
export default function Home() {

  const handleLogin = async(token)=>{
    try {
      const {data} = await api.post('/auth/login',{token},)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const googlelogin = async()=>{
  const data = await signInWithPopup(auth,googleprovider)
  const token = await data.user.getIdToken()
  console.log(token)
  await handleLogin(token)
  console.log(data)
  }
  

  return (
    <div>
          <div className='bg-black w-screen h-screen flex items-center-safe justify-center'>
<button className='bg-white txt-blue p-2 rounded-md w-50' onClick={googlelogin}>
  Continue
  </button>

      </div>
    </div>
  )
}
