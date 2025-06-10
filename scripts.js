/**
 * @file Manages interactive modules, breadcrumbs, and questionnaire for the "Vida Sem Dívidas" project.
 * @summary This script handles module navigation, dynamic breadcrumbs, saving/loading answers, and feedback messages.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Module Definitions and State ---
    
    const modules = [
        'introducao', 'problema-dinheiro', 'proverbios', 'esperanca',
        'influencia-mundo', 'dicas-equilibrio', 'estatisticas', 'questionario',
        'visualizar-situacao', 'controle-orcamento', 'autores', 'glossario'
    ];
    
    // Mapping of module IDs to their user-friendly names for breadcrumbs.
    const moduleNames = {
        'introducao': 'Apresentação',
        'problema-dinheiro': 'O Problema Com o Dinheiro',
        'proverbios': 'Textos de Provérbios',
        'esperanca': 'Esperança e Confiança',
        'influencia-mundo': 'Influência do Mundo',
        'dicas-equilibrio': 'Dicas para Equilíbrio',
        'estatisticas': 'Saia Dessa Estatística',
        'questionario': 'Questionário de Auto Avaliação',
        'visualizar-situacao': 'Visualizar Situação Financeira',
        'controle-orcamento': 'Controle de Orçamento',
        'autores': 'Autores e Colaboradores',
        'glossario': 'Glossário de Textos Bíblicos'
    };

    // --- Core Functions ---

    /**
     * Updates the breadcrumb navigation for the currently active module.
     * @param {string} moduleId The ID of the active module.
     */
    function updateBreadcrumbs(moduleId) {
        const moduleElement = document.getElementById(moduleId);
        if (!moduleElement) return;

        const breadcrumbNav = moduleElement.querySelector('.breadcrumbs');
        if (!breadcrumbNav) return;

        // Clear previous breadcrumbs
        breadcrumbNav.innerHTML = '';

        // Create the breadcrumb list
        const ol = document.createElement('ol');
        
        // Add "Início" link, which always goes to the first module
        const homeLi = document.createElement('li');
        const homeLink = document.createElement('a');
        homeLink.href = '#';
        homeLink.textContent = 'Início';
        homeLink.dataset.module = 'introducao'; // Use data-module for navigation
        homeLi.appendChild(homeLink);
        ol.appendChild(homeLi);
        
        // Add the current page, if not on the introduction page
        if (moduleId !== 'introducao') {
            const currentLi = document.createElement('li');
            currentLi.className = 'current'; // Apply styling for the current page
            currentLi.setAttribute('aria-current', 'page');
            currentLi.textContent = moduleNames[moduleId] || 'Página Atual';
            ol.appendChild(currentLi);
        }

        breadcrumbNav.appendChild(ol);
    }

    /**
     * Shows a specific module and hides all others.
     * @param {string} moduleId The ID of the module to display.
     */
    function showModule(moduleId) {
        if (!modules.includes(moduleId)) {
            console.error(`Module with ID "${moduleId}" not found.`);
            return;
        }
        
        modules.forEach(id => {
            const moduleElement = document.getElementById(id);
            if (moduleElement) {
                moduleElement.classList.add('hidden');
                moduleElement.setAttribute('aria-hidden', 'true');
            }
        });

        const nextModule = document.getElementById(moduleId);
        if (nextModule) {
            nextModule.classList.remove('hidden');
            nextModule.setAttribute('aria-hidden', 'false');
            
            // Update the breadcrumbs for the newly shown module
            updateBreadcrumbs(moduleId);

            window.scrollTo(0, 0);
        }
    }

    // --- (As funções saveQuestionnaireAnswers, loadQuestionnaireAnswers e displayFeedbackMessage permanecem as mesmas) ---
    /**
     * Saves the answers from the questionnaire textareas to the browser's localStorage.
     */
    function saveQuestionnaireAnswers() {
        // ... (código original sem alteração)
    }

    /**
     * Loads saved answers from localStorage and populates the questionnaire fields.
     */
    function loadQuestionnaireAnswers() {
        // ... (código original sem alteração)
    }
    
    /**
     * Displays a temporary feedback message (toast notification) to the user.
     * @param {string} message The text to display.
     * @param {'success' | 'error'} type The type of message, for styling.
     */
    function displayFeedbackMessage(message, type) {
        // ... (código original sem alteração)
    }


    // --- Event Listeners ---

    document.body.addEventListener('click', (event) => {
        // Updated to handle both navigation buttons and breadcrumb links
        const target = event.target.closest('button[data-module], a[data-module]');
        if (target) {
            event.preventDefault(); // Prevent default link behavior
            const moduleId = target.dataset.module;
            showModule(moduleId);
        }
    });
    
    const saveButton = document.querySelector('#questionario button.cta-button');
    if(saveButton) {
        saveButton.addEventListener('click', saveQuestionnaireAnswers);
    }
    
    // --- Initialization ---
    showModule(modules[0]);
    loadQuestionnaireAnswers();
});