"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authAPI, gameAPI, utils } from "../../services/api";

export default function Jogo() {
  const [raspado, setRaspado] = useState(false);
  const [premio, setPremio] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const loadUserData = useCallback(async () => {
    try {
      const userData = await authAPI.getUser();
      setUser(userData);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      authAPI.logout();
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    // Verificar se está logado
    if (!authAPI.isAuthenticated()) {
      router.push("/login");
      return;
    }

    // Carregar dados do usuário
    loadUserData();
  }, [loadUserData, router]);

  const handleRaspar = async () => {
    if (!user || user.credits < 1) return;

    setLoading(true);
    setError("");

    try {
      const result = await gameAPI.play();
      setRaspado(true);
      setPremio(result.prize);
      setUser(result.user);
    } catch (error) {
      setError(error.message || "Erro ao jogar");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRaspado(false);
    setPremio(null);
  };

  const handlePurchaseCredits = async (credits, amount) => {
    setLoading(true);
    setError("");

    try {
      const result = await gameAPI.purchaseCredits(credits, amount);
      setUser(result.user);
    } catch (error) {
      setError(error.message || "Erro ao comprar créditos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Logo" width={40} height={40} />
            <span className="text-2xl font-bold text-yellow-700">Raspa da Sorte</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600">Saldo</div>
              <div className="text-xl font-bold text-green-600">{utils.formatCurrency(user.balance)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Créditos</div>
              <div className="text-xl font-bold text-blue-600">{user.credits}</div>
            </div>
            <Link href="/painel" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
              Painel
            </Link>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Raspadinha da Sorte</h1>
          <p className="text-white text-lg">Raspe e descubra se você é o próximo ganhador!</p>
        </div>

        {error && (
          <div className="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Área do Jogo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Sua Raspadinha</h2>
                <p className="text-gray-600">Clique em &quot;Raspar&quot; para jogar</p>
              </div>
              
              {/* Área da Raspadinha */}
              <div className="flex justify-center mb-6">
                <div className="w-80 h-48 bg-gradient-to-br from-yellow-200 to-yellow-300 border-4 border-yellow-500 rounded-xl flex items-center justify-center text-2xl font-bold text-yellow-800 relative overflow-hidden shadow-lg">
                  {!raspado ? (
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎫</div>
                      <div className="text-lg opacity-70">Clique para raspar</div>
                    </div>
                  ) : premio ? (
                    <div className="text-center animate-bounce">
                      <div className="text-4xl mb-2">🎉</div>
                      <div className="text-3xl font-extrabold text-green-600">{utils.formatCurrency(premio)}</div>
                      <div className="text-lg text-green-700">Parabéns!</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-2">😔</div>
                      <div className="text-xl text-gray-600">Tente novamente!</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRaspar}
                  disabled={raspado || user.credits <= 0 || loading}
                  className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition disabled:cursor-not-allowed"
                >
                  {loading ? "Processando..." : raspado ? "Jogar Novamente" : "Raspar"}
                </button>
                {raspado && (
                  <button
                    onClick={handleReset}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
                  >
                    Nova Raspadinha
                  </button>
                )}
              </div>

              {user.credits <= 0 && (
                <div className="text-center mt-4">
                  <div className="text-red-600 font-semibold mb-2">Sem créditos!</div>
                  <button 
                    onClick={() => handlePurchaseCredits(10, 5)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow transition"
                  >
                    Comprar Créditos
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Comprar Créditos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Comprar Créditos</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => handlePurchaseCredits(10, 5)}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                  10 Créditos - R$ 5,00
                </button>
                <button 
                  onClick={() => handlePurchaseCredits(25, 10)}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                  25 Créditos - R$ 10,00
                </button>
                <button 
                  onClick={() => handlePurchaseCredits(50, 18)}
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition"
                >
                  50 Créditos - R$ 18,00
                </button>
              </div>
            </div>

            {/* Prêmios Recentes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Prêmios Recentes</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">João S.</span>
                  <span className="font-bold text-green-600">R$ 50,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Maria L.</span>
                  <span className="font-bold text-green-600">R$ 25,00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Pedro M.</span>
                  <span className="font-bold text-green-600">R$ 100,00</span>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Estatísticas</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total de jogadores:</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prêmios pagos hoje:</span>
                  <span className="font-bold text-green-600">R$ 2,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maior prêmio:</span>
                  <span className="font-bold text-green-600">R$ 500,00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 