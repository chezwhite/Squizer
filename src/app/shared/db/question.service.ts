import { Injectable, Inject } from '@angular/core';
import { Headers, Http }      from '@angular/http';
import { ApiConfig }          from '../web-api/api-config';
import { IApiConfig }         from '../web-api/api-config.interface';
import { Question }           from './question';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {
  private url = this.config.apiEndpoint + 'questions/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    @Inject(ApiConfig) private config: IApiConfig
  ) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(question: Question): Promise<Question> {
    return this.http
      .post(this.url, JSON.stringify(question), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(question: Question): Promise<Question> {
    const url = `http://127.0.0.1:8000/update-question/${question.id}/`;
    return this.http
      .put(url, JSON.stringify(question), {headers: this.headers})
      .toPromise()
      .then(() => question)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.url}${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

}
