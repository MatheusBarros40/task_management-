import { Component, OnInit } from '@angular/core';
import { TarefaService } from './tarefa.service';
import { Tarefa } from './tarefa';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html'
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  novaTarefa: Partial<Tarefa> = {};

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefaService.listar().subscribe(tarefas => (this.tarefas = tarefas));
  }

  adicionar() {
    if (!this.novaTarefa.titulo) return;
    this.tarefaService.criar(this.novaTarefa).subscribe(tarefa => {
      this.tarefas.push(tarefa);
      this.novaTarefa = {};
    });
  }

  atualizar(tarefa: Tarefa) {
    this.tarefaService.atualizar(tarefa).subscribe();
  }

  excluir(id: number) {
    this.tarefaService.excluir(id).subscribe(() => {
      this.tarefas = this.tarefas.filter(t => t.id !== id);
    });
  }
}
