import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  tags = [];
  constructor() { }

  setTags(tags) {
    this.tags = tags;
  }
}
