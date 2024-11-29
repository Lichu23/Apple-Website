import { appleImg, bagImg, searchImg } from "../utils/index";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="px-7 py-4">
      <nav className="flex w-full screen-max-width items-center">
        <img src={appleImg} alt="Apple Image" width={18} height={18} />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((navItems) => (
            <div
              className="px-5 cursor-pointer text-gray hover:text-white transition-all max-sm:text-sm text-lg"
              key={navItems}
            >
              {navItems}
            </div>
          ))}
        </div>

        <div className="flex align-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="Search Icon" width={20} height={20} />
          <img src={bagImg} alt="Bag Icon" width={20} height={20} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
