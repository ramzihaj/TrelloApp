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

  constructor(private fb:FormBuilder) {}
  ngOnInit():void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    });
  }
    addTask(){

    }
    updateTask(){
      
    }
    deleteTask(taskId:number){

    }
    onEditTask(task:Task,taskId:number){

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
