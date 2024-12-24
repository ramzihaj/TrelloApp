import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../Models/task';
import {MatButtonModule} from '@angular/material/button';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CdkDropList, 
    CdkDrag
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})

export class TodoComponent implements OnInit {
  todoForm! : FormGroup;
  tasks: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];

  isEditEnabled: boolean = false;
  updatedIndex!: any;

  constructor(private fb:FormBuilder) {}
  ngOnInit():void {
    this.todoForm = this.fb.group({
      item : ['', [Validators.required, Validators.minLength(3)]]
    });
  }
    addTask(){
      this.tasks.push({
        Title : this.todoForm.value.item,
        Completed:false
      });
      this.todoForm.reset();

    }
    updateTask(){
      this.tasks[this.updatedIndex].Title = this.todoForm.value.item;
      this.tasks[this.updatedIndex].Completed = false;
      this.todoForm.reset();
      this.updatedIndex = undefined;
      this.isEditEnabled = false;

    }
    deleteTask(taskId:number){
      this.tasks.splice(taskId, 1);
    }
    deleteInProgressTask(taskId:number){
      this.inprogress.splice(taskId, 1);
    }
    deleteDoneTask(taskId:number){
      this.done.splice(taskId, 1);
    }
    onEditTask(task:Task,taskId:number){
      this.todoForm.controls['item'].setValue(task.Title);
      this.updatedIndex = taskId;
      this.isEditEnabled = true;
    }
  

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
