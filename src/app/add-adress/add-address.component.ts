import {Component, OnInit} from '@angular/core';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  addressDetails: any = null;
  private id: number = null;

  address(form) {
    this.storageService.address(this.id, form);

  }
  constructor(private itemService: ItemService, private storageService: StorageService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id !== null) {
        this.itemService.get_user_address_By_id(this.id).subscribe(data => {
          this.addressDetails = data.address;
        });
      }
    });
  }

}
