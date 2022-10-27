import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsService } from './services/students.service';

import { StudentsRoutingModule } from './students-routing.module';

import { StudentsComponent } from './components/students/students.component';
import { NewStudentComponent } from './components/new-student/new-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [StudentsComponent, NewStudentComponent, StudentsListComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    PipesModule,
    DirectivesModule,
  ],
  providers: [StudentsService],
})
export class StudentsModule {}
