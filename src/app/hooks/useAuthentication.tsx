import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { app } from '../firebase/config';

export const useAuthentication = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    //cleanup
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data: { email: string; password: string; displayName: string }) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, { displayName: data.displayName });

            setLoading(false);

            return user;
        } catch (error: unknown) {
            console.log(error instanceof Error ? error.message : 'Unknown error');
            let systemErrorMessage;
            const errorMessage = error instanceof Error ? error.message : '';
            if (errorMessage.includes('Password')) {
                systemErrorMessage = 'A senha precisa ter pelo menos 6 caracteres.';
            } else if (errorMessage.includes('email-already')) {
                systemErrorMessage = 'E-mail já cadastrado.';
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    const login = async (data: { email: string; password: string }) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error: unknown) {
            let systemErrorMessage;
            const errorMessage = error instanceof Error ? error.message : '';
            
            if (errorMessage.includes('invalid-credential')) {
                systemErrorMessage = 'E-mail ou senha incorretos.';
            } else if (errorMessage.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado.';
            } else if (errorMessage.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta.';
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    const logout = async () => {
        checkIfIsCancelled();

        setLoading(true);

        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { auth, createUser, login, logout, error, loading };
};