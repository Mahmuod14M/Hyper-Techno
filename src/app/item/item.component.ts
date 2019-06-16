import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../storage.service';

declare var $: any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ItemComponent implements OnInit {

  itemDetails: any[] = [];

  isInStock = false;

  constructor(private itemService: ItemService, private route: ActivatedRoute, private storageService: StorageService) {
    console.log(storageService);
  }

  mySlideImages = [1, 2, 3, 4, 5].map((i) => `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions = {items: 2, dots: true, nav: false};
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

  itemList: any[] = [];
  idList: any[] = [];
  addToCart = function (product) {
    this.storageService.addToCart(product.id);
    if (localStorage.getItem('cart_items') !== null) {
      this.itemList = JSON.parse(localStorage.getItem('cart_items'));
    }


    for (const item of this.itemList.length) {
      const id = item.id;
      this.idList.push(id);

    }
    const idFound = this.idList.includes(product.id);

    if (idFound === false) {
      this.itemList.push(product);
      localStorage.setItem('cart_items', JSON.stringify(this.itemList));


    }
  };
 imgChange(id) {
   const img = $('.imgs img');

   img.click(function() {
     const imgsrc = $(this).attr('src');
     $('.main-img img').attr('src', imgsrc);
   });
 }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');
      this.itemService.item_details(id).subscribe(data => {
        this.itemDetails = data;

      });
      this.itemService.item_details(id).subscribe(data => {
        this.isInStock = data.product.out_of_stock;

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
        'z-index': '6'
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
        'z-index': '6'
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
