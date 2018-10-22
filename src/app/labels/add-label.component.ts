import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {Label} from '../shared/shared.model';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit, OnDestroy {

  selectable = true;
  removable = true;
  addOnBlur = true;
  label: Label = {name: '', tags: []};
  title = 'ADD CATEGORY';
  editMode = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private allowSubmitSubject = new BehaviorSubject(false);
  allowSubmit$ = this.allowSubmitSubject.asObservable();

  constructor(private dialogRef: MatDialogRef<AddLabelComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (data && data.label) {
      this.label = data.label;
    }

    if (data && data.editMode === true) {
      this.editMode = true;
      this.title = 'EDIT CATEGORY';
    }
  }

  ngOnInit() {
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.label.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.checkAllowSubmit();
  }

  removeTag(tag: string): void {
    const index = this.label.tags.indexOf(tag);

    if (index >= 0) {
      this.label.tags.splice(index, 1);
    }

    this.checkAllowSubmit();
  }

  cancel() {
    this.dialogRef.close();
  }

  checkAllowSubmit() {
    if (this.label.name.length > 0 && this.label.tags.length > 0) {
      this.allowSubmitSubject.next(true);
    } else {
      this.allowSubmitSubject.next(false);
    }
  }

  ngOnDestroy(): void {
    this.allowSubmitSubject.unsubscribe();
  }
}

interface DialogData {
  editMode: boolean;
  label: Label;
}
