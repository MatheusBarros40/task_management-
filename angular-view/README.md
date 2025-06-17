# Angular Example for Tarefas

Este diretório contém um exemplo simples de componentes Angular para consumir a API de tarefas.

Arquivos principais:

- `tarefa.ts` – interface que descreve a entidade.
- `tarefa.service.ts` – serviço para realizar operações CRUD via HTTP.
- `tarefas.component.ts` e `tarefas.component.html` – componente e template que exibem a lista e o formulário de tarefas.

Para usar em um projeto Angular existente, importe o `TarefasComponent` em um módulo e adicione `HttpClientModule` e `FormsModule` nas importações do módulo.
