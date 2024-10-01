import logo from "./logo.png";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center py-0 px-8 bg-transparent backdrop-filter backdrop-blur-md text-black mb-8">
      <div className="flex items-center space-x-4">
        {/* Logo and website name */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Website Logo" className="h-11 w-13 mr-1 hover:text-gray-200" />
          <span className="text-xl font-bold">Bloggy</span>
        </a>
      </div>
      <ul className="flex justify-center space-x-4">
        <li>
          <a href="/" className="text-black hover:text-gray-200">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="text-black hover:text-gray-200">
            About
          </a>
        </li>
        <li>
          <a href="/articles" className="text-black hover:text-gray-200">
            Articles
          </a>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        <button className="text-sm bg-teal-400 hover:bg-teal-300 text-black px-4 py-2 rounded">
          Log In
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
