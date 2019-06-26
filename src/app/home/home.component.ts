import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from '../storage.service';
import {ItemService} from '../item.service';
import 'bootstrap';

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private itemService: ItemService, private storageService: StorageService) {
    itemService.hotProduct(1).subscribe(data => {
      this.products = data.product;

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
    itemService.main_cat_items(1).subscribe(data => {
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

    console.log('Home INIT');
    this.storageService.getCartObservable().subscribe({
      next: id => {
        console.log(id);
      },
      error: err => {
        console.log('Subscribe error');
        console.log(err);
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

  offersOne: any[] = [];
  offersTwo: any[] = [];
  offersThree: any[] = [];
  offersFour: any[] = [];

  Arrivals: any[] = [];

  mainCat: any[] = [];

  brands: any[] = [];

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


  subscription = Subscription;
  onClickCart(id) {
    this.card = 'ADDED TO CART';
  }

  addToCart = function(product) {
    this.storageService.addToCart(product);
  };

  ngOnInit() {
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

