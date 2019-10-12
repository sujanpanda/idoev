import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddphotoComponent } from './addphoto.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MaterialModule } from '../material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddphotoService } from '../../services/addphoto.service';
import { MydetailService } from '../../services/mydetail.service';

const routes: Routes = [
	{ path: '', component: AddphotoComponent }
];

@NgModule({
  declarations: [AddphotoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    RouterModule.forChild(routes)
  ],
  providers: [MydetailService, AddphotoService]
})
export class AddphotoModule { }
