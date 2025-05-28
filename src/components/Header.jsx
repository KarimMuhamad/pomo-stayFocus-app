import { Link, NavLink } from "react-router";
import getColorName from "../utils/getColorName.js";
import useAuthStore from "../store/useAuthStore.js";

const Header = () => {
   const {user, login} = useAuthStore();
   const getColor = user ? getColorName(user.data.username) : 'hsl(0, 0%, 50%)';

   return (
      <div className="fixed w-full justify-around items-center bg-transparent backdrop-blur-md py-2 px-10 shadow-md">
         <div className="flex items-center justify-between">
            <div className="flex items-center">
               <span className="ml-2 text-lg font-bold text-white">Pomo Timer</span>
            </div>
            <div className="flex space-x-4 items-center">
               <NavLink to="/" className="text-white hover:text-gray-300">HOME</NavLink>
               <NavLink to="/stats" className="text-white hover:text-gray-300">STATISTIC</NavLink>
            </div>
            <div className="flex items-center space-x-4">
               {
                  user ? (<Link to='/setting' className="w-10 h-10 bg-gray-800/35 rounded-full border-1 border-gray-600 flex items-center justify-center" style={{backgroundColor: getColor}}>
                     <span className="font-semibold">{user.data.username.charAt(0).toUpperCase()}</span>
                  </Link>) : (<Link to='/login'>
                     <button onClick={login} className="btn btn-soft hover:btn-success h-10 rounded-full px-3.5">Login</button>
                  </Link>)
               }
            </div>
         </div>
      </div>
   )
}

export default Header;