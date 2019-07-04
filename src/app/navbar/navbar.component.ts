import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import {Product} from '../Models';
import 'bootstrap';

declare var $: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  router: Router = null;
  logIn: any = false;
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
  itemlist = this.storageService.getCartItems();
  text: any = '';

  logIN(form) {
    this.storageService.logIN(form);
    this.storageService.getUserObservable().subscribe({
      next: logIn => {
        this.logIn = JSON.parse(logIn);
        console.log(this.logIn.user.profile_pic);
        document.getElementById('imagePreview').style.backgroundImage = 'url(`https://arafa.000webhostapp.com/Hyper/uploads/` ' +
          '+ this.logIn.user.profile_pic)';
        console.log(document.getElementById('imagePreview'));
        console.log((`https://arafa.000webhostapp.com/Hyper/uploads/` + this.logIn.user.profile_pic));
      },
      error: err => {
      }
    });
  }

  removeId() {
    this.storageService.removeId();
    this.storageService.getUserObservable().subscribe({
      next: logIn => {
        this.logIn = JSON.parse(logIn);
        console.log(this.logIn.user.profile_pic);
        document.getElementById('imagePreview').style.backgroundImage = 'url(`https://arafa.000webhostapp.com/Hyper/uploads/` ' +
          '+ this.logIn.user.profile_pic)';
        console.log(document.getElementById('imagePreview'));
        console.log((`https://arafa.000webhostapp.com/Hyper/uploads/` + this.logIn.user.profile_pic));
      },
      error: err => {
      }
    });
  }

  constructor(private itemService: ItemService, router: Router, private storageService: StorageService) {

    this.router = router;
    this.storageService.getCartObservable().subscribe({
      next: cartList => {
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

  openNav = function openNav() {
    document.getElementById('mySidenav').style.width = '250px';
    const elem = document.querySelector('body');
    elem.style.position = 'relative';
    elem.style.left = '250px';
    $('.sliderBG').fadeIn();
  };

  /* Set the width of the side navigation to 0 */
  closeNav = function closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.querySelector('body').style.left = '0';
    $('.sliderBG').fadeOut();
  };
  removeItemFromCart = product => {
    this.storageService.removeFromCart(product);
  };


  handleMenuMouseEnter(event: Event, categoryId: number) {
    const elm = $('#dropdown-content-' + categoryId);
    const target = event.target as HTMLSelectElement;
    const off = elm.offset();
    const l = off.left;
    const w = elm.width();
    const docH = $('.containeer').height();
    const docW = $('.containeer').width();
    const isEntirelyVisible = (l + w <= docW);
    // console.log('elm', elm);
    // console.log('off', off);
    // console.log('target', target.offsetWidth);
    // console.log('l', l);
    // console.log('w', w);
    // console.log('docW', docW);
    // console.log('isEntirelyVisible', isEntirelyVisible);
    if (!isEntirelyVisible) {
      target.classList.add('edge');
    } else {
      target.classList.remove('edge');
    }

  }

  showCatgs(event: Event, categoryId: number) {
    $('#dropdown-content-' + categoryId).slideToggle();
  }

  edit() {
    $('#Edit').show(500);
  }

  edit2() {
    $('#Edit').hide(500);
  }
  close() {
    $('.cart').toggle();
  }
  closeLonIn() {
    $('#login').hide();
  }
  ngOnInit() {

    function readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          $('#imagePreview').css('background-image', 'url(' + reader.result + ')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    $('#imageUpload').change(function() {
      readURL(this);
    });

    $('.profileImg').mouseenter(() => {
      $('#Edit').show();
    });
    $('.profileImg').mouseleave(() => {
      $('#Edit').show();
    });
    this.storageService.getUserObservable().subscribe({
      next: logIn => {

        this.logIn = JSON.parse(logIn);
        console.log(this.logIn.user.profile_pic);
        document.getElementById('imagePreview').style.backgroundImage = 'url(`https://arafa.000webhostapp.com/Hyper/uploads/` ' +
          '+ this.logIn.user.profile_pic)';
        console.log(document.getElementById('imagePreview'));
        console.log((`https://arafa.000webhostapp.com/Hyper/uploads/` + this.logIn.user.profile_pic));
      },
      error: err => {
      }
    });
    this.logIn = StorageService.getUserData();
    $('.sliderBG').click(() => {
      document.getElementById('mySidenav').style.width = '0';
      document.querySelector('body').style.left = '0';
      $('.sliderBG').fadeOut();
    });
    $(() => {
      $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.nav-dropdown').toggle();
        // Close one dropdown when selecting another
        $('.nav-dropdown').not($(this).siblings()).hide();
        e.stopPropagation();
      });
    });

    const self = this;
    $('#search_btn').click(() => {
      self.text = $('input[name=search]').val();
      self.router.navigate(['product/search/', self.text]);
    });
    $('.log').click(() => {
      $('#login').toggle();
    });

    $('#btn').click(() => {
      $('#menu').toggle();
    });
    $('#cart').click(() => {
      $('.cart').toggle();

    });
    $('.close').click(() => {

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

window.onscroll = () => {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    const elem = document.getElementById('containeer');
    elem.style.position = 'fixed';
    elem.style.top = '0';
    elem.style.width = '100%';
    elem.style.height = '75px';
    elem.style.boxShadow = '0px 15px 10px -15px #111';
    elem.style.background = '#fff';
    elem.style.justifyContent = 'space-between';
    elem.style.zIndex = '5';
    $('#navbarLogo').show();
  } else {
    const elem = document.getElementById('containeer');
    elem.style.position = 'relative';
    elem.style.height = 'auto';
    elem.style.boxShadow = 'none';
    elem.style.justifyContent = 'space-evenly';
    elem.style.background = 'transparent';
    $('#navbarLogo').hide();
  }
}

