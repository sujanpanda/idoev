import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EvlistService } from '../../adminservice/evlist.service';

@Component({
  selector: 'app-evtype',
  templateUrl: './evtype.component.html',
  styleUrls: ['./evtype.component.css']
})
export class EvtypeComponent implements OnInit {

  adminform: FormGroup;
  evtList = [];
  errorMsg: string;
  successMsg: string;
  cityEvData = {};
  constructor(
    private _evListService: EvlistService,
  	private fb: FormBuilder
  ) { }

  ngOnInit() {
    this._evListService.getEventsList()
    .subscribe(
      res => {
        this.evtList = res;
      },
      err => {
        console.log(err);
      }
    );
  	this.adminform = this.fb.group({
      type: ['', [
        Validators.required
      ]]
    });
  }

  get aform() { return this.adminform.controls; }

  adEventType() {
  	console.log("clicked");
    document.getElementById("adminbtn").setAttribute("disabled", "");
    if(this.adminform.valid){
      this.cityEvData = this.adminform.value;
      console.log(this.cityEvData);
      this._evListService.addEventsList(this.adminform.value)
      .subscribe(
            res => {
              document.getElementById("adminbtn").removeAttribute("disabled");
              this.adminform.reset({});
              this.successMsg = "Your Event Type added successfully";
              setTimeout(() => {
                  this.successMsg = '';
              }, 8000);
              this._evListService.getEventsList()
              .subscribe(
                res => {
                  this.evtList = res;
                },
                err => {
                  console.log(err);
                }
              );
            },
            err => {
                document.getElementById("adminbtn").removeAttribute("disabled");
                this.errorMsg = err.error
                setTimeout(() => {
                    this.errorMsg = '';
                }, 8000);
                console.log(err);
          }
      )
    } else {
      document.getElementById("adminbtn").removeAttribute("disabled");
    }
  }

}
