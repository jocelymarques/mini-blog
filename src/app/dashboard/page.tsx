'use client';

import ProtectedRoute from "../components/ProtectedRoute";
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

export default function Dashboard() {
  const { user } = useAuthValue();
  const { logout, loading } = useAuthentication();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Dashboard
            </h1>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Bem-vindo, {user?.displayName || user?.email}!
              </h2>
              <p className="text-gray-600">
                Esta é uma área protegida. Apenas usuários autenticados podem acessar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Seus Posts</h3>
                <p className="text-blue-600">Gerencie seus artigos</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800">Estatísticas</h3>
                <p className="text-green-600">Veja suas métricas</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800">Configurações</h3>
                <p className="text-purple-600">Ajuste suas preferências</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={logout}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-4 py-2 rounded-md transition-colors"
              >
                {loading ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}