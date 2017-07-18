import { Component, Input } from '@angular/core';

/**
 * Generated class for the ExpandableComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @Input('expand') expand;
  @Input('expandHeight') expandHeight;

  currentHeight: number = 0;
  constructor() {
  }

  ngAfterViewInit(){
    console.log(this.expand);
    console.log(this.expandHeight);
  }

}
