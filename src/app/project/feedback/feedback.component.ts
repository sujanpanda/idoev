import { Component, OnInit } from '@angular/core';
import { DetectmobileService } from '../../services/detectmobile.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  mobView:boolean = false;
  feedbackErrMsg: string;
  feedbackForm: FormGroup;
  constructor(
    private deviceService: DetectmobileService,
    private _feedbackService: FeedbackService,
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
    this.feedbackForm = this.fb.group({
        name: ['', [
          Validators.required,
          Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/),
          Validators.minLength(3)
        ]],
        title: ['', [
          Validators.required,
          Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
        ]],
        message: ['', [
          Validators.required,
          Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)
        ]]
    });
  }

  get feedform() { return this.feedbackForm.controls; }

  updateFeedback() {
    document.getElementById("feedbackbtn").setAttribute("disabled", "");
    if(this.feedbackForm.valid){
      document.getElementById("feedbackbtn").setAttribute("disabled", "");
      this._feedbackService.updateFeedback(this.feedbackForm.value)
      .subscribe(
          res => {
              this.snackbar.open("Thanks for your feedback. It will really helpfull for us.", null, {duration:5000,panelClass: ['blue-snackbar']});
              document.getElementById("feedbackbtn").setAttribute("disabled", "");
              this._router.navigate(['/dashboard']);
          },
          err => {
              document.getElementById("feedbackbtn").removeAttribute("disabled");
              this.feedbackErrMsg = err.error
              setTimeout(()=>{
                  this.feedbackErrMsg = '';
              }, 8000);
          }
        )
    } else {
      document.getElementById("feedbackbtn").removeAttribute("disabled");
    }
  }

}
