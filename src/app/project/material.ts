import {
	MatIconModule,
	MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatDividerModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
  	MatIconModule,
  	MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  providers: [  
    MatDatepickerModule,  
  ],
  exports: [
  	MatIconModule,
  	MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDividerModule
  ],
})
export class MaterialModule { }