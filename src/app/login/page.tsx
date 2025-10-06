'use client';

import { useState, FormEvent } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { useRedirectIfAuthenticated } from "../hooks/useAuth";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, loading } = useAuthentication();
    
    useRedirectIfAuthenticated('/');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <div className="w-full max-w-sm p-4 mt-48 mx-auto bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">Login Mini Blog</h5>
                
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md">
                        {error}
                    </div>
                )}
                
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        E-mail
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        placeholder="seu@email.com" 
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Senha
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                        required 
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                >
                    {loading ? 'Entrando...' : 'Acessar'}
                </button>
                
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                    Não registrado? <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Criar Usuário</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
