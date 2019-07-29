import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import _ from 'lodash';
import { CommonService } from './services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularTask';
  tagInput: String;
  tags = [];
  modalRef: BsModalRef;

  ngOnInit(): void {
    if (localStorage.getItem('tags')) {
      this.tags = JSON.parse(localStorage.getItem('tags')) || [];
    }
  }
  constructor(private modalService: BsModalService, private commonService: CommonService) { }
  editTags(template: TemplateRef<any>) {
    this.commonService.setTags(this.tags);
    this.modalRef = this.modalService.show(template);
  }
  setTags(tags) {
    this.tags = tags;
  }
  removeTag(index) {
    this.tags.splice(index, 1);
    localStorage.setItem('tags', JSON.stringify(this.tags));
  }
  checkPositive(tag) {
    return tag >= 0;
  }
  checkNegative(tag) {
    return tag < 0;
  }
}
