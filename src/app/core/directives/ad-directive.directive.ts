import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]'
})
export class AdDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
