import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import 'bootstrap';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private itemService: ItemService, private storageService: StorageService, private router: Router) {}
  products: any[] = [];
  item: any[] = [];
  homePhoto: any[] = [];
  categories: any[] = [];
  Arrivals: any[] = [];
  mainCat: any[] = [];
  brands: any[] = [];
  itemListIDS: any[] = [];
  wishListIDS: any[] = [];
  isCategoryReady = false;
  isHomePageReady = false;
  isArrivalReady = false;
  isBrandsReady = false;
  myCarouselOptions = {
    nav: true,
    navText: ['<img src=\'../../assets/img/icons/left.png\'>', '<img src=\'../../assets/img/icons/right.png\' >'],
    items: 7,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    loop: true,
    responsive: {
      // breakpoint from 0 up
      0: {
        items: 1,
      },
      // breakpoint from 480 up
      350: {
        items: 1,
      },
      375: {
        items: 2,
      },
      690: {
        items: 4,
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
  slider1 = {
    items: 7,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
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

  routerLink(photo: any) {
    const index = this.homePhoto.indexOf(photo);
    if (this.homePhoto[index].id_brand != null) {
      const ids = this.homePhoto[index].id_brand;
      this.router.navigate(['/product/Brand/' + ids]);
    } else if (this.homePhoto[index].id_category != null) {
      const ids = this.homePhoto[index].id_category;
      this.router.navigate(['/product/mainCat/' + ids]);
    } else if (this.homePhoto[index].id_product != null) {
      const ids = this.homePhoto[index].id_product;
      this.router.navigate(['/item/' + ids]);
    } else {
    }
  }

  addToCart = function(product) {
    this.storageService.addToCart(product);
  };
  addToWishList = function(product) {
    this.storageService.addTOWishList(product);
  };
  removeToWishList = function(id) {
    this.storageService.removeToWishList(id);
  };
  ngOnInit() {
    this.itemService.hotProduct(1).pipe(delay(5000)).subscribe(data => {
      this.products = data.product;
    });
    this.itemService.homePageRequest().pipe(delay(5000)).subscribe(data => {
      this.homePhoto = data.promotions;
      this.categories = data.categories;
      this.isHomePageReady = true;
      this.isCategoryReady = true;
      this.brands = data.brands;
      this.isBrandsReady = true;
      if (this.isCategoryReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut();
        $('.data').show();
      }
    });
    this.itemService.newArrivals(1).pipe(delay(5000)).subscribe(data => {
      this.Arrivals = data.product;
      this.isArrivalReady = true;
      if (this.isCategoryReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut();
        $('.data').show();
      }
    });
    this.itemService.main_cat_items(1, 1).pipe(delay(5000)).subscribe(data => {
      this.mainCat = data.product;
      this.isArrivalReady = true;
      if (this.isCategoryReady && this.isHomePageReady && this.isArrivalReady && this.isBrandsReady) {
        $(window).scrollTop();
        $('#loading').fadeOut();
        $('.data').show();
      }
    });


    // this.storageService.getCartItems();
    // this.storageService.getwishListItems();
    this.storageService.getCartObservable().subscribe(data => {
      this.itemListIDS=[];
      for (const product of data) {
        this.itemListIDS.push(product.id);
      }
    });
    this.storageService.getwishListObservable().subscribe(data => {
      this.wishListIDS=[];
      for (const product of data) {
        this.wishListIDS.push(product.id);
      }
    });
    window.scrollTo(0, 0);
    $('.owl-prev').css({
      position: 'absolute',
      top: '30px',
      left: '0px',
      outline: 'none'
    });
  }

}

