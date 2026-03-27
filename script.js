$(document).ready(function() {
    // Elementos do DOM
    const $taskInput = $('#taskInput');
    const $addButton = $('#addButton');
    const $taskList = $('#taskList');
    const $taskCount = $('#taskCount');

    // Função para atualizar o contador de tarefas
    function updateTaskCount() {
        const $tasks = $taskList.children('li:not(.empty-message)');
        const taskCount = $tasks.length;
        
        if (taskCount === 0) {
            if ($taskList.children('.empty-message').length === 0) {
                $taskList.append('<li class="empty-message">Nenhuma tarefa cadastrada</li>');
            }
        } else {
            $taskList.children('.empty-message').remove();
        }
        
        $taskCount.text(`${taskCount} tarefa(s)`);
    }

    // Função para adicionar nova tarefa
    function addTask(taskName) {
        if (taskName.trim() === '') {
            alert('Por favor, digite o nome da tarefa!');
            return false;
        }

        // Criar novo item da lista
        const $newTask = $(`<li>${escapeHtml(taskName)}</li>`);
        
        // Adicionar evento de clique para marcar como concluída
        $newTask.on('click', function() {
            $(this).toggleClass('completed');
        });
        
        // Adicionar à lista
        $taskList.append($newTask);
        
        // Limpar o input
        $taskInput.val('');
        
        // Atualizar contador
        updateTaskCount();
        
        return true;
    }

    // Função para escapar HTML (segurança)
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }

    // Evento de clique no botão
    $addButton.on('click', function() {
        const taskName = $taskInput.val();
        addTask(taskName);
    });

    // Evento de submit do formulário (ao pressionar Enter)
    $taskInput.on('keypress', function(e) {
        if (e.which === 13) { // Tecla Enter
            e.preventDefault();
            const taskName = $taskInput.val();
            addTask(taskName);
        }
    });

    // Inicializar contador
    updateTaskCount();
});