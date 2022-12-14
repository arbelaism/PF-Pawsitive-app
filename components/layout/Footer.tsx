import { NextComponentType } from "next";
import Link from "next/link";
import styles from "styles/Footer.module.css";
import { BsGithub } from "react-icons/bs";

const Footer: NextComponentType = () => {
   
  return (
    <>
      <footer className="w-[100%] text-center text-pwgreen-50 bg-pwgreen-500">
        <div className="w-[100%] flex justify-between items-center m-0 py-0 px-4">
          <div className="flex items-center flex-shrink-0 text-2xl ease-in">
            <Link href={"/"}>
              <a >
                <span className="font-thin hover:text-pwpurple-700 ease-in duration-400">Paw</span>
                <span className="font-black hover:text-pwpurple-400 ease-in duration-200">sitive</span>
              </a>
            </Link>
          </div>
          <div className="capitalize text-pwgreen-50 w-[45%]">
            <p>@ Copyright 2022 Pawsitive App. Todos los derechos reservados</p>
          </div>
          <div className="flex justify-end items-center w-[20%] py-2 lg:p-4">
            <ul className="text-pwgreen-50 capitalize flex flex-col lg:flex-row lg:gap-4">
              <li className="hover:text-pwpurple-700 ease-in duration-200 lg:hover:font-bold ">
                <Link href={"/contact"}>
                  <a>Contacto</a>
                </Link>
              </li>
              <li className="hover:text-pwpurple-700 ease-in duration-200 lg:hover:font-bold">
                <Link href={"/about"}>
                  <a>About</a>
                </Link>
              </li>
              <li className="bg-pwgreen-700 py-1 rounded-full px-2 hover:bg-pwpurple-700 ease-in duration-200 hover:pl-9 lg:w-16 lg:hover:pl-10">
                <Link
                  href="https://github.com/arbelais/PF-Pawsitive-app.git"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <a>
                    <BsGithub />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
