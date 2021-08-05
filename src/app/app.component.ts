import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {Subscription} from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import axios from "axios";
import { CommonServiceService } from "./core/services/common-service.service";

// const unregister = fetchIntercept.register({
//   request: function (url, config) {
//       // loading triggered
//       this.load = true;
 
//       setTimeout(() => {
//           // loader stops after 5s
//           this.load = false,
//           // ..
//           this.register = true;
//       }, 5000)
//       return [url, config];
//   },

//   requestError: function (error) {
//       // Called when an error occured during another 'request' interceptor call
//       return Promise.reject(error);
//   },

//   response: function (response) {
//       // Modify the reponse object
//       return response;
//   },

//   responseError: function (error) {
//       // Handle an fetch error
//       return Promise.reject(error);
//   }
// });


@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {

  public loading = false;
  private entrySub: Subscription;
  myForm: FormGroup;
  showValue = false;
  constructor(private fb: FormBuilder,
              private commonServ: CommonServiceService<String>) {}

   ngOnInit() {
    // this.myForm = this.fb.group({
    //   firstName: ["", Validators.required],
    //   lastName: [
    //     "",
    //     Validators.required,
    //     Validators.minLength(5),
    //     Validators.maxLength(15)
    //   ]
    // });
    // unregister();
    
    

  }

  ngOnDestroy(): void {
    // if (this.entrySub) {
    //   this.entrySub.unsubscribe();
    //   this.entrySub = null;
    // }
  }

  

  onSubmit(): void {
    // this.showValue = !this.showValue;
  }

  // addRequired(): void {
  //   this.myForm
  //     .get("lastName")
  //     .setValidators([
  //       Validators.required,
  //       Validators.minLength(5),
  //       Validators.maxLength(15)
  //     ]);
  //   this.myForm.get("lastName").updateValueAndValidity();
  // }

  // removeRequired(): void {
  //   this.myForm
  //     .get("lastName")
  //     .setValidators([Validators.minLength(5), Validators.maxLength(15)]);
  //   this.myForm.get("lastName").updateValueAndValidity();
  // }


  // private confReqInterceptor=()=>{
  //   axios.interceptors.request.use((req)=>{
  //     const url = req.url;
  //     if(url.includes('oauth/token')){
  //       return req;
  //     }
  //     const token = this.commonServ.getToken();
  //     if(token){
  //       req.headers.Authorization = `Bearer ${token}`
  //     }
  //     return req;
  //   }, (error)=>{
  //     return Promise.reject(error);
  //   });
  // }

  // private configureResponseInterceptor=()=>{
  //   // const url: string = requesponse
  // }
}
