import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser, User } from '../user/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnChanges, OnInit {
  @Input() user: IUser;
  currentUser = new User();

  constructor(private route: ActivatedRoute) {}

  ngOnChanges() {
    if (this.user) {
      this.currentUser = User.BuildUser(this.user);
    }
  }

  ngOnInit() {
    if (this.route.snapshot && this.route.snapshot.data['user']) {
      this.currentUser = User.BuildUser(this.route.snapshot.data['user']);
      this.currentUser.dateOfBirth = Date.now(); // for data mocking purposes only
    }
  }
}
