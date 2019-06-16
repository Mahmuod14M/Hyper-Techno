import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import 'bootstrap';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  router: Router = null;

  constructor(itemService: ItemService, router: Router, private storageService: StorageService) {

    this.router = router;
    if (localStorage.getItem('cart_items') !== null) {
      this.itemlist = JSON.parse(localStorage.getItem('cart_items'));
    }
    this.storageService.getCartObservable().subscribe({
      next: cartList => {
        console.log(cartList);
        this.itemlist = cartList;
      },
      error: err => {
        console.log('Subscribe error');
        console.log(err);
      }
    });

    itemService.brands().subscribe(data => {
      this.imgs = data.brand;
    });
    itemService.brands().subscribe(data => {
      this.brands = data.brand;
    });

    itemService.Categ().subscribe(data => {
      this.Categorys = data.category;
      data.category.forEach(mainCategory => {
        itemService.sub_catg(mainCategory.id).subscribe(subData => {
          this.subCategories.push({
            parent: mainCategory,
            categories: subData.category
          });
        });
      });
    });
  }

  mySlideImages = [1, 2, 3, 4, 5].map((i) => `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions = {items: 2, dots: true, nav: false};
  myCarouselOptions = {
    nav: true,
    navText: ['<img src=\'../../assets/img/icons/left.png\'>', '<img src=\'../../assets/img/icons/right.png\' >'],
    navClass: ['owl-prev', 'owl-next'],
    items: 5,
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
        items: 5,
      },
      1920: {
        items: 6,
      },
    }

  };

  imgs: any[] = [];

  brands: any[] = [];
  Categorys: any[] = [];
  Categories: any[] = [];
  subCategories: any[] = [];
  itemlist: any[] = [];
  text: any = '';
  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
  }


  handleMenuMouseEnter(event: Event, categoryId: number) {
    const elm = $('#dropdown-content-' + categoryId);
    const target = event.target as HTMLSelectElement;
    const off = elm.offset();
    const l = off.left;
    const w = elm.width();
    const docH = $('.containeer').height();
    const docW = $('.containeer').width();
    const isEntirelyVisible = (l + w <= docW);

    if (!isEntirelyVisible) {
      target.classList.add('edge');
    } else {
      target.classList.remove('edge');
    }

  }

  ngOnInit() {

    $('#cart').mouseover(() => {
      $('.card_text').fadeIn({queue: false, duration: 100});
      $('.card_text').animate({top: '40px'}, 100);
    });
    $('#cart').mouseleave(() => {
      $('.card_text').fadeOut({queue: false, duration: 100});
      $('.card_text').animate({top: '30px'}, 100);
    });
    $('#wishList').mouseover(() => {
      $('.wishlist_text').fadeIn({queue: false, duration: 100});
      $('.wishlist_text').animate({top: '40px'}, 100);
    });
    $('#wishList').mouseleave(() => {
      $('.wishlist_text').fadeOut({queue: false, duration: 100});
      $('.wishlist_text').animate({top: '30px'}, 100);
    });
    $('#profile').mouseover(() => {
      $('.profile_text').fadeIn({queue: false, duration: 100});
      $('.profile_text').animate({top: '40px'}, 100);
    });
    $('#profile').mouseleave(() => {
      $('.profile_text').fadeOut({queue: false, duration: 100});
      $('.profile_text').animate({top: '30px'}, 100);
    });
    const self = this;
    $('#search_btn').click(() => {
      self.text = $('input[name=search]').val();
      self.router.navigate(['product/search/', self.text]);
    });
    $('#search').click(() => {
      $('.search').toggle();
      $('.call').hide();
    });
    $('#call').click(() => {
      $('.call').toggle();
      $('.search').hide();
    });
    $('.log').click(() => {
      $('.login').toggle();
    });
    $('#btn').click(() => {
      $('#menu').toggle();
    });
    $('#cart').click(() => {
      $('.cart').toggle();

    });
    $('.close').click(() => {
      $('.cart').toggle();
    });
    $('.click').click(() => {
      $('.links').slideToggle(100);
    });
    $('.click1').click(() => {
      $('.links1').slideToggle(100);
    });

    $(document).ready(scroll);

    function scroll() {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
          $('.navbar').fadeIn(500);
        } else {
          $('.navbar').fadeOut(500);
        }
      });
    }
  }
}
