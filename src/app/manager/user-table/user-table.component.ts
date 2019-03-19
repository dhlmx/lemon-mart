import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge, of } from 'rxjs'
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { OptionalTextValidation } from '../../common/validations';
import { IUser } from '../../user/user/user';
import { UserService } from '../../user/user/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit, OnInit {
  displayedColumns = ['name', 'email', 'role', 'status', 'id'];
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  isloadingResults = true;
  haserror = false;
  errorText = '';
  skipLoading = false;
  search = new FormControl('', OptionalTextValidation);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    if (this.skipLoading) {
      return;
    }

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    ).pipe(
      startWith({}),
      switchMap(() => {
        this.isloadingResults = true;

        return this.userService.getUsers(
          this.paginator.pageSize,
          this.search.value,
          this.paginator.pageIndex
        );
      }),
      map((data: { total: number; items: IUser[] }) => {
        this.isloadingResults = false;
        this.haserror = false;
        this.resultsLength = data.total;
        return data.items;
      }),
      catchError(err => {
        this.isloadingResults = false;
        this.haserror = true;
        this.errorText = err;
        return of([]);
      })
    ).subscribe(data => (this.dataSource.data = data));
  }

  get isLoadingResults() {
    return this.isloadingResults;
  }

  get hasError() {
    return this.haserror;
  }
}
