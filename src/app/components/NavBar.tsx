"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, loading: authLoading } = useAuthValue();
    const { logout, loading: logoutLoading } = useAuthentication();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Mini Blog
                    </span>
                </Link>
                <button 
                    onClick={toggleMenu}
                    type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                    aria-controls="navbar-default" 
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link 
                                href="/" 
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/about" 
                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sobre
                            </Link>
                        </li>
                        
                        {!authLoading && (
                            <>
                                {user ? (
                                    <>
                                        <li>
                                            <Link 
                                                href="/dashboard" 
                                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                href="/create-post" 
                                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Criar Post
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                href="/profile" 
                                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Perfil
                                            </Link>
                                        </li>
                                        <li>
                                            <span className="block py-2 px-3 text-gray-600 text-sm md:p-0 dark:text-gray-400">
                                                Olá, {user.displayName || user.email}
                                            </span>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={handleLogout}
                                                disabled={logoutLoading}
                                                className="block py-2 px-3 text-red-600 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-red-400 md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent disabled:opacity-50"
                                            >
                                                {logoutLoading ? 'Saindo...' : 'Sair'}
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link 
                                                href="/login" 
                                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link 
                                                href="/register" 
                                                className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Cadastrar
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
