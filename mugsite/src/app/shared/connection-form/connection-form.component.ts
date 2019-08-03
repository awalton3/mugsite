import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, HostListener } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/mughub/auth/user.model';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { ConnectionFormService } from './connection-form.service';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})

export class ConnectionFormComponent implements OnInit, OnDestroy {

  private subs = new Subscription();
  @Input() existingConnections?: User[];
  @Input() connections: User[] = [];
  connectionsForm = new FormGroup({});

  //autocomplete
  filteredConnections: Observable<User[]>;
  charAutoOptionLimit: number;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  //chips
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedConnections: User[] = [];
  selectedConnectionsIds: string[] = [];
  selectedConnectionsBeforeChanges: string[] = [];
  connectionInvalid: boolean = false;
  connectionExist: boolean = false;
  charChipLimit: number;
  @ViewChild('connectionInput', { static: false }) connectionInput: ElementRef<HTMLInputElement>

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.getCharAutoOptionLimit();
    this.getCharChipLimit();
  }

  constructor(private connectionFormService: ConnectionFormService) { }

  ngOnInit() {
    this.initForm();
    this.initAutoComp();
    this.getCharAutoOptionLimit();
    this.getCharChipLimit();
    this.listenForFormReset();
  }

  getCharAutoOptionLimit() {
    if (window.innerWidth > 430) {
      this.charAutoOptionLimit = 40;
    } else {
      this.charAutoOptionLimit = 18;
    }
  }

  getCharChipLimit() {
    if (window.innerWidth > 430) {
      this.charChipLimit = 50;
    } else {
      this.charChipLimit = 18;
    }
  }

  initForm() {
    if (this.existingConnections && this.existingConnections.length !== 0) {
      this.selectedConnections.push(...this.existingConnections);
      this.existingConnections.forEach(connection => {
        this.selectedConnectionsBeforeChanges.push(connection.uid);
        this.selectedConnectionsIds.push(connection.uid)
      })
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
        map(value => {
          if (typeof value === 'string') return value;
          else if (value) value.name;
        }),
        map(name => name ? this.filterAutoComp(name) : this.connections.slice())
      );
  }

  filterAutoComp(value: string) {
    if (this.connections && value) {
      const filterValue = value.toLowerCase();
      return this.connections.filter(connection => connection.name.toLowerCase().includes(filterValue));
    }
  }

  listenForFormReset() {
    this.connectionFormService.resetConnectionForm.subscribe(() => {
      this.connectionsForm.reset();
      this.selectedConnections = [];
      this.selectedConnectionsIds = [];
      this.selectedConnectionsBeforeChanges = [];
      this.connectionFormService.onConnectionsChanged.next({
        selectedConnections: this.selectedConnectionsIds,
        selectedConnectionsOrig: this.selectedConnectionsBeforeChanges
      })
    })
  }

  addConnectionChip(event: MatChipInputEvent) {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      this.connectionExist = this.selectedConnections.some(connection => connection.name === value.trim());
      this.connectionInvalid = !this.connections.some(connection => connection.name === value.trim())

      if ((value || '').trim() && !this.connectionInvalid && !this.connectionExist) {
        const connectionUserObj = this.getConnectionUserObj(value.trim());
        this.selectedConnections.push(connectionUserObj);
        this.selectedConnectionsIds.push(connectionUserObj.uid)
        this.connectionFormService.onConnectionsChanged.next({
          selectedConnections: this.selectedConnectionsIds,
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
      this.selectedConnectionsIds.splice(index, 1);
      this.connectionFormService.onConnectionsChanged.next({
        selectedConnections: this.selectedConnectionsIds,
        selectedConnectionsOrig: this.selectedConnectionsBeforeChanges
      });
    }
  }

  connectionSelected(event: MatAutocompleteSelectedEvent) {
    this.connectionExist = this.selectedConnections.includes(event.option.value);
    if (!this.connectionExist) {
      this.selectedConnections.push(event.option.value);
      this.connectionFormService.onConnectionsChanged.next({
        selectedConnections: this.selectedConnectionsIds,
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
