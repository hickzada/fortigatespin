import React, { useState, useEffect } from 'react';
import { Search, LogOut, ArrowLeft } from 'lucide-react';
import companiesData from './data.json';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData.companies);
  const [error, setError] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<typeof companiesData.companies[0] | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'pinpoint' && password === '123Nvgm+$!PP') {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      setError('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleCompanyClick = (company: typeof companiesData.companies[0]) => {
    setSelectedCompany(company);
    setSearchTerm('');
  };

  const handleBackClick = () => {
    setSelectedCompany(null);
    setSearchTerm('');
  };

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      setFilteredCompanies([selectedCompany]);
    } else {
      const filtered = companiesData.companies.filter(company => {
        const matchCompany = company.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchUnit = company.units.some(unit => 
          unit.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchCompany || matchUnit;
      });
      setFilteredCompanies(filtered);
    }
  }, [searchTerm, selectedCompany]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
          <div className="text-center">
            <div className="flex justify-center">
              <img 
                src="https://i.ibb.co/Fw5z8RK/images-1.png" 
                alt="FortiGate Logo" 
                className="h-24 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h2 className="mt-8 text-3xl font-extrabold text-gray-900 tracking-tight">Portal FortiGate Clientes</h2>
            <p className="mt-3 text-sm text-gray-500">Acesse o portal de gerenciamento FortiGate</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            <div className="space-y-5">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Usuário
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-6">
              <img 
                src="https://i.ibb.co/tqW6w21/Logo-Pinpoint.png" 
                alt="Pinpoint Logo" 
                className="h-8 w-auto transform hover:scale-105 transition-transform duration-200"
              />
              <div className="h-8 w-px bg-gray-200" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Portal FortiGate Clientes
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {!selectedCompany && (
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm"
                placeholder="Buscar por empresa ou unidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {selectedCompany && (
            <button
              onClick={handleBackClick}
              className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para lista completa
            </button>
          )}

          <div className="space-y-8">
            {filteredCompanies.map((company) => (
              <div key={company.name} className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-200 hover:shadow-xl border border-gray-100">
                <div 
                  onClick={() => !selectedCompany && handleCompanyClick(company)}
                  className={`px-6 py-5 sm:px-8 flex items-center space-x-6 border-b border-gray-100 ${!selectedCompany ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                >
                  <img 
                    src={company.name === "Cidade Center Norte" 
                      ? "https://i.ibb.co/3f0fk1V/center-norte.png"
                      : "https://i.ibb.co/9TY5mjs/images.png"} 
                    alt={`${company.name} Logo`} 
                    className="h-10 w-auto transform hover:scale-105 transition-transform duration-200"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {company.name}
                  </h3>
                </div>
                <div className="px-6 py-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {company.units.map((unit) => (
                      <div
                        key={unit.name}
                        className="relative rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-semibold text-gray-900">{unit.name}</h4>
                            <a
                              href={unit.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                            >
                              Acessar
                              <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                          <p className="text-sm text-gray-500 flex-grow">{unit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {filteredCompanies.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-md">
                <p className="text-gray-500">Nenhuma empresa ou unidade encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            by Henrique Rodrigues 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;