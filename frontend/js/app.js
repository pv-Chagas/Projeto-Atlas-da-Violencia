// Global state
let currentData = {
    cidades: [],
    bairros: [],
    tiposCrime: [],
    ocorrencias: []
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadDashboard();
    loadAllData();
});

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            switchSection(section);
            
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function switchSection(section) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.classList.remove('active'));
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
        
        switch(section) {
            case 'registrar-ocorrencia':
                carregarSelectsFormularioRegistro();
                break;
            case 'cidades':
                loadCidades();
                break;
            case 'bairros':
                loadBairros();
                break;
            case 'tipos-crime':
                loadTiposCrime();
                break;
            case 'ocorrencias':
                loadOcorrencias();
                break;
        }
    }
}

// Dashboard
async function loadDashboard() {
    try {
        const [cidades, bairros, tiposCrime, ocorrencias] = await Promise.all([
            CidadeAPI.getAll(),
            BairroAPI.getAll(),
            TipoCrimeAPI.getAll(),
            OcorrenciaAPI.getAll()
        ]);
        
        document.getElementById('total-cidades').textContent = cidades.length;
        document.getElementById('total-bairros').textContent = bairros.length;
        document.getElementById('total-tipos-crime').textContent = tiposCrime.length;
        document.getElementById('total-ocorrencias').textContent = ocorrencias.length;
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// Load all data
async function loadAllData() {
    currentData.cidades = await CidadeAPI.getAll();
    currentData.bairros = await BairroAPI.getAll();
    currentData.tiposCrime = await TipoCrimeAPI.getAll();
    currentData.ocorrencias = await OcorrenciaAPI.getAll();
}

// ==== REGISTRO COMPLETO DE OCORRÊNCIA ====
async function carregarSelectsFormularioRegistro() {
    // Carregar tipos de crime
    const selectTipoCrime = document.getElementById('reg-tipo-crime');
    selectTipoCrime.innerHTML = '<option value="">Selecione o tipo de crime</option>' +
        currentData.tiposCrime.map(t => `<option value="${t.id}">${t.nome}</option>`).join('');
    
    // Carregar cidades para ocorrência
    const selectCidadeOcorrencia = document.getElementById('reg-cidade-ocorrencia');
    selectCidadeOcorrencia.innerHTML = '<option value="">Selecione a cidade</option>' +
        currentData.cidades.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
    
    // Carregar cidades para comunicante
    const selectCidadeComunicante = document.getElementById('reg-cidade-comunicante');
    selectCidadeComunicante.innerHTML = '<option value="">Selecione a cidade</option>' +
        currentData.cidades.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
    
    // Carregar cidades para endereço
    const selectCidadeEndereco = document.getElementById('reg-cidade-endereco');
    selectCidadeEndereco.innerHTML = '<option value="">Selecione a cidade</option>' +
        currentData.cidades.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
    
    // Inicializar bairros vazios
    const selectBairroOcorrencia = document.getElementById('reg-bairro-ocorrencia');
    selectBairroOcorrencia.innerHTML = '<option value="">Selecione primeiro a cidade</option>';
    
    const selectBairroEndereco = document.getElementById('reg-bairro-endereco');
    selectBairroEndereco.innerHTML = '<option value="">Selecione primeiro a cidade</option>';
    
    // Event listeners para filtrar bairros por cidade
    selectCidadeOcorrencia.addEventListener('change', (e) => {
        filtrarBairrosPorCidade(e.target.value, selectBairroOcorrencia);
    });
    
    selectCidadeEndereco.addEventListener('change', (e) => {
        filtrarBairrosPorCidade(e.target.value, selectBairroEndereco);
    });
}

function filtrarBairrosPorCidade(cidadeId, selectBairro) {
    if (!cidadeId) {
        selectBairro.innerHTML = '<option value="">Selecione primeiro a cidade</option>';
        return;
    }
    
    const bairrosFiltrados = currentData.bairros.filter(b => b.cidade && b.cidade.id == cidadeId);
    
    if (bairrosFiltrados.length === 0) {
        selectBairro.innerHTML = '<option value="">Nenhum bairro encontrado</option>';
    } else {
        selectBairro.innerHTML = '<option value="">Selecione o bairro</option>' +
            bairrosFiltrados.map(b => `<option value="${b.id}">${b.nome}</option>`).join('');
    }
}

async function handleRegistroCompleto(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        // Passo 1: Criar Comunicante
        const comunicanteData = {
            nome: formData.get('nome'),
            envolvimento: formData.get('envolvimento'),
            nomeMae: formData.get('nomeMae'),
            nomePai: formData.get('nomePai') || null,
            dtNasc: formData.get('dtNasc'),
            estadoCivil: formData.get('estadoCivil'),
            etnia: formData.get('etnia'),
            sexo: formData.get('sexo'),
            cpf: formData.get('cpf'),
            nacionalidade: formData.get('nacionalidade'),
            cidade: { id: parseInt(formData.get('cidadeComunicante')) },
            telefone: formData.get('telefone'),
            email: formData.get('email') || null
        };
        
        showAlert('Cadastrando comunicante...', 'warning');
        const comunicante = await ComunicanteAPI.create(comunicanteData);
        
        // Passo 2: Criar Endereço do Comunicante
        const enderecoData = {
            uf: formData.get('ufEndereco'),
            cidade: { id: parseInt(formData.get('cidadeEndereco')) },
            bairro: { id: parseInt(formData.get('bairroEndereco')) },
            logradouro: formData.get('logradouroEndereco'),
            numero: formData.get('numeroEndereco'),
            cep: formData.get('cepEndereco'),
            complemento: formData.get('complementoEndereco') || null,
            pontoReferencia: formData.get('pontoReferenciaEndereco') || null,
            comunicante: { id: comunicante.id }
        };
        
        showAlert('Cadastrando endereço...', 'warning');
        await EnderecoAPI.create(enderecoData);
        
        // Passo 3: Criar Ocorrência
        const ocorrenciaData = {
            dataFato: formData.get('dataFato'),
            horaFato: formData.get('horaFato'),
            uf: formData.get('ufOcorrencia'),
            cidade: { id: parseInt(formData.get('cidadeOcorrencia')) },
            bairro: { id: parseInt(formData.get('bairroOcorrencia')) },
            tipoLocal: formData.get('tipoLocal'),
            descricaoFato: formData.get('descricaoFato'),
            comunicante: { id: comunicante.id },
            tipoCrime: { id: parseInt(formData.get('tipoCrime')) },
            cep: formData.get('cepOcorrencia') || null,
            logradouro: formData.get('logradouroOcorrencia') || null,
            numero: formData.get('numeroOcorrencia') || null,
            pontoReferencia: formData.get('pontoReferenciaOcorrencia') || null
        };
        
        showAlert('Registrando ocorrência...', 'warning');
        await OcorrenciaAPI.create(ocorrenciaData);
        
        showAlert('✅ Ocorrência registrada com sucesso! Comunicante, endereço e ocorrência foram salvos.', 'success');
        form.reset();
        loadDashboard();
        loadAllData();
        
    } catch (error) {
        console.error('Erro ao registrar ocorrência completa:', error);
        showAlert('❌ Erro ao registrar ocorrência. Verifique os dados e tente novamente.', 'error');
    }
    
    return false;
}

function limparFormularioRegistro() {
    document.getElementById('registro-completo-form').reset();
    showAlert('Formulário limpo', 'success');
}

// ==== CIDADES ====
async function loadCidades() {
    currentData.cidades = await CidadeAPI.getAll();
    const tbody = document.getElementById('cidades-table-body');
    
    if (currentData.cidades.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Nenhuma cidade cadastrada</td></tr>';
        return;
    }
    
    tbody.innerHTML = currentData.cidades.map(cidade => `
        <tr>
            <td>${cidade.id}</td>
            <td>${cidade.nome}</td>
            <td>${cidade.uf}</td>
            <td>${cidade.area ? cidade.area.toFixed(2) : '-'}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-edit" onclick="editCidade(${cidade.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteCidade(${cidade.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function editCidade(id) {
    const cidade = currentData.cidades.find(c => c.id === id);
    if (!cidade) return;
    
    document.getElementById('cidade-id').value = cidade.id;
    document.getElementById('cidade-nome').value = cidade.nome;
    document.getElementById('cidade-uf').value = cidade.uf;
    document.getElementById('cidade-area').value = cidade.area || '';
    
    document.querySelector('#cidade-modal .modal-header h3').textContent = 'Editar Cidade';
    openModal('cidade-modal');
}

async function deleteCidade(id) {
    if (!confirm('Tem certeza que deseja excluir esta cidade?')) return;
    
    const success = await CidadeAPI.delete(id);
    if (success) {
        showAlert('Cidade excluída com sucesso!', 'success');
        loadCidades();
        loadDashboard();
        loadAllData();
    }
}

// ==== BAIRROS ====
async function loadBairros() {
    currentData.bairros = await BairroAPI.getAll();
    const tbody = document.getElementById('bairros-table-body');
    
    if (currentData.bairros.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="loading">Nenhum bairro cadastrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = currentData.bairros.map(bairro => `
        <tr>
            <td>${bairro.id}</td>
            <td>${bairro.nome}</td>
            <td>${bairro.cidade ? bairro.cidade.nome : '-'}</td>
            <td>${bairro.populacao || '-'}</td>
            <td>${bairro.area ? bairro.area.toFixed(2) : '-'}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-edit" onclick="editBairro(${bairro.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteBairro(${bairro.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function editBairro(id) {
    const bairro = currentData.bairros.find(b => b.id === id);
    if (!bairro) return;
    
    await loadCidadesSelect('bairro-cidade');
    
    document.getElementById('bairro-id').value = bairro.id;
    document.getElementById('bairro-nome').value = bairro.nome;
    document.getElementById('bairro-cidade').value = bairro.cidade ? bairro.cidade.id : '';
    document.getElementById('bairro-populacao').value = bairro.populacao || '';
    document.getElementById('bairro-area').value = bairro.area || '';
    
    document.querySelector('#bairro-modal .modal-header h3').textContent = 'Editar Bairro';
    openModal('bairro-modal');
}

async function deleteBairro(id) {
    if (!confirm('Tem certeza que deseja excluir este bairro?')) return;
    
    const success = await BairroAPI.delete(id);
    if (success) {
        showAlert('Bairro excluído com sucesso!', 'success');
        loadBairros();
        loadDashboard();
        loadAllData();
    }
}

// ==== TIPOS DE CRIME ====
async function loadTiposCrime() {
    currentData.tiposCrime = await TipoCrimeAPI.getAll();
    const tbody = document.getElementById('tipos-crime-table-body');
    
    if (currentData.tiposCrime.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Nenhum tipo de crime cadastrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = currentData.tiposCrime.map(tipo => `
        <tr>
            <td>${tipo.id}</td>
            <td>${tipo.nome}</td>
            <td>
                ${tipo.crimeViolento 
                    ? '<span class="badge badge-danger">Sim</span>' 
                    : '<span class="badge badge-success">Não</span>'}
            </td>
            <td>${tipo.descricao || '-'}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-edit" onclick="editTipoCrime(${tipo.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteTipoCrime(${tipo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function editTipoCrime(id) {
    const tipo = currentData.tiposCrime.find(t => t.id === id);
    if (!tipo) return;
    
    document.getElementById('tipo-crime-id').value = tipo.id;
    document.getElementById('tipo-crime-nome').value = tipo.nome;
    document.getElementById('tipo-crime-violento').checked = tipo.crimeViolento;
    document.getElementById('tipo-crime-descricao').value = tipo.descricao || '';
    
    document.querySelector('#tipo-crime-modal .modal-header h3').textContent = 'Editar Tipo de Crime';
    openModal('tipo-crime-modal');
}

async function deleteTipoCrime(id) {
    if (!confirm('Tem certeza que deseja excluir este tipo de crime?')) return;
    
    const success = await TipoCrimeAPI.delete(id);
    if (success) {
        showAlert('Tipo de crime excluído com sucesso!', 'success');
        loadTiposCrime();
        loadDashboard();
        loadAllData();
    }
}

// ==== OCORRÊNCIAS ====
async function loadOcorrencias() {
    currentData.ocorrencias = await OcorrenciaAPI.getAll();
    const tbody = document.getElementById('ocorrencias-table-body');
    
    if (currentData.ocorrencias.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="loading">Nenhuma ocorrência cadastrada</td></tr>';
        return;
    }
    
    tbody.innerHTML = currentData.ocorrencias.map(ocor => `
        <tr>
            <td>${ocor.id}</td>
            <td>${ocor.dataFato}</td>
            <td>${ocor.horaFato}</td>
            <td>${ocor.tipoCrime ? ocor.tipoCrime.nome : '-'}</td>
            <td>${ocor.tipoLocal} - ${ocor.cidade ? ocor.cidade.nome : ''}</td>
            <td>${ocor.comunicante ? ocor.comunicante.cpf : '-'}</td>
            <td class="action-buttons">
                <button class="btn btn-sm btn-view" onclick="viewOcorrencia(${ocor.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-delete" onclick="deleteOcorrencia(${ocor.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function viewOcorrencia(id) {
    const ocor = currentData.ocorrencias.find(o => o.id === id);
    if (!ocor) return;
    
    const detalhes = `
═══════════════════════════════════
📋 DETALHES DA OCORRÊNCIA #${ocor.id}
═══════════════════════════════════

📅 DATA E HORA:
   ${ocor.dataFato} às ${ocor.horaFato}

🚨 TIPO DE CRIME:
   ${ocor.tipoCrime ? ocor.tipoCrime.nome : 'N/A'}

📍 LOCAL:
   Tipo: ${ocor.tipoLocal}
   Cidade: ${ocor.cidade ? ocor.cidade.nome : 'N/A'}
   Bairro: ${ocor.bairro ? ocor.bairro.nome : 'N/A'}
   Endereço: ${ocor.logradouro || 'N/A'}, ${ocor.numero || 'S/N'}
   CEP: ${ocor.cep || 'N/A'}
   Referência: ${ocor.pontoReferencia || 'N/A'}

📝 DESCRIÇÃO:
   ${ocor.descricaoFato}

👤 COMUNICANTE:
   ID: ${ocor.comunicante ? ocor.comunicante.id : 'N/A'}
   CPF: ${ocor.comunicante ? ocor.comunicante.cpf : 'N/A'}
   Envolvimento: ${ocor.comunicante ? ocor.comunicante.envolvimento : 'N/A'}

═══════════════════════════════════
    `;
    
    alert(detalhes);
}

async function deleteOcorrencia(id) {
    if (!confirm('Tem certeza que deseja excluir esta ocorrência?')) return;
    
    const success = await OcorrenciaAPI.delete(id);
    if (success) {
        showAlert('Ocorrência excluída com sucesso!', 'success');
        loadOcorrencias();
        loadDashboard();
        loadAllData();
    }
}

// ==== MODAL FUNCTIONS ====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        
        if (modalId === 'bairro-modal') {
            loadCidadesSelect('bairro-cidade');
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            const idField = form.querySelector('input[type="hidden"]');
            if (idField) idField.value = '';
        }
    }
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ==== FORM SUBMISSION ====
async function handleSubmit(event, type) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        if (key !== 'id' && value !== '') {
            if (key === 'cidade' || key === 'bairro' || key === 'tipoCrime') {
                data[key] = { id: parseInt(value) };
            } else if (key === 'crimeViolento') {
                data[key] = form.querySelector(`[name="${key}"]`).checked;
            } else if (key === 'populacao' || key === 'area') {
                data[key] = value ? parseFloat(value) : null;
            } else {
                data[key] = value;
            }
        }
    }
    
    const id = form.querySelector('input[type="hidden"]').value;
    
    try {
        if (id) {
            switch(type) {
                case 'cidade':
                    await CidadeAPI.update(id, data);
                    break;
                case 'bairro':
                    await BairroAPI.update(id, data);
                    break;
                case 'tipo-crime':
                    await TipoCrimeAPI.update(id, data);
                    break;
            }
            showAlert('Registro atualizado com sucesso!', 'success');
        } else {
            switch(type) {
                case 'cidade':
                    await CidadeAPI.create(data);
                    break;
                case 'bairro':
                    await BairroAPI.create(data);
                    break;
                case 'tipo-crime':
                    await TipoCrimeAPI.create(data);
                    break;
            }
            showAlert('Registro criado com sucesso!', 'success');
        }
        
        closeModal(`${type}-modal`);
        
        switch(type) {
            case 'cidade':
                loadCidades();
                break;
            case 'bairro':
                loadBairros();
                break;
            case 'tipo-crime':
                loadTiposCrime();
                break;
        }
        
        loadDashboard();
        loadAllData();
        
    } catch (error) {
        console.error('Erro ao salvar:', error);
        showAlert('Erro ao salvar registro', 'error');
    }
    
    return false;
}

// ==== HELPER FUNCTIONS ====
async function loadCidadesSelect(selectId) {
    if (currentData.cidades.length === 0) {
        currentData.cidades = await CidadeAPI.getAll();
    }
    
    const select = document.getElementById(selectId);
    select.innerHTML = '<option value="">Selecione uma cidade</option>' +
        currentData.cidades.map(c => `<option value="${c.id}">${c.nome} - ${c.uf}</option>`).join('');
}

function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '90px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.animation = 'slideIn 0.3s ease';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100%); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);
