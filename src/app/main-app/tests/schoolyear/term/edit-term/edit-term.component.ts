import { AfterViewInit, Component, EventEmitter, Inject, Input } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';

import { Term } from '../../../../db/term';
import { TermService } from '../../../../db/term.service';
import { TestsSideNavService } from '../../../../navbars/tests-sidenav/tests-sidenav.service';
import { APP_CONFIG } from '../../../../../shared/app-config/app-config';
import { IAppConfig } from '../../../../../shared/app-config/iapp-config';

import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';
import { I18nService } from '../../../../../shared/i18n/i18n.service';

@Component({
  selector: 'app-edit-term',
  templateUrl: './edit-term.component.html',
  styleUrls: ['./edit-term.component.css']
})
export class EditTermComponent implements AfterViewInit {
  @Input() term: Term;
  editTermForm: FormGroup;
  editTermModal = new EventEmitter<string|MaterializeAction>();
  maxLengthTerm: number;

  constructor(
    @Inject(APP_CONFIG) private config: IAppConfig,
    private fb: FormBuilder,
    private termService: TermService,
    private testsSideNavService: TestsSideNavService,
    private i18nService: I18nService
  ) {
    this.maxLengthTerm = config.MAXLENGTH_CALL;
    this.createForm();
  }

  ngAfterViewInit() {
    (<any>$('#editTermModal' + this.term.id)).appendTo('body');
  }

  openEditTermModal() {
    this.editTermModal.emit({action: 'modal', params: ['open']});
  }

  createForm() {
    this.editTermForm = this.fb.group({
      id: 0,
      schoolyear: 0,
      title: ['', [Validators.required, Validators.maxLength(this.maxLengthTerm)]],
      start_date: [new Date(), [Validators.required]],
      end_date: [new Date(), [Validators.required]]
    });
  }

  onSubmit() {
    /* Set IDs */
    this.editTermForm.value.id = this.term.id;
    this.editTermForm.value.schoolyear = this.term.schoolyear;

    /* Update Term */
    this.termService.update(this.editTermForm.value)
    .then(term => {
      this.term.title = term.title;
      this.term.start_date = term.start_date;
      this.term.end_date = term.end_date;
      this.testsSideNavService.updateTerm(term);
    })
    .catch(() => {
      this.i18nService.error(12, this.editTermForm.value.title);
    });
  }

}
