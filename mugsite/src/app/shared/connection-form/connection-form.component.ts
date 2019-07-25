import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/mughub/auth/user.model';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { UserService } from 'src/app/mughub/auth/user.service';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { ConnectionFormService } from './connection-form.service';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})

export class ConnectionFormComponent implements OnInit {

  @Input() existingConnections: User[];
  connectionsForm = new FormGroup({});

  //autocomplete
  filteredConnections: Observable<User[]>;
  connections: User[] = [];
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  //chips
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedConnections: User[] = [];
  selectedConnectionsBeforeChanges: User[] = [];
  connectionInvalid: boolean = false;
  connectionExist: boolean = false;
  @ViewChild('connectionInput', { static: false }) connectionInput: ElementRef<HTMLInputElement>

  constructor(
    private userService: UserService,
    private connectionFormService: ConnectionFormService
  ) { }

  ngOnInit() {
    this.initForm();
    this.initAutoComp();
    this.connections = this.userService.getUserSession().connections;
  }

  initForm() {
    if (this.existingConnections.length !== 0) {
      this.selectedConnections.push(...this.existingConnections);
      this.selectedConnectionsBeforeChanges.push(...this.existingConnections);
    }
    this.connectionsForm = new FormGroup({
      connections: new FormControl(null, this.ValidateConnection.bind(this))
    })
  }

  ValidateConnection(control: AbstractControl) {
    if (control.value && (!this.selectedConnections.includes(control.value) || this.connections.some(connection => connection.name === control.value))) {
      this.connectionFormService.isformValid.next(false);
      return { validConnection: false };
    }
    if (this.selectedConnections.length === 0 && control.value === null) {
      this.connectionFormService.isformValid.next(false);
      return { validConnection: false };
    }
    this.connectionFormService.isformValid.next(true);
    return null;
  }

  initAutoComp() {
    this.filteredConnections = this.connectionsForm.controls.connections.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterAutoComp(value))
      );
  }

  filterAutoComp(value: string) {
    if (this.connections && value) {
      const filterValue = value.toLowerCase();
      return this.connections.filter(connection => connection.name.toLowerCase().includes(filterValue));
    }
  }

  addConnectionChip(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      this.connectionExist = this.selectedConnections.some(connection => connection.name === value.trim());
      this.connectionInvalid = !this.connections.some(connection => connection.name === value.trim())

      if ((value || '').trim() && !this.connectionInvalid && !this.connectionExist) {
        this.selectedConnections.push(this.getConnectionUserObj(value.trim()));
        this.connectionFormService.onConnectionsChanged.next({
          selectedConnections: this.selectedConnections,
          selectedConnectionsOrig: this.selectedConnectionsBeforeChanges
        });
      }

      if (input)
        input.value = '';

      this.connectionsForm.controls.connections.setValue(null);
    }
  }

  removeConnectionChip(connection: User) {
    const index = this.selectedConnections.indexOf(connection);
    if (index >= 0) {
      this.selectedConnections.splice(index, 1);
      this.connectionFormService.onConnectionsChanged.next({
        selectedConnections: this.selectedConnections,
        selectedConnectionsOrig: this.selectedConnectionsBeforeChanges
      });
    }
  }

  connectionSelected(event: MatAutocompleteSelectedEvent) {
    this.connectionExist = this.selectedConnections.some(connection => connection.name === event.option.viewValue);
    if (!this.connectionExist) {
      this.selectedConnections.push(this.getConnectionUserObj(event.option.viewValue));
      this.connectionFormService.onConnectionsChanged.next({
        selectedConnections: this.selectedConnections,
        selectedConnectionsOrig: this.selectedConnectionsBeforeChanges
      });
    }
    this.connectionInput.nativeElement.value = '';
    this.connectionsForm.controls.connections.setValue(null);
  }

  getConnectionUserObj(connectionName: string) {
    let connectionUserObj = null;
    this.connections.forEach(connection => {
      if (connection.name === connectionName) {
        connectionUserObj = connection;
      }
    })
    return connectionUserObj;
  }
}
