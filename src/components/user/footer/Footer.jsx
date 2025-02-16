// import { Link } from "react-router-dom";

import { faFacebook, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <footer>
            <div className="bg-white dark:bg-gray-900 dark:text-gray-300 text-gray-900 px-14 py-4">
                <div className="container px-4 mx-auto">
                    <div className="-mx-4 flex flex-wrap justify-between">
                        {/* First */}
                        <div className="px-4 my-4 w-full xl:w-1/4">
                            <a href="/" className="block w-56 mb-10">
                            <svg version="1.1" viewBox="0 0 3368 512" xmlns="http://www.w3.org/2000/svg">
                                <g fill="none" fillRule="evenodd">
                                <g transform="translate(0 -75)">
                                    <g transform="translate(0 75)">
                                    <rect width="512" height="512" rx="128" fill="#3D5AFE"></rect>
                                    <rect x="149" y="176" width="220" height="220" fill="#fff"></rect>
                                    <circle cx="259" cy="156" r="40" fill="#fff"></circle>
                                    <circle cx="369" cy="286" r="40" fill="#2962FF"></circle>
                                    </g>
                                    <text fill="white" fontFamily="Nunito-Bold, Nunito" fontSize="512" fontWeight="bold">
                                    <tspan x="654" y="518">Carvoy</tspan>
                                    </text>
                                </g>
                                </g>
                            </svg>
                            </a>
                            <p className="text-justify">
                            Tailwindow is a collection of UI Components created using Tailwind CSS Framework. The UI Components gives you all of the building blocks you need to build any designs without any annoying opinionated styles you have to fight to override.
                            </p>
                        </div>
                        {/* Second */}
                        <div className="px-4 my-4 w-full sm:w-auto">
                            <div>
                            <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Company</h2>
                            </div>
                            <ul className="leading-8">
                            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400">Terms &amp; Conditions</a></li>
                            <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                            </ul>
                        </div>
                        {/* Third */}
                        <div className="px-4 my-4 w-full sm:w-auto">
                            <div>
                            <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Blog</h2>
                            </div>
                            <ul className="leading-8">
                            <li><a href="#" className="hover:text-blue-400">Getting Started With HTML and CSS</a></li>
                            <li><a href="#" className="hover:text-blue-400">What Is Flex And When to Use It?</a></li>
                            <li><a href="#" className="hover:text-blue-400">How TailwindCSS Can Help Your Productivity?</a></li>
                            <li><a href="#" className="hover:text-blue-400">5 Tips to Make Responsive Website</a></li>
                            <li><a href="#" className="hover:text-blue-400">See More</a></li>
                            </ul>
                        </div>
                        {/* Fourth */}
                        <div className="px-4 my-4 w-full sm:w-auto xl:w-1/4">
                            <div>
                                <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Connect With Us</h2>
                            </div>
                            <div className="flex gap-3">
                                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                    <FontAwesomeIcon icon={faX} />
                                </a>
                                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                <FontAwesomeIcon icon={faInstagram} />
                                </a>
                                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                                <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a href="#" className="inline-flex items-center justify-center h-8 w-8 border dark:border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
                                <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-950 text-gray-100  px-14 py-4">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap justify-between">
                        <div className="px-4 w-full text-center sm:w-auto sm:text-left">
                            {`Copyright © 2023 - ${new Date().getFullYear()} Carvoy. All Rights Reserved.`}
                        </div>
                        <div className="px-4 w-full text-center sm:w-auto sm:text-left">
                            Made with ❤️ by <a href="https://www.linkedin.com/in/matboua/">Matboua</a>.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}