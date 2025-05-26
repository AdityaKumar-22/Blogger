import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })    
    }
  return <button className='cursor-pointer inline-block px-6 py-2 duration-200 hover:text-[#b0b0a5]' onClick={logoutHandler} >Logout</button>; 
}

export default LogoutBtn
