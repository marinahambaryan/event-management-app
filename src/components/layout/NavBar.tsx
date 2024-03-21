import { useAtom } from "jotai";
import { Link, useNavigate } from "react-router-dom";
import { userAtom } from "../../atoms/userAtom";

const NavBar = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
        <li className="mr-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        {user ? (
          <li>
            <button
              onClick={onLogoutClick}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </li>
        ) : (
          <ul className="flex justify-between items-center">
            <li className="mr-4">
              <Link to="/signIn" className="text-white hover:text-gray-300">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/signUp" className="text-white hover:text-gray-300">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
