import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';
import { Property } from 'src/app/interfaces/Property ';
import { AlertyfyToastService } from 'src/app/Services/alertyfy-toast.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { HousingService } from 'src/app/Services/housing.service';
import { IPropertyBase } from 'src/app/interfaces/ipropertybase';

@Component({
  selector: 'app-addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css'],
  animations: [
    trigger('tabChange', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AddpropertyComponent implements OnInit {
  @ViewChild('AddPropTabs') AddPropTabs: TabsetComponent;
  AddPropertyForm: FormGroup;
  nextClicked: boolean;
  //WILL Come for MasterTable/Database
  propertyTypes: Array<string> = ['House', 'Appartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  cityList: any[];
  datePipe: any;
  property: any = {};

  //this will map the fields for save function
  mapProperty(): void {

    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    if (this.property.Image == null) {
      this.property.Image = 'assets/house4.jpeg'
    }
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }
  propertyView: Property = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null,
    Address: '',
    PostedOn: '',
    PostedBy: 0,
    Image: 'assets/house6.jpeg',
  };
  constructor(
    private toastr: ToastrService,
    private alertyfy: AlertyfyToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private housingService: HousingService
  ) { }
  ngOnInit(): void {
    this.createAddPropertyForm();

  }

  createAddPropertyForm() {
    this.AddPropertyForm = this.formBuilder.group({
      BasicInfo: this.formBuilder.group({
        SellRent: ['1', Validators.required],
        PType: [null, Validators.required],
        Name: [null, Validators.required],
        BHK: [null, Validators.required],
        FType: [null],
        City: [null, Validators.required],
      }),

      PriceInfo: this.formBuilder.group({
        Price: [null, Validators.required],
        Security: [null],
        Maintenance: [null],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
      }),

      AddressInfo: this.formBuilder.group({
        FloorNo: [null, Validators.required],
        TotalFloor: [null, Validators.required],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.formBuilder.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        MainEntrance: [null],
        Description: [null],
      }),

      PhotoInfo: this.formBuilder.group({
        Image: [null],
      }),
    });
  }

  // #region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.AddPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.AddPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.AddPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.AddPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  get PhotoInfo() {
    return this.AddPropertyForm.controls['PhotoInfo'] as FormGroup;
  }
  // #endregion

  // #region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }

  // #endregion
  // #endregion

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.AddPropTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.AddPropTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.AddPropTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.AddPropTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  onSubmit() {

    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertyfy.success('Congrats, your property listed successfully on our website');
      console.log(this.AddPropertyForm);

      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onReset() {
    if (window.confirm('The Current Form Will Lost All the Entered data ')) {
      this.AddPropertyForm.reset();
      setTimeout(() => {
        this.alertyfy.success('Form was Resetted Successfully');
      }, 1000);
      setTimeout(() => {
        this.AddPropTabs.tabs[0].active = true;
      }, 1000);
    } else {
    }
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;

    if (IsCurrentTabValid) {
      if (this.AddPropTabs?.tabs[tabId]) {
        this.AddPropTabs.tabs[tabId].active = true;
      }
    } else {
      this.alertyfy.error(
        'Please Fill the Data Before Leaving The Current Tab'
      );
      this.allTabsValid()
    }

  }
}
