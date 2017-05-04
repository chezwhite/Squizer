import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Test } from '../../../../db/test';
import { TestService } from '../../../../db/test.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-list-tests',
  templateUrl: './list-tests.component.html',
  styleUrls: ['./list-tests.component.css']
})
export class ListTestsComponent implements OnChanges, OnInit {
  @Input() callId: number;
  @Input() courseId: number;
  tests: Test[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private testService: TestService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getTests();
  }

  getTests() {
    this.testService
    .getCourseCallTests(this.callId, this.courseId)
    .then((tests) => {
      this.tests = tests;
    })
    .catch(() => this.notificationsService.error('Error', 'Al descargar tests.'));
  }

}