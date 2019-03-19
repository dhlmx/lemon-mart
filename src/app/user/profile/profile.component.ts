import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError as observableThrowError } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { $enum } from 'ts-enum-util';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Role as UserRole } from '../../auth/role.enum';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import {
  BirthDateValidation,
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  PasswordValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation
} from '../../common/validations';
import { UserService } from '../user/user.service';

import { IUSState, PhoneType, USStateFilter  } from '../../user/user/data';
import { IUser, IPhone, User } from '../user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Role = UserRole;
  PhoneTypes = $enum(PhoneType).getKeys();
  userForm: FormGroup;
  states: Observable<IUSState[]>;
  userError = '';
  currentUserRole = this.Role.None;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authStatus.subscribe(authStatus => (this.currentUserRole = authStatus.userRole));
    this.userService.getCurrentUser().subscribe(user => { this.buildUserForm(user); });
    this.buildUserForm();
  }

  get age() {
    return new Date().getFullYear() - this.dateOfBirth.getFullYear();
  }

  get dateOfBirth() {
    return this.userForm.get('dateOfBirth').value || new Date();
  }

  get phonesArray(): FormArray {
    return this.userForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phonesArray.push(
      this.buildPhoneFormControl(this.userForm.get('phones').value.length + 1)
    );
  }

  private buildPhoneArray(phones: IPhone[]) {
    const groups = [];

    if (!phones || (phones && phones.length === 0)) {
      groups.push(this.buildPhoneFormControl(1));
    } else {
      phones.forEach(p => {
        groups.push(this.buildPhoneFormControl(p.id, p.type, p.number));
      });
    }

    return groups;
  }

  private buildPhoneFormControl(id: number, type?: string, number?: string) {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      number: [number || '', USAPhoneNumberValidation],
    });
  }

  buildUserForm(user?: IUser) {
    this.userForm = this.formBuilder.group({
      email: [
        {
          value: (user && user.email) || '',
          disabled: this.currentUserRole !== this.Role.Manager,
        },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [(user && user.name.first) || '', RequiredTextValidation],
        middle: [(user && user.name.middle) || '', OneCharValidation],
        last: [(user && user.name.last) || '', RequiredTextValidation],
      }),
      role: [
        {
          value: (user && user.role) || '',
          disabled: this.currentUserRole !== this.Role.Manager,
        },
        [
          Validators.required
        ],
      ],
      dateOfBirth: [(user && user.dateOfBirth) || '', BirthDateValidation],
      address: this.formBuilder.group({
        line1: [
          (user && user.address && user.address.line1) || '',
          RequiredTextValidation,
        ],
        line2: [
          (user && user.address && user.address.line2) || '',
          OptionalTextValidation,
        ],
        city: [
          (user && user.address && user.address.city) || '',
          RequiredTextValidation
        ],
        state: [
          (user && user.address && user.address.state) || '',
          RequiredTextValidation,
        ],
        zip: [
          (user && user.address && user.address.zip) || '',
          USAZipCodeValidation
        ],
      }),
      phones: this.formBuilder.array(this.buildPhoneArray(user ? user.phones : [])),
    });

    this.states = this.userForm
      .get('address')
      .get('state')
      .valueChanges.pipe(startWith(''), map(value => USStateFilter(value)));
  }

  async save(form: FormGroup) {
    this.userService
    .updateUser(form.value)
    .subscribe(res => this.buildUserForm(res), err => (this.userError = err));
  }
}
