import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLigue } from 'src/app/core/models/user-ligue.model';
import { User } from 'src/app/core/models/user.model';
import { UserLigueService } from 'src/app/core/services/user-ligue.service';

@Component({
  selector: 'app-players-qr',
  templateUrl: './players-qr.component.html',
  styleUrls: ['./players-qr.component.css']
})
export class PlayersQrComponent implements OnInit {

  userLigue: UserLigue= new UserLigue();
  constructor(private route: ActivatedRoute,
              private navigation: Router,
              private userLigueService: UserLigueService) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      var pattern = /^\d+$/;
      console.log("--------> ", params);
      // if(params && pattern.test(params.toString())){
      this.userLigueService.getById(params.txt).then(usr=>{
        usr.text().then(urstxt=>{
          console.log("--------> ", urstxt);
          let usrJson = JSON.parse(urstxt);
          this.userLigue = usrJson;

        });
      });
      // }
    }
  );
  }

  openCamera =()=>{
    this.navigation.navigate(['/camera-qr']);
  }
}
