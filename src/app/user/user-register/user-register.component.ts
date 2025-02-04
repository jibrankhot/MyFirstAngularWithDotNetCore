import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { AlertyfyToastService } from 'src/app/Services/alertyfy-toast.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  user: User;
  Passwordnotmatched: boolean;
  registerationForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private alertyfy: AlertyfyToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerationFormComponent();
  }

  registerationFormComponent() {
    this.registerationForm = this.formBuilder.group({
      userName: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      MobileNo: [null, [Validators.required, Validators.maxLength(10)]],
      Password: [null, [Validators.required, Validators.minLength(8)]],
      ConfirmPass: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  passwordChecker(fg: FormGroup): Validators {
    return fg.get('Password').value === fg.get('ConfirmPass').value
      ? null
      : {
          Passwordnotmatched: true,
        };
  }

  onsubmit() {
    if (this.registerationForm.valid) {
      this.userService.addUser(this.userData());
      this.alertyfy.success('Form Was Submitted');

      setTimeout(() => {
        this.registerationForm.reset();
        setTimeout(() => {
          this.router.navigate(['user/login']);
        }, 500);
      }, 500);
    } else {
      this.alertyfy.error('Incorrect UserName or Password');
    }
  }

  userData(): User {
    // here this.username,this.email etc are getter method name used for cross connection
    return (this.user = {
      userName: this.userName.value,
      Email: this.Email.value,
      Password: this.Password.value,
      MobileNo: this.MobileNo.value,
    });
  }

  // toast methods for all formcontrols
  BlankNameToast() {
    setTimeout(() => {
      this.toastr.error('Please Enter Name', 'Error');
    }, 200);
  }
  BlankEmailToast() {
    setTimeout(() => {
      this.toastr.error('Please Enter valid Email', 'Error');
    }, 200);
  }
  BlankMobileNoToast() {
    setTimeout(() => {
      this.toastr.error('Please Enter MobileNo', 'Error');
    }, 200);
  }

  //getter methods for all formcontrols for toast

  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }
  get Email() {
    return this.registerationForm.get('Email') as FormControl;
  }
  get MobileNo() {
    return this.registerationForm.get('MobileNo') as FormControl;
  }
  get Password() {
    return this.registerationForm.get('Password') as FormControl;
  }
  // getter end
}
