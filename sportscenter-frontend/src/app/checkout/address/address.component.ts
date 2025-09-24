import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../checkout.component';
import { Address } from 'src/app/shared/models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {
  addressForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private checkoutComponent: CheckoutComponent
  ){
    this.addressForm = this.formBuilder.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      Street: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', [Validators.required]]
    });
  }
  onSubmit(){
    if(this.addressForm.valid){
      const addressData: Address = this.addressForm.value;
      console.log('Submitted Address:', addressData);
    }
  }
  goToNextStep(){
    if(this.addressForm.valid){
      this.router.navigate(['/checkout/shipment']);
      this.checkoutComponent.setCurrentStep('shipment');
    }
  }
}