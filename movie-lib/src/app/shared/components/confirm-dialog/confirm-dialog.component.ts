import { Component, Inject } from '@angular/core';
import {
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { ConfirmDialogData } from './confirm-dialog.data';

@Component({
	selector: 'ml-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
	title: string;
	message: string;
	dismissButtonText: string;
	dismissButtonColor: string;
	confirmButtonText: string;
	confirmButtonColor: string;

	constructor(
		private dialogRef: MatDialogRef<ConfirmDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: ConfirmDialogData
	) {
		this.title = this.data.title;
		this.message = this.data.message;
		this.dismissButtonText = this.data.dismissButtonText;
		this.confirmButtonText = this.data.confirmButtonText;
		this.dismissButtonColor = this.data.dismissButtonColor;
		this.confirmButtonColor = this.data.confirmButtonColor;
	}

	onConfirm(): void {
		this.dialogRef.close(true);
	}

	onDismiss(): void {
		this.dialogRef.close(false);
	}
}
