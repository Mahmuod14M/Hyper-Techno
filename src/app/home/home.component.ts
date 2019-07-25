import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import 'bootstrap';
import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private itemService: ItemService, private storageService: StorageService , private router: Router) {
    itemService.hotProduct(1).subscribe(data => {
      this.products = data.product;
      console.log('hotProduct');
      for (let i = 0; i < 8; i++) {
        this.item.push(data.product[i]);
      }
      this.isHotProductReady = true;
      if (this.isCategoryReady && this.isHotProductReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop(0);
        $('#loading').fadeOut(2000);
        $('.data').show();
      }

    });

    itemService.homePageRequest().subscribe(data => {
      this.homePhoto = data.promotions;

      this.offersOne = data.promotions[0];
      this.offersTwo = data.promotions[1];
      this.offersThree = data.promotions[2];
      this.offersFour = data.promotions[3];
      this.isHomePageReady = true;

      if (this.isCategoryReady && this.isHotProductReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut(2000);
        $('.data').show();
      }
    });

    itemService.homePageRequest().subscribe(data => {
      this.categories = data.categories;
      this.isCategoryReady = true;
      if (this.isCategoryReady && this.isHotProductReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut(2000);
        $('.data').show();
      }
    });


    itemService.newArrivales(1).subscribe(data => {
      this.Arrivals = data.product;
      this.isArrivalReady = true;
      if (this.isCategoryReady && this.isHotProductReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut(2000);
        $('.data').show();
      }

    });
    itemService.main_cat_items(1, 1).subscribe(data => {
      this.mainCat = data.product;
      this.isArrivalReady = true;
      if (this.isCategoryReady && this.isHotProductReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut(2000);
        $('.data').show(2200);
      }

    });


    itemService.brands().subscribe(data => {
      this.brands = data.brand;
      this.isBrandsReady = true;
      if (this.isCategoryReady && this.isHotProductReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut(2000);
        $('.data').show();
      }
    });


    this.storageService.getCartObservable().subscribe({
      next: id => {
      },
      error: err => {
      }
    });
  }
  card ='ADD TO CART';

  itemList: any[] = [];
  idList: any[] = [];

  products: any[] = [];
  item: any[] = [];
  homePhoto: any[] = [];
  categories: any[] = [];

  offersOne: any;
  offersTwo: any[] = [];
  offersThree: any[] = [];
  offersFour: any[] = [];

  Arrivals: any[] = [];

  mainCat: any[] = [];

  brands: any[] = [];
  itemListIDS: any[] = [];

  isCategoryReady = false;
  isHotProductReady = false;
  isHomePageReady = false;
  isArrivalReady = false;
  isBrandsReady = false;
  myCarouselOptions = {
    nav: true,
    navText: ['<img src=\'../../assets/img/icons/left.png\'>', '<img src=\'../../assets/img/icons/right.png\' >'],
    items: 7,
    dots: false,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    loop: true,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1,
      },
      // breakpoint from 480 up
      350: {
        items:1,
      },
      375: {
        items: 2,
      },
      690: {
        items:4,
      },
      // breakpoint from 768 up
     768: {
       items: 5,
     },
      1024: {
        items: 5,
      },
      1440: {
        items: 8,
      },
      1920: {
        items: 9,
      },
    }
  };

  routerLink(photo: any) {
    const index = this.homePhoto.indexOf(photo);
    if (this.homePhoto[index].id_brand != null) {
      const ids = this.homePhoto[index].id_brand;
      this.router.navigate(['/product/Brand/'+ids]);
    } else if (this.homePhoto[index].id_category != null) {
      const ids = this.homePhoto[index].id_category;
      this.router.navigate(['/product/mainCat/'+ids]);
    } else if (this.homePhoto[index].id_product != null) {
      const ids = this.homePhoto[index].id_product;
      this.router.navigate(['/item/'+ids]);
    } else {
    }
  }
  slider1 = {
    items: 7,
    dots: false,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    loop: true,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1,
      },
      // breakpoint from 480 up
      480: {
        items: 2,
      },
      // breakpoint from 768 up
      375: {
        items: 3,
      },
      1024: {
        items: 4,
      },
      1440: {
        items: 7,
      },
      1920: {
        items: 6,
      },
    }
  };


  private subscription = Subscription;
  addToCart = function(product) {
    this.storageService.addToCart(product);
  };

  ngOnInit() {
    console.log('ngOnInit');
    this.storageService.getCartItems();
    this.storageService.getCartObservable().subscribe(data => {
      for (const product of data) {
        this.itemListIDS.push(product.id);
      }
    });
    window.scrollTo(0, 0);
    $( '.owl-prev').css({
      position:'absolute',
      top: '30px',
      left: '0px',
      outline: 'none'
    });

  }

  ngOnDestroy(): void {
  }
}

