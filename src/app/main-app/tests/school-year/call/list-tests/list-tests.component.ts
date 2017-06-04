import { Component, Input, OnChanges } from '@angular/core';
import { Test } from '../../../../db/test';
import { TestService } from '../../../../db/test.service';
import { i18nService } from '../../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-list-tests',
  templateUrl: './list-tests.component.html',
  styleUrls: ['./list-tests.component.css']
})
export class ListTestsComponent implements OnChanges {
  @Input() schoolYearId: number;
  @Input() callId: number;
  @Input() courseId: number;
  tests: Test[] = [];

  constructor(
    private i18nService: i18nService,
    private testService: TestService
  ) { }

  ngOnChanges() {
    this.getTests();
  }

  getTests() {
    this.testService.getCourseCallTests(this.callId, this.courseId)
    .then((tests) => {
      this.tests = tests;
    })
    .catch(() => this.i18nService.error(13, ''));
  }

  displayPDF(id: number) {
    this.testService.downloadPDF(id).subscribe(
        (res) => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        }
    );
  }

  downloadTEX(id: number) {
    this.testService.downloadTEX(id).subscribe(
        (res) => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        }
    );
  }

}
