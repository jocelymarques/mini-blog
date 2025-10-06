'use client';

import { useRequireAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user, loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Meu Perfil
          </h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome de Exibição
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {user.displayName || 'Não informado'}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {user.email}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Última Verificação
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {user.metadata.lastSignInTime 
                  ? new Date(user.metadata.lastSignInTime).toLocaleString('pt-BR')
                  : 'Não disponível'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}