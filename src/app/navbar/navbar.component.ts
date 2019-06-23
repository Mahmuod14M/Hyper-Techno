import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import 'bootstrap';

declare var $: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  router: Router = null;
  /* Set the width of the side navigation to 250px */
  openNav = function openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    document.querySelector('body').style.marginLeft = '250px';
  $('.sliderBG').fadeIn();
  }

  /* Set the width of the side navigation to 0 */
  closeNav = function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.querySelector('body').style.marginLeft = '0';
    $('.sliderBG').fadeOut();
  };




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
    navClass: ['owl-prev', 'owl-next'],
    items: 5,
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

    // tslint:disable-next-line:only-arrow-functions
    $(function() { // DOM ready
      // If a link has a dropdown, add sub menu toggle.
      $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        // Close one dropdown when selecting another
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });
      // Clicking away from dropdown will remove the dropdown class
      // tslint:disable-next-line:only-arrow-functions
      // $('html').click(function() {
      //   $('#menu').hide();
      // });
      // Toggle open and close nav styles on click
      // tslint:disable-next-line:only-arrow-functions
      $('#nav-toggle').click(function() {
        $('#menu').slideToggle('medium', function() {
          if ($(this).is(':visible'))
            $(this).css('display','flex');
        });
      });
      // Hamburger to X toggle
      $('#nav-toggle').on('click', function() {
        this.classList.toggle('active');
      });
    });
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
    $('.log').click(() => {
      $('#login').toggle();
    });
    $('#Register').click(() => {
      $('#login').toggle();
    });
    $('#password').click(() => {
      $('#login').toggle();
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
    $('#viewCart').click(() => {
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
      $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
          $('.navbar').fadeIn(500);
        } else {
          $('.navbar').fadeOut(500);
        }
      });
    }
  }
}

