import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
const Login = () => {
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [show, setShow] = useState(false);
  
    const firebase = useFirebase();
    const navigate = useNavigate();
    
    useEffect(() => {
     if(firebase.isLoggedIn){
       navigate('/home')  
     } 
    }, [firebase,navigate])
    

    const handleChange = (e) => {
      if (e.target.type === "email") {
        setemail(e.target.value);
      } else {
        setpass(e.target.value);
      }
    };
    const handleSubmit = async(e) => {
      e.preventDefault();
      await firebase.loginWithUsernameAndPassword(email, pass).then(()=>{
        navigate('/home');
      }).catch((err)=>{
        alert(err.message);
      });
    }
  return (
    <>
     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login with Email!</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className='space-y-3 my-3'>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3" value={email} onChange={handleChange}/>
          </div>
        </div>
  
        <div className='space-y-3 my-3'>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2 flex justify-between w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3">
            <input id="password" name="password" type={show?"text":"password"} autoComplete="current-password" required className="mx-2 outline-none" value={pass} onChange={handleChange}/>
            <img src={show?'src\\assets\\closed-eye.svg':'src\\assets\\eye.svg'} className='cursor-pointer' onClick={()=>{setShow(!show)}}/>
          </div>
        </div>
  
        <div className='space-y-3 my-3'>
          <button type='submit' className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log IN</button>
        </div>
     </form>
     <span className='ml-20 text-sm text-red-600'>Don't have an Account?<span className='font-bold text-blue-600 cursor-pointer' onClick={()=>{navigate('/register')}}>&nbsp; Register</span></span>
     <p className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>OR</p>
    <button onClick={()=>{firebase.signInWithGoogle().then(()=>{navigate('/home').catch((err)=>{alert(err.message)})})}} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue with Google</button>
    </div>
  </div>
    </>
  )
}
 
export default Login