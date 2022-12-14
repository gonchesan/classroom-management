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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { reducer, studentsFeatureKey } from './state/students.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './state/students.effects';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [StudentsComponent, NewStudentComponent, StudentsListComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    PipesModule,
    CoreModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(studentsFeatureKey, reducer),
    EffectsModule.forFeature([StudentsEffects]),
  ],
  providers: [StudentsService],
})
export class StudentsModule {}
