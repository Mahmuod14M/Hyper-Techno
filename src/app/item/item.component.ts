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

  isInStock = false;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private storageService: StorageService) {
  }
  myCarouselOptions = {
    nav: true,
    navText: ['<img src=\'../../assets/img/icons/left.png\'>', '<img src=\'../../assets/img/icons/right.png\' >'],
    items: 7,
    dots: false,
    navigation: true,
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
  isItemDetailsReady = false;
  addToCart = function (product) {
    this.storageService.addToCart(product);
  };
 imgChange(id) {
   const img = $('.imgs img');

   img.click(function() {
     const imgsrc = $(this).attr('src');
     $('.main-img img').attr('src', imgsrc);
   });
 }
  itemHover() {
    window.scrollTo(0, 0);

  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.paramMap.subscribe(params => {

      const id = params.get('id');
      this.itemService.item_details(id).subscribe(data => {
        this.productDetails = data.product;
        this.relatedProducts = data.related;

      });
      this.itemService.item_details(id).subscribe(data => {
        this.isInStock = data.product.out_of_stock;

      });
      this.isItemDetailsReady= true;
      if (this.isItemDetailsReady ) {
        $(window).scrollTop();
        $('#loading').fadeOut(3000);
        $('.data').show();
      }

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
