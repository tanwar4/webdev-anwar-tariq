/**
 * Created by tariq on 10/25/2017.
 */
import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';
import {AfterViewInit} from '@angular/core';
import {WidgetService} from "../services/widget.service.client";
declare var jQuery: any;

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective implements AfterViewInit {

  @Output() newIndexes = new EventEmitter(); // this will emit an event for the parent                                             component or the directive calling component

  initialIndex: any;

  constructor(private el: ElementRef,private widgetService:WidgetService) {}
  ngAfterViewInit() {
    this.appSortable(this);
  }

  appSortable(refe) {
    jQuery(this.el.nativeElement).sortable({
      axis: 'y',
      start: function (event, ui) {
        console.log('Old position: ' + ui.item.index());
        refe.initialIndex = ui.item.index();
      },
      stop: function (event, ui) {
        console.log('New position: ' + ui.item.index());
        refe.newIndexes.emit({
          startIndex: refe.initialIndex,
          endIndex: ui.item.index()});
      }
    });
  }
}
