import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '@services/authentication.service';

import { Account } from '@models/account.model';

interface Friend {
  name: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: Account;

  friends: Friend[];

  constructor(private authenticationService: AuthenticationService) {}

  retrieveFriends(): Friend[] {
    return [
      {
        name: 'Thamara',
        image: 'https://robohash.org/quismaximefuga.png?size=150x150&set=set1',
      },
      {
        name: 'Paulo',
        image: 'https://robohash.org/possimusautemnecessitatibus.png?size=150x150&set=set1',
      },
      {
        name: 'Marcilene',
        image: 'https://robohash.org/estquisquamquaerat.png?size=150x150&set=set1',
      },
      {
        name: 'Lívia',
        image: 'https://robohash.org/suscipitcommodiunde.png?size=150x150&set=set1',
      },
      {
        name: 'Gustavo',
        image: 'https://robohash.org/omniseasapiente.png?size=150x150&set=set1',
      },
    ];
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.friends = this.retrieveFriends();
  }
}
