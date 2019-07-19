import { Component, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OwnerType } from 'src/types';
import { ActionType } from '../owners/ActionType';

@Component({
    selector: 'app-dialog-box',
    templateUrl: 'dialog-box.component.html',
    styleUrls: ['dialog-box.component.less']
})
export class DialogBoxComponent {

    action: ActionType;
    localData: any;

    constructor(
        public dialogRef: MatDialogRef<DialogBoxComponent>,
        // @Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: OwnerType[]) {
        this.localData = { ...data };
        this.action = this.localData.action;
    }

    doAction() {
        this.dialogRef.close({ action: this.action, data: this.localData });
    }

    closeDialog() {
        this.dialogRef.close({ action: 'Cancel' });
    }
}
