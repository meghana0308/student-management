import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student';
import { CommonModule } from '@angular/common';  // <-- add

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],  // <-- add CommonModule for *ngFor
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }
}
