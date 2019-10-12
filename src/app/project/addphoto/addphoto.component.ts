import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddphotoService } from '../../services/addphoto.service';
import { MydetailService } from '../../services/mydetail.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.css']
})
export class AddphotoComponent implements OnInit {
	
    mobView:boolean = false;
    idoEvErrMsg: string;
    selectedFile:File = null;
    imageChangedEvent: any = '';
    croppedImage: any = '';
    cropper:any = {x1: 0, y1: 0, x2: 250, y2: 150};
    folderName:string;
    xp:number = 0;
    yp:number = 0;
    ew:number = 600;
    eh:number = 360;
    idoEvForm: FormGroup;
    progressBar:number;

    constructor(
      private deviceService: DetectmobileService,
    	private http: HttpClient,
      private _mydetailService: MydetailService,
    	private _addPhoto: AddphotoService,
      private _router: Router,
      private fb: FormBuilder,
	    public snackbar: MatSnackBar
  	) { }

    ngOnInit() {
      var isMobile = this.deviceService.detectMob();
      if(isMobile) {
        this.mobView = true;
	  	  document.getElementById("logo_wrap").classList.remove("expand_logo");
      } else {
        //desktop here
        this.mobView = false;
      }
      this._mydetailService.getUserDetail()
      .subscribe(
        res => {
          this.folderName = res._id;
        },
        err => {
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401) {
              this._router.navigate(['/404']);
            }
          }
        }
      );
  	}


    fileChangeEvent(event) {
      if(event.target.files.length > 0) {
    		document.getElementById("loader").style.display = "none";
    		document.getElementById("imgShowHide").style.display = "none";
    		document.getElementById("upload_btn").setAttribute("disabled", "");
      	var input = event.target;
      	for ( var i=0; i<input.files.length; i++ ) {
      		var ext = input.files[i].name.substring(input.files[i].name.lastIndexOf('.')+1).toLowerCase();
      		if(ext == 'jpg' || ext == 'png') {
      			this.imageChangedEvent = event;
      			this.selectedFile = <File>event.target.files[0];
      			document.getElementById("loader").style.display = "block";
      			document.getElementById("upload_btn").setAttribute("disabled", "");
      		} else {
      			this.imageChangedEvent = "";
      			input.value = "";
      			document.getElementById("loader").style.display = "none";
      			document.getElementById("upload_btn").removeAttribute("disabled");
      			document.getElementById("imgShowHide").style.display = "none";
      			this.snackbar.open("Only jpg, jpeg and png are allowed", null, {duration:5000,panelClass: ['blue-snackbar']});
      		}
      	}
      }
    }

    imageCropped(event: ImageCroppedEvent) {
        const filebeforeCrop = this.imageChangedEvent.target.files[0];
        this.croppedImage = event.base64;
        this.xp = event.cropperPosition.x1;
        this.yp = event.cropperPosition.y1;
        this.ew = event.width;
        this.eh = event.height;

        this.idoEvForm = this.fb.group({
            x1: [this.xp, [
                Validators.required
            ]],
            y1: [this.yp, [
                Validators.required
            ]],
            ew: [this.ew, [
                Validators.required
            ]],
            eh: [this.eh, [
                Validators.required
            ]],
            Fnm: [this.folderName, [
                Validators.required
            ]],
            filename: [this.selectedFile, [
                Validators.required
            ]]
        });
    }

    get ideform() { return this.idoEvForm.controls; }

    imageLoaded() {
        setTimeout(() => {
	        var imgCrop = <HTMLImageElement>document.querySelector("image-cropper div img");
	        var imgSize = this.imageChangedEvent.target.files[0].size/1024;
    			if(imgCrop.naturalWidth<600 && imgCrop.naturalHeight<380) {
    				this.imageChangedEvent = "";
    				document.getElementById("loader").style.display = "none";
    				document.getElementById("upload_btn").removeAttribute("disabled");
    				document.getElementById("imgShowHide").style.display = "none";
    				this.snackbar.open("Please use a larger Image", null, {duration:5000,panelClass: ['blue-snackbar']});
    			} else if(imgSize>=10000) {
    				this.imageChangedEvent = "";
    				document.getElementById("loader").style.display = "none";
    				document.getElementById("upload_btn").removeAttribute("disabled");
    				document.getElementById("imgShowHide").style.display = "none";
    				this.snackbar.open("Image size is too BIG", null, {duration:5000,panelClass: ['blue-snackbar']});
    			} else {
    				var imgOW = imgCrop.naturalWidth;
    				var imgW = document.body.offsetWidth-54;
    				var xD = imgOW/imgW;
    				var xW = 600/xD;
    				var yW = (xW/1.66)+10;
    				var xOne = (imgW - xW)/2;
    				var xTwo = xOne + xW;
    				document.getElementById("imgShowHide").style.display = "block";
    				document.getElementById("upload_btn").removeAttribute("disabled");
    				setTimeout(() => {
    					this.cropper = {x1: xOne, y1: 10, x2: xTwo, y2: yW};
    				}, 50);
    				document.getElementById("loader").style.display = "none";
    			}
	    }, 800);
	    
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        this.imageChangedEvent = "";
    		document.getElementById("loader").style.display = "none";
    		document.getElementById("imgShowHide").style.display = "none";
    		document.getElementById("upload_btn").removeAttribute("disabled");
    }

  	submitFile() {
  		
      if(this.imageChangedEvent !== "" || this.xp !== null || this.yp !== null || this.ew !== null || this.eh !== null) {
        if(isNaN(this.xp) && isNaN(this.yp) && isNaN(this.ew) && isNaN(this.eh)) {
          this.snackbar.open("Please choose another image", null, {duration:5000,panelClass: ['blue-snackbar']});
        } else {
          const fd = new FormData();
          fd.append("filename", this.idoEvForm.get('filename').value);
          fd.append("xfirst", this.idoEvForm.get('x1').value);
          fd.append("yfirst", this.idoEvForm.get('y1').value);
          fd.append("pWdt", this.idoEvForm.get('ew').value);
          fd.append("pHgt", this.idoEvForm.get('eh').value);
          fd.append("fName", this.idoEvForm.get('Fnm').value);
          this._addPhoto.addPhotoFunc(fd)
          .subscribe(event => {
            if(event.type === HttpEventType.UploadProgress) {
              document.getElementById('imgShowHide').style.display = "none";
              document.getElementById('loader').style.display = "block";
              document.getElementById("upload_btn").setAttribute("disabled", "");
            } else if (event.type === HttpEventType.Response) {
              this._router.navigate(['/mydetail']);
              this.snackbar.open("Image uploaded successfully", null, {duration:5000,panelClass: ['blue-snackbar']});
            }
          },
          err => {
            this.idoEvErrMsg = err.error;
            this.imageChangedEvent = "";
            document.getElementById('imgShowHide').style.display = "block";
            document.getElementById('loader').style.display = "none";
            document.getElementById("upload_btn").removeAttribute("disabled");
          });
        }
      } else {
        this.snackbar.open("Please choose a image", null, {duration:5000,panelClass: ['blue-snackbar']});
      }
    }

}
