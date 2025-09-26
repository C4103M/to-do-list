function Login() {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-1">Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-1">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
              <button
                type="submit"
                class=" py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Entre
              </button>
              <button
                type="submit"
                class=" py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Cadastre-se
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
