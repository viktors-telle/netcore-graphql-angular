import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { OwnerType, OwnerInput } from 'src/types';
import { Subscription } from 'rxjs';
import { MatDialog, MatTable, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { OwnersResponse } from './OwnersResponse';
import { ActionType } from './ActionType';

@Component({
  selector: 'app-owners',
  templateUrl: 'owners.component.html',
  styleUrls: ['owners.component.less']
})

export class OwnerComponent implements OnInit, OnDestroy {

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  owners = new MatTableDataSource<OwnerType>();
  loading = false;
  errors: any;

  // Workaround for enums to work in Angular templates.
  actionType: typeof ActionType = ActionType;

  private querySubscription: Subscription;

  displayedColumns: string[] = ['name', 'address', 'actions'];

  private ownerQuery = gql`
      query owners {
        owners {
          id
          name
          address
        }
      }`;

  constructor(private apollo: Apollo, public dialog: MatDialog) { }

  ngOnInit() {
    this.getOwners();
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  getOwners() {
    this.loading = true;
    this.querySubscription = this.apollo
      .watchQuery<OwnersResponse>({ query: this.ownerQuery })
      .valueChanges.subscribe(result => {
        this.owners.data = result.data.owners;
        this.loading = result.loading;
        this.errors = result.errors;
      }, (error) => {
        this.loading = false;
        this.errors = error.message;
      });
  }

  openDialog(action: ActionType, obj: { action: any; }) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      switch (result.action) {
        case ActionType.Add:
          this.addOwner(result.data);
          break;
        case ActionType.Update:
          this.updateOwner(result.data);
          break;
        case ActionType.Delete:
          this.deleteOwner(result.data);
          break;
        case ActionType.Cancel:
          return;
        default:
          throw new Error(`Not supported action type: ${result.action}`);
      }
    });
  }

  addOwner(ownerToAdd: OwnerType) {
    const createOwner = gql`
      mutation createOwner($owner: ownerInput!) {
        createOwner(owner: $owner) {
          id
          name
          address
        }
      }
    `;

    const owner = {
      name: ownerToAdd.name,
      address: ownerToAdd.address
    } as OwnerInput;

    this.apollo.mutate({
      mutation: createOwner,
      variables: { owner },
      update: (store, { data: { createOwner } }) => {
        const data: any = store.readQuery({ query: this.ownerQuery });
        data.owners.push(createOwner);
        store.writeQuery({ query: this.ownerQuery, data });
      },
    }).subscribe((data) => {
      console.log('Owner created: ', data);
    }, (error) => {
      console.log('There was an error sending the query', error);
    });
  }

  updateOwner(ownerToUpdate: OwnerType) {
    const updateOwner = gql`
      mutation updateOwner ($owner: ownerInput!, $ownerId: ID!) {
        updateOwner(owner: $owner, ownerId: $ownerId) {
          id
          name
          address
        }
      }
    `;

    const owner = {
      name: ownerToUpdate.name,
      address: ownerToUpdate.address
    } as OwnerInput;

    const ownerId = ownerToUpdate.id;

    this.apollo.mutate({
      mutation: updateOwner,
      variables: { owner, ownerId },
    })
      .subscribe();
  }

  deleteOwner(owner: OwnerType) {
    const deleteOwner = gql`
      mutation deleteOwner ($ownerId: ID!) {
        deleteOwner(ownerId: $ownerId)
      }
    `;

    const ownerId = owner.id;

    this.apollo.mutate({
      mutation: deleteOwner,
      variables: { ownerId },
      update: (store, { data: { deleteOwner } }) => {
        const data: any = store.readQuery({ query: this.ownerQuery });

        data.owners = data.owners.filter((value: OwnerType) => {
          return value.id !== owner.id;
        });

        store.writeQuery({ query: this.ownerQuery, data });
      },
    })
      .subscribe();
  }
}
