import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {Subscription} from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {

  
  private entrySub: Subscription;
  myForm: FormGroup;
  showValue = false;
  constructor(private fb: FormBuilder) {}

   ngOnInit() {
    this.myForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: [
        "",
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]
    });

    

  }

  ngOnDestroy(): void {
    if (this.entrySub) {
      this.entrySub.unsubscribe();
      this.entrySub = null;
    }
  }

  

  onSubmit(): void {
    this.showValue = !this.showValue;
  }

  addRequired(): void {
    this.myForm
      .get("lastName")
      .setValidators([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]);
    this.myForm.get("lastName").updateValueAndValidity();
  }

  removeRequired(): void {
    this.myForm
      .get("lastName")
      .setValidators([Validators.minLength(5), Validators.maxLength(15)]);
    this.myForm.get("lastName").updateValueAndValidity();
  }
}
