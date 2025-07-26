const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Função para fazer requisições à API
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro na requisição');
    }
    
    return data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
}

// Autenticação
export const authAPI = {
  // Registrar novo usuário
  register: async (userData) => {
    const response = await apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Fazer login
  login: async (credentials) => {
    const response = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  // Obter dados do usuário
  getUser: async () => {
    return await apiRequest('/user');
  },

  // Fazer logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar se está logado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Obter usuário atual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Jogo
export const gameAPI = {
  // Jogar raspadinha
  play: async () => {
    return await apiRequest('/game/play', {
      method: 'POST',
    });
  },

  // Comprar créditos
  purchaseCredits: async (credits, amount) => {
    return await apiRequest('/credits/purchase', {
      method: 'POST',
      body: JSON.stringify({ credits, amount }),
    });
  },
};

// Histórico
export const historyAPI = {
  // Obter prêmios
  getPrizes: async () => {
    return await apiRequest('/prizes');
  },

  // Obter transações
  getTransactions: async () => {
    return await apiRequest('/transactions');
  },
};

// Utilitários
export const utils = {
  // Formatar moeda
  formatCurrency: (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },

  // Formatar data
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  },
}; 