'use client';
import React, { useState } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import { useRedirectIfAuthenticated } from '../hooks/useAuth';
import Link from 'next/link';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);

    const { createUser, error: authError, loading } = useAuthentication();
    
    useRedirectIfAuthenticated('/dashboard');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (password !== repeatPassword) {
            setErrorPassword(true);
            return;
        }
        
        setErrorPassword(false);
        await createUser({ email, password, displayName: username });
    };

    return (
        <div className="w-full max-w-sm mx-auto p-4 mt-20 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                Registrar
            </h1>
            
            {(errorPassword || authError) && (
                <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md">
                    {errorPassword ? 'As senhas não coincidem!' : authError}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nome do usuário
                    </label>
                    <input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        type="text" 
                        id="username" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Seu nome de usuário" 
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Seu email
                    </label>
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        id="email" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="seu@email.com" 
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Sua senha
                    </label>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        type="password" 
                        id="password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="••••••••"
                        required 
                    />
                </div>
                
                <div>
                    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Repita a senha
                    </label>
                    <input 
                        value={repeatPassword} 
                        onChange={(e) => setRepeatPassword(e.target.value)} 
                        type="password" 
                        id="repeat-password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="••••••••"
                        required 
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
                >
                    {loading ? 'Registrando...' : 'Registrar nova conta'}
                </button>
                
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                    Já tem uma conta? <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Fazer login</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;