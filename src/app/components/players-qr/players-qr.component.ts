import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/core/models/player.model';
import { PlayerService } from 'src/app/core/services/player.service';

@Component({
  selector: 'app-players-qr',
  templateUrl: './players-qr.component.html',
  styleUrls: ['./players-qr.component.css']
})
export class PlayersQrComponent implements OnInit {

  userLigue: Player= new Player();
  constructor(private route: ActivatedRoute,
              private navigation: Router,
              private userLigueService: PlayerService) { }

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
