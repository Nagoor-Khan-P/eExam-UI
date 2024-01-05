import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    about: ''
  }

  durationInSeconds = 3000;
 
  actionMessageOk = 'ok';
  actionMessageClear = 'clear';

  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  formSubmit() {
    console.log(this.user);
    // basic validation before creating a user
    if(this.user.userName == '' || this.user.userName == null) {
      // alert("Are you sre want to Register!!");
      this._snackBar.open("Username is required !!", this.actionMessageClear, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition:'right'
      })
      return
    }
    // create user :UserService
    this.userService.createuser(this.user).subscribe(
      (data: any) => {
        // success
        console.log(data);
        // alert('User created successfully');
        // this._snackBar.open('User has been created successfully', this.actionMessageOk, {
        //   duration: this.durationInSeconds,
        //   verticalPosition: 'top',
        //   horizontalPosition: 'right'

        // })

        Swal.fire({
          title: 'Success!',
          text:'User has been created suucessfully with userId' + data.userId,
          icon: 'success',
          confirmButtonText: 'Cool'
        })
      },
      (error) => {
        // failure
        console.log(error);
        // alert('Failed to create user');
        // this._snackBar.open(error.getErrorMessage, this.actionMessageClear, {
        //   duration: this.durationInSeconds,
        //   verticalPosition: 'top',
        //   horizontalPosition: 'right'
        // })

        Swal.fire({
          title: 'Error',
          text: 'Reason: '+error.error.message,
          icon: 'error',
          confirmButtonText: 'Close'

        })
      }
    );

    // after submitting clear all the fields
    this.user.userName = '';
    this.user.password = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.phoneNumber = '';
    this.user.email = '';
    this.user.about = '';

  }

}
