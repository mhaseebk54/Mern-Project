import { signInWithPopup } from 'firebase/auth'
import {auth,googleprovider} from '../../utilis/firebase.js'
import api from '../../utilis/axios.js'
import { FcGoogle } from "react-icons/fc";

export default function Home() {

  const handleLogin = async(token)=>{
    try {
      const {data} = await api.post('/api/auth/login',{token},)
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
    <div className='h-screen flex bg-black text-white overflow-hidden'>
      hello
             
          <div className='fixed inset-0 z-50 flex items-center bg-black/60 justify-center backdrop-blur'>
            <div className='w-[340px] bg-black border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
<h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>WelCome To Chatex AI</h2>
<p className='text-[13px] text-slate-500'>Please Login To Continue</p>
            </div>
<button className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black bg-white hover:bg-gray-500 hover:to-violet-600 transition-all duration-150 cursor-pointer'
 onClick={googlelogin}>
  <FcGoogle size={15} className='text-black' />
  Continue with Google
  </button>


            </div>

      </div>
    </div>
  )
}
