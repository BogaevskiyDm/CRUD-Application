import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', [Validators.required, Validators.minLength]],
    location: ['', [Validators.required]]
  })
      name: AbstractControl = this.form.controls.name;
      email: AbstractControl = this.form.controls.email;
      mobile: AbstractControl = this.form.controls.mobile;
      location: AbstractControl = this.form.controls.location;


  constructor(private httpService: HttpService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createControls();
  }

  onSubmit(): void {

    this.httpService.createDta(this.form.value);
    
  }
  private createControls(): void {
    this.form.controls.name.setValue('John Smith');
    this.form.controls.email.setValue('john@gmail.com');
    this.form.controls.mobile.setValue(1234567);
    this.form.controls.location.setValue('SomeHere')
  }

}
