import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteItem } from 'src/models/dialog-delete-item.model';

@Component({
  selector: 'app-delete-item-dialog',
  templateUrl: './delete-item-dialog.component.html',
  styleUrls: ['./delete-item-dialog.component.css'],
})
export class DeleteItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDeleteItem
  ) {}

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  deleteItem() {
    this.dialogRef.close(this.data);
  }
}
