import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ItemService} from '../item.service';
import {StorageService} from '../storage.service';
import 'bootstrap';
import Popper from 'popper.js';

declare var $: any;


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavbarComponent implements OnInit {
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
        items: 2,
      },
      // breakpoint from 480 up
      480: {
        items: 3,
      },
      // breakpoint from 768 up
      375: {
        items: 4,
      },
      1024: {
        items: 6,
      },
      1440: {
        items: 7,
      },
      1920: {
        items: 9,
      },
    }
  };
  brands: any[] = [];
  Categorys: any[] = [];
  Categories: any[] = [];
  subCategories: any[] = [];
  itemlist: any[] = [];
  text: any = '';
  MyOrders = 'MyOrders';
  MyAddresses = 'MyAddresses';
  MyProfile = 'MyProfile';
  mouseHover= false;

  logIN(form) {
    this.storageService.logIN(form);
    $('#login').toggle();
  }

  removeId() {
    this.storageService.removeId();
    $('#login').toggle();
  }

  constructor(private itemService: ItemService, private router: Router, private storageService: StorageService) {
    this.storageService.getUserObservable().subscribe({
      next: logIn => {
        this.logIn = JSON.parse(logIn);
        document.getElementById('imagePreview').style.backgroundImage = 'url(`https://arafa.000webhostapp.com/Hyper/uploads/` ' +
          '+ this.logIn.user.profile_pic)';
      },
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
  removeItemFromCart = productID => {
    this.storageService.removeFromCart(productID);
  }

  showCard(id) {
    $('#dropCard' + id).show();
    $('#dropCard' + id).mouseover(()=> {
      this.mouseHover= true;
    } );
  }
  mouseOver(id) {
    $('#dropCard' + id).show();
    $('#dropBtn' + id).css('color','#d93232');
    $('#dropBtn' + id).css('border-bottom','2px solid #d93232');
  }
  mouseLeave(id) {
    $('#dropCard' + id).delay(3000).hide();
    $('#dropBtn' + id).css('color',' #95979a');
    $('#dropBtn' + id).css('border-bottom','none');
  }
  hideCard(id) {
    $('#dropCard' + id).hide();
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

  hideLogin() {
    $('#login').toggle();
  }

  ngOnInit() {
    this.storageService.getCartObservable().subscribe({
      next: cartList => {
        this.itemlist = cartList;
      },
    });
    this.storageService.getCartItems();
    $(window).scroll(function() {
      if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
      } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
      }
    });
    $('#return-to-top').click(() => {      // When arrow is clicked
      $('body,html').animate({
        scrollTop: 0                       // Scroll to top of body
      }, 500);
    });

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
        document.getElementById('imagePreview').style.backgroundImage = 'url(`https://arafa.000webhostapp.com/Hyper/uploads/` ' +
          '+ this.logIn.user.profile_pic)';
      },
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
    $('#search-input').keypress(e => {
      const key = e.which;
      if (key === 13) {
        self.text = $('input[name=search]').val();
        self.router.navigate(['product/search/', self.text]);
        return false;
      }
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
    $('.click').click(() => {
      $('.links').slideToggle(100);
    });
    $('.click1').click(() => {
      $('.links1').slideToggle(100);
    });
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
    $('.containeer').css('justify-content','space-between');
  } else {
    const elem = document.getElementById('containeer');
    elem.style.position = 'relative';
    elem.style.height = 'auto';
    elem.style.boxShadow = 'none';
    elem.style.justifyContent = 'space-evenly';
    elem.style.background = 'transparent';
    $('#navbarLogo').hide();
    if ( $( window ).width()>800) {
      $('.containeer').css('justify-content','space-evenly');
    } else {
      $('.containeer').css('justify-content','flex-end');
    }
  }

}

