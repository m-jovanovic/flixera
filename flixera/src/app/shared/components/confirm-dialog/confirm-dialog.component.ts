import { Component, Inject } from '@angular/core';
import {
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

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
	dismissButtonColor: ThemePalette;
	confirmButtonText: string;
	confirmButtonColor: ThemePalette;

	constructor(
		private dialogRef: MatDialogRef<ConfirmDialogComponent>,
		@Inject(MAT_DIALOG_DATA) private data: ConfirmDialogData
	) {
		this.title = this.data.title;
		this.message = this.data.message;
		this.dismissButtonText = this.data.dismissButtonText;
		this.confirmButtonText = this.data.confirmButtonText;
		this.dismissButtonColor = this.data.dismissButtonColor as ThemePalette;
		this.confirmButtonColor = this.data.confirmButtonColor as ThemePalette;
	}

	onConfirm(): void {
		this.dialogRef.close(true);
	}

	onDismiss(): void {
		this.dialogRef.close(false);
	}
}
