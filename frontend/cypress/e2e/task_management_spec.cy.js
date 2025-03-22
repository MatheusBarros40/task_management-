describe('Task Management E2E Tests', () => {
    // Função auxiliar para efetuar login
    const login = () => {
      cy.visit('http://localhost:3000/');
      cy.get('input[placeholder="Email"]').type('admin@admin.com');
      cy.get('input[placeholder="Senha"]').type('admin');
      cy.contains('Entrar').click();
      cy.url().should('include', '/tasks');
      cy.contains('Minhas Tarefas').should('be.visible');
    };
  
    it('Deve carregar a página de login corretamente', () => {
      cy.visit('http://localhost:3000/');
      cy.contains('Login').should('be.visible');
    });
  
    it('Deve permitir que um usuário faça login', () => {
      login();
    });
  
    it('Deve listar as tarefas corretamente', () => {
      login();
      // Verifica se existe uma lista com pelo menos um item
      cy.get('ul').find('li').its('length').should('be.gt', 0);
    });
  
    it('Deve criar e editar uma tarefa', () => {
      login();
  
      // Criar uma nova tarefa
      cy.contains('Criar Tarefa').click();
      cy.url().should('include', '/create');
  
      const taskTitle = 'Nova Tarefa Teste';
      const taskDescription = 'Descrição de teste';
  
      cy.get('input[placeholder="Título"]').type(taskTitle);
      cy.get('textarea[placeholder="Descrição"]').type(taskDescription);
      cy.get('[data-cy="submit"]').click();

      // Após criar, deve retornar para /tasks e exibir a nova tarefa
      cy.url().should('include', '/tasks');
      cy.contains(taskTitle).should('be.visible');
  
      // Editar a tarefa recém-criada
      // Seleciona o item de tarefa pelo título e clica no botão "Editar"
      cy.get('[data-cy="task-list"]')
      .contains(taskTitle)
      .parents('li')
      .within(() => {
        cy.contains('Editar').click();
      });
    cy.url().should('include', '/edit');
  
      // Atualiza os campos
      const newTitle = taskTitle + ' Atualizada';
      const newDescription = taskDescription + ' atualizada';
  
      cy.get('input[placeholder="Título"]').clear().type(newTitle);
      cy.get('textarea[placeholder="Descrição"]').clear().type(newDescription);
      cy.get('[data-cy="submit"]').click();	  

      // Verifica se os dados foram atualizados na lista de tarefas
      cy.url().should('include', '/tasks');
      cy.contains(newTitle).should('be.visible');
    });
  
    it('Deve excluir uma tarefa', () => {
      login();
  
      // Seleciona a primeira tarefa listada e salva seu título para validação
      cy.get('ul')
        .find('li')
        .first()
        .then(($li) => {
          const taskTitle = $li.find('h3').text();
          cy.wrap($li).within(() => {
            cy.contains('Excluir').click();
          });
          // Verifica que a tarefa não aparece mais na lista
          cy.contains(taskTitle).should('not.exist');
        });
    });
  });
  