import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AddLabelComponent} from './add-label.component';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  addLabel() {
    const dialogRef = this.dialog.open(AddLabelComponent);

    dialogRef.afterClosed().subscribe(label => {
      console.log('label: ', label);
    });
  }

}
