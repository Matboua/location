// import { Link } from "react-router-dom";

import { faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCarOn, faEnvelope, faPaperPlane, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="bg-white dark:bg-gray-900 dark:text-gray-300 text-gray-900 px-14 py-4">
                <div className="container px-4 mx-auto">
                    <div className="-mx-4 flex flex-wrap justify-between">
                        {/* First */}
                        <div className="px-4 my-5 w-full xl:w-1/4">
                            <Link href="/" className="block w-56 mb-8 text-3xl">
                                <FontAwesomeIcon className="text-blue-600" icon={faCarOn}/> Cavoy
                            </Link>
                            <p className="text-justify">
                            At Carvoy, we pride ourselves on offering top-notch car rental services tailored to meet your needs. Located in the heart of Agadir, we provide seamless pick-up services across all of Morocco.
                            </p>
                        </div>
                        {/* Second */}
                        <div className="px-4 my-4 w-full sm:w-auto">
                            <div>
                            <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Our Pages</h2>
                            </div>
                            <ul className="leading-8">
                            <li><Link href="/" className="hover:text-blue-400">Home Page</Link></li>
                            <li><Link href="/cars" className="hover:text-blue-400">Cars & Vehicles</Link></li>
                            <li><Link href="/articles" className="hover:text-blue-400">Articles Page</Link></li>
                            <li><Link href="/admin/cars" className="hover:text-blue-400">Login Page</Link></li>
                            </ul>
                        </div>
                        {/* Third */}
                        <div className="px-4 my-4 w-full sm:w-auto">
                            <div>
                            <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Privacy Pages</h2>
                            </div>
                            <ul className="leading-8">
                            <li><Link href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link></li>
                            <li><Link href="/terms-and-conditions" className="hover:text-blue-400">Terms &amp; Conditions</Link></li>
                            <li><Link href="/about-us" className="hover:text-blue-400">About Us</Link></li>
                            <li><Link href="/contact-us" className="hover:text-blue-400">Contact Us</Link></li>
                            </ul>
                        </div>
                        {/* Fourth */}
                        <div className="px-4 flex flex-col gap-5 my-4 w-full sm:w-auto xl:w-1/4">
                            {/* Title */}
                            <div>
                                <h2 className="inline-block text-2xl pb-4 border-b-4 border-blue-600">Stay Connected</h2>
                            </div>
                            {/* Social Media */}
                            <div className="flex gap-3">
                                <a href="https://www.linkedin.com/in/matboua/" target="_blank" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="https://www.linkedin.com/in/matboua/" target="_blank" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                    <FontAwesomeIcon icon={faX} />
                                </a>
                                <a href="https://www.linkedin.com/in/matboua/" target="_blank" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a href="https://www.linkedin.com/in/matboua/" target="_blank" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a href="https://www.linkedin.com/in/matboua/" target="_blank" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
                                <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </div>
                            {/* Subscribe */}
                            <form className="relative w-full" onSubmit={(e)=>{e.preventDefault()}}>
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                </div>
                                <input className="p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-0 focus:border-blue-600" placeholder="Enter your email" type="email" required="" />
                                <button type="submit" className="absolute right-0 top-[50%] mr-[6px] w-9 h-9 rounded-lg bg-blue-600 text-white cursor-pointer" style={{transform:"translateY(-50%)"}}>
                                    <FontAwesomeIcon icon={faPaperPlane} size="sm"/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Footer */}
            <div className="bg-blue-600 dark:bg-gray-950 text-gray-100  px-14 py-3">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap justify-between">
                        <div className="px-4 w-full text-center sm:w-auto sm:text-left">
                            {`Copyright © 2024 - ${new Date().getFullYear()} Carvoy. All Rights Reserved.`}
                        </div>
                        <div className="px-4 w-full text-center sm:w-auto sm:text-left">
                            Made with 💙 by <a className="font-medium" target="_blank" href="https://www.linkedin.com/in/matboua/">Matboua</a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}