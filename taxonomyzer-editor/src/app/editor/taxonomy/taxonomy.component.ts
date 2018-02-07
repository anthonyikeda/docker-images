import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrls: ['./taxonomy.component.css']
})
export class TaxonomyComponent implements OnInit {

  taxonomyForm: FormGroup;
  csvTypes = [
    { value: 'flat', viewValue: 'Flat'},
    { value: 'nested', viewValue: 'Nested'},
    { value: 'pbr', viewValue: 'Path-By-Row'},
    { value: 'alpha', viewValue: 'Alphabetized'}
  ];

  selected: 'flat';

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.taxonomyForm = this.builder.group({
      clientName : ['', Validators.required],
      taxonomyName: ['', Validators.required],
      csvType: ['flat', Validators.required],
      description: ['', Validators.required]
    });
  }

  onFileInput(event: any) {
    console.log(event);
  }
}
