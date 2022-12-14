import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { Student } from 'src/app/models/students';
import { StudentsService } from 'src/app/students/services/students.service';
import { CoursesService } from '../../services/courses.service';
import { Store } from '@ngrx/store';
import { CourseState } from 'src/app/models/course.state';
import { addCourse, updateCourse } from '../../state/courses.actions';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {
  public courseForm!: FormGroup;
  tittle!: string;
  textButton!: string;
  buttonDisable: boolean = false;
  teachers$: Student[] = [];
  private _idCourse: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private _snackbar: MatSnackBar,
    private utilsService: UtilsService,
    private storeCourses: Store<CourseState>
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.max(100)]],
      qtys_classes: ['', [Validators.required, Validators.max(100)]],
      qtys_hours: ['', Validators.max(100)],
      teachers_name: ['', [Validators.required]],
    });
    this.studentsService
      .GetAllTeachers()
      .subscribe((teachers: Student[]) => (this.teachers$ = teachers));
    this.loadView();
  }

  transformValueName(id: string) {
    let result = this.teachers$.find((element) => element.id === id);
    return `${result?.name} ${result?.surname}`;
  }

  back() {
    this.router.navigateByUrl('/courses');
  }

  loadView() {
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.coursesService.GetCourseById(id)))
        .subscribe(
          (course) => (
            this.courseForm.patchValue(course),
            (this.tittle = 'Edit'),
            (this.textButton = 'Edit'),
            (this._idCourse = course.id)
          )
        );
      return;
    }

    if (this.router.url.includes('view')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.coursesService.GetCourseById(id)))
        .subscribe((student) => {
          this.courseForm.patchValue(student),
            (this.tittle = 'Consult'),
            this.courseForm.disable(),
            (this.buttonDisable = true);
        });
      return;
    }
    if (this.router.url.includes('new')) {
      this.tittle = 'New';
      this.textButton = 'Save';
      return;
    }
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      this._snackbar.open('You must complete the required fields', '  ', {
        panelClass: ['snackbar--warning'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      return;
    }
    if (this._idCourse) {
      const course: Course = {
        id: this._idCourse,
        ...this.courseForm.value,
      };
      this.storeCourses.dispatch(updateCourse({ course }));
      this._snackbar.open('Course updated successfully', '  ', {
        panelClass: ['snackbar--success'],
        verticalPosition: 'top',
        horizontalPosition: 'end',
        duration: 3000,
      });
      this.router.navigateByUrl('courses');
      return;
    }

    const course: Course = {
      id: this.utilsService.guid(),
      ...this.courseForm.value,
    };

    this.storeCourses.dispatch(addCourse({ course }));

    this._snackbar.open('Course created successfully', '  ', {
      panelClass: ['snackbar--success'],
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
    });
    this.router.navigateByUrl('courses');
  }
}
