import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student';
import { Router } from '@angular/router';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';  // <-- Add this

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule   // <-- Include CommonModule
  ],
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css'],  // <-- correct typo "styleUrl" -> "styleUrls"
})
export class AddStudent implements OnInit {
  studentForm!: FormGroup;
  classes: number[] = [6, 7, 8, 9];
  favoriteSubjects: string[] = ['Math', 'Science', 'English', 'History'];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      class: [null, Validators.required],
      gender: ['', Validators.required],
      hasHobby: [false],
      hobby: [''],
      favoriteSubject: ['']
    });

    this.studentForm.get('hasHobby')?.valueChanges.subscribe(value => {
      const hobbyControl = this.studentForm.get('hobby');
      if (value) {
        hobbyControl?.setValidators([Validators.required]);
      } else {
        hobbyControl?.clearValidators();
        hobbyControl?.setValue('');
      }
      hobbyControl?.updateValueAndValidity();
    });
  }

  get name() { return this.studentForm.get('name'); }
  get classField() { return this.studentForm.get('class'); }
  get gender() { return this.studentForm.get('gender'); }
  get hasHobby() { return this.studentForm.get('hasHobby'); }
  get hobby() { return this.studentForm.get('hobby'); }

  saveStudent() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const formValue = this.studentForm.value;
    const newStudent: Student = {
      id: 0,
      name: formValue.name,
      classLevel: Number(formValue.class),
      gender: formValue.gender,
      hasHobby: formValue.hasHobby,
      hobby: formValue.hasHobby ? formValue.hobby : '',
      favoriteSubject: formValue.favoriteSubject
    };

    this.studentService.addStudent(newStudent);
    alert('Student added successfully!');
    this.router.navigate(['/home']);
  }
}
