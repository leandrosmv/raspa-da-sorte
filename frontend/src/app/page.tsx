export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300 flex flex-col items-center font-sans">
      {/* Cabeçalho */}
      <header className="w-full flex justify-between items-center p-4 bg-white/80 shadow-md">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" width={48} height={48} />
          <span className="text-2xl font-bold text-yellow-700">Raspa da Sorte</span>
        </div>
        <nav className="flex gap-4">
          <a href="#como-jogar" className="text-yellow-700 font-semibold hover:underline">Como jogar</a>
          <a href="#premios" className="text-yellow-700 font-semibold hover:underline">Prêmios</a>
          <a href="#login" className="text-yellow-700 font-semibold hover:underline">Entrar</a>
        </nav>
      </header>

      {/* Hero / Chamada principal */}
      <section className="flex flex-col items-center justify-center flex-1 w-full max-w-2xl text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-800 mb-4 drop-shadow-lg">Raspe e ganhe prêmios instantâneos!</h1>
        <p className="text-lg sm:text-xl text-yellow-900 mb-8">Experimente a sorte agora mesmo. Cadastre-se, compre créditos e jogue raspadinhas online com prêmios reais!</p>
        <a href="#login" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition">Quero jogar agora</a>
      </section>

      {/* Área de login/cadastro */}
      <section id="login" className="w-full max-w-md bg-white/90 rounded-xl shadow-lg p-8 mb-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">Entrar ou cadastrar</h2>
        <form className="flex flex-col gap-4 w-full">
          <input type="email" placeholder="Seu e-mail" className="border border-yellow-300 rounded px-4 py-2 focus:outline-yellow-500" />
          <input type="password" placeholder="Senha" className="border border-yellow-300 rounded px-4 py-2 focus:outline-yellow-500" />
          <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded transition">Entrar</button>
        </form>
        <p className="mt-4 text-sm text-yellow-800">Não tem conta? <a href="#" className="underline font-semibold">Cadastre-se</a></p>
      </section>

      {/* Rodapé */}
      <footer className="w-full text-center py-4 bg-yellow-200 text-yellow-800 font-medium shadow-inner">
        © {new Date().getFullYear()} Raspa da Sorte. Todos os direitos reservados.
      </footer>
    </div>
  );
}
