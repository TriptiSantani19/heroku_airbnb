import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  transactionForm: FormGroup;
  optionsList = [];
  roomTypesArr = [];
  policyArr = [];
  LocationArr = [];
  test: any;
  submitted = false;
  constructor(private fb: FormBuilder, private userservice: UserDetailsService) { }

  get airBnbFormData() { return this.transactionForm.controls; }


  ngOnInit() {
    this.optionsList = ["Apartment", "House", "Loft", "Townhouse", "OtherProperty Type"];
    this.roomTypesArr = ["Entire Home/Apt", "Private Room", "Shared Room"];
    this.policyArr = ["Flexible", "Moderate", "Strict"];
    this.LocationArr = ["Excursionist", "Budget Travellers"];
    this.transactionForm = this.fb.group({
      security_deposit: [''],
      cleaning_fee: [''],
      extra_people: [''],
      host_listings_count: [''],
      zipcode: [''],
      accommodates: [''],
      bathrooms: [''],
      bedrooms: [''],
      beds: [''],
      superhost: [''],
      userVal: [''],
      room_type: [''],
      cancel_policy: [''],
      predict_price: [''],
      item_id: [''],
      no_listings: [''],
      result: [''],
      property_type_apartment: [''],
      location_val: [''],
      location_id: [''],
      email: [''],


    })
  }

  predictPrice() {
    // form.get(key).clearValidators();

    // this.submitted = true;
    // if (this.transactionForm.invalid) {
    //   return;
    // }
    let val = this.transactionForm.get('security_deposit').value;
   let  cleaning_fee = this.transactionForm.get('cleaning_fee').value
    // let objParams = {
    //   security_deposit : this.transactionForm.get('security_deposit').value,
    //   cleaning_fee : this.transactionForm.get('cleaning_fee').value,
    //   extra_people : this.transactionForm.get('extra_people').value,
    //   host_listings_count : this.transactionForm.get('host_listings_count').value,
    //   accommodates : this.transactionForm.get('accommodates').value,
    //   bathrooms : this.transactionForm.get('bathrooms').value,
    //   bedrooms :  this.transactionForm.get('bedrooms').value,
    //   beds :  this.transactionForm.get('beds').value,
    //   superhost :  this.transactionForm.get('superhost').value,
    // }
    if (val) {
      this.userservice.getPricePredictor(val).subscribe(data => {
        if (data) {
          this.transactionForm.get('predict_price').patchValue(data);
        }
      })
    }

  }

  submitTransactionDetails() {
    this.submitted = true;
    if (this.transactionForm.invalid) {
      return;
    }

    let locationId = this.transactionForm.get('location_id').value;

    if (this.transactionForm.get('location_val').value === 'Excursionist') {
      this.excursion(locationId);
    }
    if (this.transactionForm.get('location_val').value === 'Budget Travellers') {
      this.budgetTravellers(locationId);
    }


  }

  budgetTravellers(locationId){
    this.userservice.recommendLocation(locationId).subscribe(result => {
      if (result) {
        console.log("res", result);
        this.test = result
        console.log("test", this.test);

        // this.transactionForm.get('result').patchValue(result);
      }
      else {
        alert("Internal Server Error!")
      }
    })
  }

  excursion(locationId) {
    this.userservice.getLocationRecommender(locationId).subscribe(result => {
      if (result) {
        console.log("res", result);
        this.test = result
        console.log("test", this.test);

        // this.transactionForm.get('result').patchValue(result);
      }
      else {
        alert("Internal Server Error!")
      }
    })
  }

  resetForm() {
    this.transactionForm.reset();
    this.test = ''
  }

}
