import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { MydetailService } from '../../services/mydetail.service';
import { CityService } from '../../services/city.service';
import { MatSnackBar } from '@angular/material';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mydetail',
  templateUrl: './mydetail.component.html',
  styleUrls: ['./mydetail.component.css']
})
export class MydetailComponent implements OnInit {

  mobView:boolean = false;
  defNoimage = '/assets/images/no_image_def.jpg'
  noimage = '/assets/images/no_image.jpg'
  defaultImage = '';
  image = '';
  tokenMake = '';
  authToken = '';
  userDetail = {};
  ctDetail = [];

  updateUserData = {};
  updateErrMsg: string;
  updateForm: FormGroup;
  constructor(
    private deviceService: DetectmobileService,
    private _auth: AuthService,
  	private _mydetailService: MydetailService,
    private _cityLst: CityService,
  	private _router: Router,
    private fb: FormBuilder,
    public snackbar: MatSnackBar
  ) {
    this._auth.getTokenWeb()
    .subscribe(
      data => this.tokenMake = data.toString(),
      err => this._router.navigate(['/login'])
    );
  }

  openSnackBar() {
    this.snackbar.open("Email ID is not editable.", "OK", {duration:5000,panelClass: ['blue-snackbar']});
  }

  ngOnInit() {
    var isMobile = this.deviceService.detectMob();
    if(isMobile) {
        this.mobView = true;
        document.getElementById("logo_wrap").classList.remove("expand_logo");
    } else {
      //desktop here
      this.mobView = false;
    }
    this.authToken = this._auth.getToken();
  	this._mydetailService.getUserDetail()
    .subscribe(
      res => {
        this.userDetail = res;
        this.defaultImage = 'http://localhost:3000/'+res.loadpath;
        this.image = 'http://localhost:3000/'+res.imgpath;
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/404']);
          }
        }
      }
    );
    this._cityLst.getCityList()
    .subscribe(
      res => {
        var result = Object.keys(res).map(function(key) {
          return [Number(key), res[key]];
        });
        this.ctDetail = result;
      },
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/404']);
          }
        }
      }
    );
    forkJoin(this._mydetailService.getUserDetail()
    ).subscribe((data) => {
      document.getElementById("updatebtn").removeAttribute("disabled");
      this.updateForm = this.fb.group({
          name: [data[0].name, [
            Validators.required,
            Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/),
            Validators.minLength(3)
          ]],
          mobile: [data[0].mobile, [
            Validators.required,
            Validators.pattern(/[0-9]/),
            Validators.minLength(10),
            Validators.maxLength(10)
          ]],
          city: [data[0].city, [
            Validators.required
          ]],
          address: [data[0].address, [
            Validators.required
          ]]
      });
    });
    this.updateForm = this.fb.group({
        name: [],
        mobile: [],
        city: [],
        address: []
    });
  }

  get updform() { return this.updateForm.controls; }


  updateUser() {
    document.getElementById("updatebtn").setAttribute("disabled", "");
    if(this.updateForm.valid){
      this.updateUserData = this.updateForm.value;
      this._mydetailService.updateUser(this.updateUserData)
      .subscribe(
          res => {
              this.snackbar.open("Your Profle updated successfully.", null, {duration:5000,panelClass: ['blue-snackbar']});
              document.getElementById("updatebtn").setAttribute("disabled", "");
              this._router.navigate(['/dashboard']);
          },
          err => {
              document.getElementById("updatebtn").removeAttribute("disabled");
              this.updateErrMsg = err.error
              setTimeout(()=>{
                  this.updateErrMsg = '';
              }, 8000);
          }
        )
    } else {
      document.getElementById("updatebtn").removeAttribute("disabled");
    }
  }
}
