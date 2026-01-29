// API Base URL
const API_BASE_URL = 'http://localhost:8080';

// API Endpoints
const API = {
    cidades: `${API_BASE_URL}/cidades`,
    bairros: `${API_BASE_URL}/bairros`,
    tiposCrime: `${API_BASE_URL}/tipos-crime`,
    comunicantes: `${API_BASE_URL}/comunicantes`,
    enderecos: `${API_BASE_URL}/enderecos`,
    ocorrencias: `${API_BASE_URL}/ocorrencias`
};

// Generic API Functions
async function fetchData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        showAlert('Erro ao carregar dados. Verifique se a API está rodando.', 'error');
        return [];
    }
}

async function postData(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar registro:', error);
        showAlert('Erro ao criar registro.', 'error');
        throw error;
    }
}

async function putData(endpoint, id, data) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar registro:', error);
        showAlert('Erro ao atualizar registro.', 'error');
        throw error;
    }
}

async function deleteData(endpoint, id) {
    try {
        const response = await fetch(`${endpoint}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return true;
    } catch (error) {
        console.error('Erro ao deletar registro:', error);
        showAlert('Erro ao deletar registro.', 'error');
        return false;
    }
}

// Specific API calls
const CidadeAPI = {
    getAll: () => fetchData(API.cidades),
    create: (data) => postData(API.cidades, data),
    update: (id, data) => putData(API.cidades, id, data),
    delete: (id) => deleteData(API.cidades, id)
};

const BairroAPI = {
    getAll: () => fetchData(API.bairros),
    create: (data) => postData(API.bairros, data),
    update: (id, data) => putData(API.bairros, id, data),
    delete: (id) => deleteData(API.bairros, id)
};

const TipoCrimeAPI = {
    getAll: () => fetchData(API.tiposCrime),
    create: (data) => postData(API.tiposCrime, data),
    update: (id, data) => putData(API.tiposCrime, id, data),
    delete: (id) => deleteData(API.tiposCrime, id)
};

const ComunicanteAPI = {
    getAll: () => fetchData(API.comunicantes),
    create: (data) => postData(API.comunicantes, data),
    update: (id, data) => putData(API.comunicantes, id, data),
    delete: (id) => deleteData(API.comunicantes, id)
};

const EnderecoAPI = {
    getAll: () => fetchData(API.enderecos),
    create: (data) => postData(API.enderecos, data),
    update: (id, data) => putData(API.enderecos, id, data),
    delete: (id) => deleteData(API.enderecos, id)
};

const OcorrenciaAPI = {
    getAll: () => fetchData(API.ocorrencias),
    create: (data) => postData(API.ocorrencias, data),
    update: (id, data) => putData(API.ocorrencias, id, data),
    delete: (id) => deleteData(API.ocorrencias, id)
};
