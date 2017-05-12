import { AfterViewInit, Component, EventEmitter, Input } from '@angular/core';

import { Test } from '../../../../../db/test';
import { TestService } from '../../../../../db/test.service';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-delete-test',
  templateUrl: './delete-test.component.html'
})
export class DeleteTestComponent implements AfterViewInit {
  @Input() test: Test;
  @Input() tests: Test[];
  deleteTestModal = new EventEmitter<string|MaterializeAction>();

  constructor(
    private notificationsService: NotificationsService,
    private testService: TestService
  ) { }

  ngAfterViewInit() {
    (<any>$('#deleteTestModal' + this.test.id)).appendTo('body');
  }

  openDeleteTestModal() {
    this.deleteTestModal.emit({action:"modal",params:['open']});
  }

  deleteTest() {
    this.testService
    .delete(this.test.id)
    .then(() => {
      this.tests.splice(this.tests.indexOf(this.test), 1);
    })
    .catch(() => this.notificationsService.error('Error', 'Al eliminar el test ' + this.test.title));
  }

}
