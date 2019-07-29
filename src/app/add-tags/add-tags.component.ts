import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import _ from 'lodash'
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.css']
})
export class AddTagsComponent implements OnInit {

  @Output() emitTags = new EventEmitter<any[]>();
  tagInput: String;
  @Input() tags: any[];
  btnName = 'Add Tags'
  @Output() closeModal = new EventEmitter();
  constructor(private commonService: CommonService) { }
  ngOnInit(): void {

    if (this.commonService.tags.length) {
      localStorage.clear();
      this.tags = [];
      this.btnName = 'Save'
      this.tagInput = this.commonService.tags.join(',');
    }

  }
  addTags() {
    if (this.tagInput.includes('\n')) {
      this.tags = _.concat(this.tags, this.tagInput.split('\n'))
      this.tags = this.seperateByComma(this.tags)
      this.tags = this.seperateBySemicolon(this.tags)
    } else if (this.tagInput.includes(',')) {
      this.tags = _.concat(this.tags, this.tagInput.split(','))
      this.tags = this.tags, this.seperateBySemicolon(this.tags)
    } else if (this.tagInput.includes(';')) {
      this.tags = _.concat(this.tags, this.tagInput.split(';'));
    } else {
      this.tags = _.concat(this.tags, this.tagInput);
    }
    this.tags = this.filterNumbers(this.tags);
    if (localStorage.getItem('tags')) {
      localStorage.clear()
    }
    localStorage.setItem('tags', JSON.stringify(this.tags));
    this.tagInput = '';
    this.emitTags.emit(this.tags)
    this.closeModal.emit();
  }
  seperateByComma(tags) {
    let newArr = []
    tags.forEach(tag => {
      if (tag.includes(',')) {
        newArr = _.concat(newArr, tag.split(','))
      } else {
        newArr = _.concat(newArr, tag)
      }
    })
    return newArr;
  }
  seperateBySemicolon(tags) {
    let newArr = []
    tags.forEach(tag => {
      if (tag.includes(';')) {
        newArr = _.concat(newArr, tag.split(';'))
      } else {
        newArr = _.concat(newArr, tag)
      }
    })
    return newArr
  }
  filterNumbers(tags) {
    return tags.filter(tag => Number(tag) === 0 || Number(tag) );
  }
}
