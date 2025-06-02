import useAuthStore from "../store/useAuthStore.js";

const Setting = () => {
  const {logout} = useAuthStore();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  }

   return (
      <div className="container mx-auto px-4 py-16">
        <h1>Setting</h1>
        <p>Setting page content goes here.</p>
        <button className="btn" onClick={handleLogout} >Logout</button>
      </div>
   );
}

export default Setting;