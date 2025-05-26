import { Link } from "react-router-dom";
import Logo from "../Utility/Logo";

const Footer = () => {
  return (
    <section className="relative bottom-0 overflow-hidden py-10 text-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col text-left items-start"><Logo width="100px" /><p className="font-bold text-xl font-sans">BLOGGER</p></div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">  
              <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-gray-100">Company</h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium  hover:text-gray-100" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-gray-100">Support</h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    {" "}
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    {" "}
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    {" "}
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    {" "}
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xl font-semibold uppercase text-gray-100">Legals</h3>
              <ul>
                <li className="mb-4">
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    {" "}
                    Terms &amp; Conditions{" "}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    {" "}
                    Privacy Policy{" "}
                  </Link>
                </li>
                <li>
                  <Link className=" text-base font-medium hover:text-gray-100" to="/">
                    {" "}
                    Licensing{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="my-6 flex justify-center align-middle border-t-1"><p className="py-6 text-sm text-gray-200">&copy; Copyright 2025. All Rights Reserved by Blogger.</p></div>
      </div>
    </section>
  );

};

export default Footer;
