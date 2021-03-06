import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../storage.service';
import {Product} from '../Models';

declare var $: any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ItemComponent implements OnInit {

  productDetails: Product;
  relatedProducts: Product[];
  itemListIDS: any[] = [];
  wishListIDS: any[] = [];
  isInStock = false;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private storageService: StorageService) {}
  myCarouselOptions = {
    nav: true,
    navText: ['<img src=\'../../assets/img/icons/left.png\'>', '<img src=\'../../assets/img/icons/right.png\' >'],
    items: 7,
    dots: false,
    navigation: true,
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
  isItemDetailsReady = false;
  addToCart = function(product) {
    this.storageService.addToCart(product);
  };
 imgChange() {
   const img = $('.imgs img');
   const main= $('.main-img img');
   main.mouseenter(function() {
     const imgsrc = $(this).attr('src');
     $('.imgOver img').attr('src', imgsrc);
     $('.imgOver').css('display','flex');
     $('.imgOver').show();
   });
   img.mouseenter(function() {
     const imgsrc = $(this).attr('src');
     $('.imgOver img').attr('src', imgsrc);
     $('.imgOver').css('display','flex');
     $('.imgOver').show();
   });
 }
  hideImg() {
    $('.imgOver').hide();
  }
  itemHover() {
    window.scrollTo(0, 0);
    this.isItemDetailsReady = false;
    $('#loading').show();
    $('.data').hide();
  }
  addToWishList = function(product) {
    this.storageService.addTOWishList(product);
  };
  removeToWishList = function(id) {
    this.storageService.removeToWishList(id);
  };
  ngOnInit() {
    this.storageService.getCartItems();
    this.storageService.getwishListItems();
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
    this.route.paramMap.subscribe(params => {

      const id = params.get('id');
      this.itemService.item_details(id).subscribe(data => {
        this.productDetails = data.product;
        this.relatedProducts = data.related;
        this.isInStock = data.product.out_of_stock;
        this.isItemDetailsReady= true;
        console.log(   this.productDetails);
        if (this.isItemDetailsReady) {
          $(window).scrollTop();
          $('.data').show();
          $('#loading').fadeOut(1000);
        }
      });
    });


    $('.main-img span').click(() => {
      $('.img_zoom').fadeIn();

      const imgSrc = $('.main-img img').attr('src');
      $('.img_zoom img').attr('src', imgSrc);


    });

    $('.img_zoom span').click(() => {
      $('.img_zoom').fadeOut();
    });


    $('.btn1').click(() => {
      $('.btn1').css({
        'background-color': 'white',
        'padding-top': '15px',
        'border-bottom': '1px solid #fff'
      });
      $('.btn2').css({
        'background-color': '#e4e2e2',
        'padding-top': '7px',
        'border-bottom': '1px solid #c3c1c1'
      });
      $('.btn3').css({
        'background-color': '#e4e2e2',
        'padding-top': '7px',
        'border-bottom': '1px solid #c3c1c1'
      });
      $('.Discreption').show();
      $('.Information').hide();
      $('.Reviws').hide();
    });

    $('.btn2').click(() => {
      $('.btn2').css({
        'background-color': 'white',
        'padding-top': '15px',
        'border-bottom': '1px solid #fff',
        'z-index': '2'
      });
      $('.btn1').css({
        'background-color': '#e4e2e2',
        'padding-top': '7px',
        'border-bottom': '1px solid #c3c1c1'

      });
      $('.btn3').css({
        'background-color': '#e4e2e2',
        'padding-top': '7px',
        'border-bottom': '1px solid #c3c1c1'
      });
      $('.Discreption').hide();
      $('.Information').show();
      $('.Reviws').hide();
    });

    $('.btn3').click(() => {
      $('.btn3').css({
        'background-color': 'white',
        'padding-top': '15px',
        'border-bottom': '1px solid #fff',
        'z-index': '2'
      });
      $('.btn2').css({
        'background-color': '#e4e2e2',
        'padding-top': '7px',
        'border-bottom': '1px solid #c3c1c1'
      });
      $('.btn1').css({
        'background-color': '#e4e2e2',
        'padding-top': '7px',
        'border-bottom': '1px solid #c3c1c1'
      });
      $('.Discreption').hide();
      $('.Information').hide();
      $('.Reviws').show();
    });


    // $(".add").click(function () {

    //   var name =$("#itemName").val()

    //   localStorage.setItem("cart_items", name );

    //   console.log(name)
    // })


  }

}
