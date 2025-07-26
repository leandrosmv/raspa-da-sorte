export default function Painel() {
  // Dados simulados
  const creditos = 10;
  const historico = [
    { data: "2024-06-01", premio: "R$ 10,00" },
    { data: "2024-05-30", premio: null },
    { data: "2024-05-29", premio: "R$ 5,00" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300 font-sans">
      <div className="w-full max-w-md bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6">Painel do Usuário</h1>
        <div className="mb-4 text-yellow-800 font-semibold">Créditos: {creditos}</div>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full mb-6 transition">Adquirir créditos</button>
        <h2 className="text-xl font-bold text-yellow-700 mb-2">Histórico de Prêmios</h2>
        <ul className="w-full">
          {historico.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center border-b border-yellow-200 py-2 text-yellow-800">
              <span>{item.data}</span>
              <span>{item.premio ? item.premio : "-"}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 