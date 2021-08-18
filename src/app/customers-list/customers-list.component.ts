import { Component, OnInit } from '@angular/core';
import { Customer } from '../shared/customer';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  isEditPos: number | null = null;
  isChanged: boolean = false;
  private tempCustomer: any;

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getData();

  }
  editCustoer(i: number): void {
    this.tempCustomer = this.resetCustomer();
    this.isEditPos = i;
  }
  cancelEdit(): void {
    this.tempCustomer = this.resetCustomer();
    this.isEditPos = null;
    this.isChanged = false;
  }
  saveCustomer(customer: Customer, i: number): void {
    const mergeCustomer: Customer = this.mergeCustomerProps(customer, this.tempCustomer);

    this.httpService.update(mergeCustomer, i); 
    this.isEditPos = null;
    this.isChanged = false;


  }
  deleteCustomer(customer: Customer): void {
    this.httpService.delete(customer);

  }
  setValue(key: string, value: string, original: string): void {
    if (value !== original && value !== this.tempCustomer[key]) {
      this.tempCustomer[key] = value;
      !this.isChanged && (this.isChanged = true);
    }

  }

  private resetCustomer(): Customer {
    return {
      key: null,
      name: null,
      email: null,
      mobile: null,
      location: null
    }
  }

  private mergeCustomerProps(original: Customer, temp: any): Customer {
    const result: any = { ...original };
    Object.keys(temp).forEach(key =>{
      if(temp[key]){
        result[key] = temp[key];
      }
    })
    return result;
  }

}
