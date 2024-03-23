import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const NavBar = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  async function onLogoutClick() {
    await signOut();
    navigate("/");
  }

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
        <li className="mr-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        {user && (
          <ul className="flex items-center">
            <li className="text-white pr-4">{user?.signInDetails?.loginId}</li>
            <li>
              <button
                onClick={onLogoutClick}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
