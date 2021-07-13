import {  Injectable } from '@angular/core';
import {  Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService<T> {

  private subcription = new Subject<T>();
  
  constructor() { }

  getemited(): Observable<T> {
    return this.subcription.asObservable();
  }

  emit(message: T) {
    this.subcription.next(message)
  }
}
