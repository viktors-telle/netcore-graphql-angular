import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { OwnerType, OwnerInput } from 'src/types';
import { Observable } from 'rxjs';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { OwnersResponse } from './OwnersResponse';
import { ActionType } from './ActionType';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-owners',
  templateUrl: 'owners.component.html',
  styleUrls: ['owners.component.less']
})

export class OwnerComponent implements OnInit {

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  owners = new Observable<OwnerType[]>();
  loading = false;
  errors: any;

  // Workaround for enums to work in Angular templates.
  actionType: typeof ActionType = ActionType;

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

  getOwners() {
    this.loading = true;
    this.owners = this.apollo
      .watchQuery<OwnersResponse>({ query: this.ownerQuery })
      .valueChanges.pipe(map(({ data }) => {
        this.loading = data.loading;
        this.errors = data.errors;
        return data.owners;
      }));
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

    this.apollo.mutate<any>({
      mutation: createOwner,
      variables: { owner },
      // tslint:disable-next-line: no-shadowed-variable
      update: (store, { data: createOwner }) => {
        const data: any = store.readQuery({ query: this.ownerQuery });
        const createdOwner = createOwner.createOwner;
        data.owners.push(createdOwner);
        store.writeQuery({ query: this.ownerQuery, data });
      },
    })
      .subscribe();
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

    this.apollo.mutate<any>({
      mutation: deleteOwner,
      variables: { ownerId },
      update: (store, { data: { } }) => {
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
