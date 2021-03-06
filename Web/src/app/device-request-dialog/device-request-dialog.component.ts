import {Component, Inject, OnInit} from '@angular/core';
import {DatabaseService} from "../backend-services/database.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormControl, NgForm} from "@angular/forms";
import {AuthService} from "../backend-services/auth.service";
import {RequestEntry} from "../request-entry";

@Component({
  selector: 'app-device-request-dialog',
  templateUrl: './device-request-dialog.component.html',
  styleUrls: ['./device-request-dialog.component.css']
})
export class DeviceRequestDialogComponent implements OnInit {



  numberOfDevices: number;
  comment: string;

  tooMany: boolean = false;

    myControl: FormControl = new FormControl();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DeviceRequestDialogComponent>, public db: DatabaseService, public auth: AuthService) {  }



    onSubmit(f: NgForm) {
        if(f.valid && this.isValid()){
            this.closeDialog(this.getRequestData());
        }
    }



    getRequestData(){
      let uid = this.auth.getUserData().uid;

      return new RequestEntry(uid, this.data.key, this.numberOfDevices, this.comment, new Date());
    }

    amountValidation(): boolean{
        this.myControl.markAsTouched();

        if(this.numberOfDevices >=1){
            if(this.numberOfDevices <= this.data.quantity_available){
                return true;
            }else{
                this.myControl.setErrors({'tooMany': true});
            }

        }else{
            this.myControl.setErrors({'tooLow': true});
        }

        return false;
    }

    private isValid(): boolean{
        return this.amountValidation();
    }

    static openDialog(dialog, data, callback){
        let cdata ={...data, cb: callback};

        dialog.open(DeviceRequestDialogComponent, {
            data: cdata,
            width: '50%'
        });
    }

    closeDialog(ret = null){
        ret && this.data.cb && this.data.cb(ret);
        this.dialogRef.close();
    }

  ngOnInit() {
  }

}
