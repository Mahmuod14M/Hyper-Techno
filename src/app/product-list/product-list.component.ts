import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {Options, LabelType} from 'ng5-slider';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';

declare var $: any;
// @ts-ignore
const Swal = require('sweetalert2');

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {


  constructor(private itemService: ItemService, private route: ActivatedRoute, private storageService: StorageService, private router: Router) {
  }

  id: number;
  minValue: number;
  maxValue: number;
  options: Options = {
    floor: 0,
    ceil: 500
  };
  items: any[] = [];
  filter: any;
  data: any;
  brandsId: any[] = [];
  categoriesId: any[] = [];
  categoryAttrs: any[] = [];
  categoryId: any[] = [];
  private text: string;
  disableScroll = false;
  pageCount = 1;
  isPageDataReady = false;
  itemListIDS: any[] = [];
  wishListIDS: any[] = [];
  pagProducts: any[] = [];
  pageTitle = 'OUR PRODUCTS';
  itemsCount = '';
  showLoader = function() {
    this.isPageDataReady = false;
    $('#loading').fadeIn();
    $('body,html').animate({
      scrollTop: 0                       // Scroll to top of body
    }, 500);
    $('.data').hide();
  };
  hideLoader = function() {
    // TODO show Loader
    this.isPageDataReady = true;
    $('#loading').fadeOut();
    $('body,html').animate({
      scrollTop: 0                       // Scroll to top of body
    }, 500);
    $('.data').show();
  };

  // tslint:disable-next-line:variable-name
  filterChange(event, minValue: number, maxValue: number, brandID: number, categoryID: number, subCatID: number, main_cats: number) {
    this.showLoader();
    if (event.currentTarget) {
      if (event.currentTarget.checked) {
        if (brandID != null) {
          this.brandsId.push(brandID);
        } else if (categoryID != null) {
          this.categoriesId.push(categoryID);
        } else if (subCatID != null) {
          this.categoryAttrs.push(subCatID);
        } else if (main_cats != null) {
          this.categoryId.push(main_cats);
        }
      } else {
        if (brandID != null) {
          for (let index = 0; index < this.brandsId.length; index++) {
            if (this.brandsId[index] === brandID) {
              this.brandsId.splice(index, 1);
            }
          }
        } else if (categoryID != null) {
          for (let index = 0; index < this.categoriesId.length; index++) {
            if (this.categoriesId[index] === categoryID) {
              this.categoriesId.splice(index, 1);
            }
          }
        } else if (subCatID != null) {
          for (let index = 0; index < this.categoryAttrs.length; index++) {
            if (this.categoryAttrs[index] === subCatID) {
              this.categoryAttrs.splice(index, 1);
            }
          }
        } else if (main_cats != null) {
          for (let index = 0; index < this.categoryId.length; index++) {
            if (this.categoryId[index] === main_cats) {
              this.categoryId.splice(index, 1);
            }
          }
        }
      }
    }
    this.applyFilter({
      brands: this.brandsId, cats: this.categoriesId, query: this.text ? this.text : '', cat_attrs_values: this.categoryAttrs,
      max_price: this.maxValue, min_price: this.minValue, main_cats: this.categoryId
    });
  }

  applyFilter = function(payload) {
    console.log('payload',payload);
    this.itemService.search(payload, this.pageCount).subscribe(data => {
      this.items = [];
      for (const item of data.product) {
        this.items.push(item);
      }
      this.disableScroll = false;
      if (data.filter.brands.length > this.filter.brands.length) {
        this.filter.brands = data.filter.brands;
      }
      if (data.filter.categories.length > this.filter.categories.length) {
        this.filter.categories = data.filter.categories;
      }
      this.filter.category_attributes = data.filter.category_attributes ? data.filter.category_attributes : [];
      this.maxValue = data.filter.max_price;
      this.minValue = data.filter.min_price;
      this.options = {
        floor: data.filter.min_price,
        ceil: data.filter.max_price,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return 'LE ' + value;
            case LabelType.High:
              return 'LE ' + value;
            default:
              return '';
          }
        }
      };
      if (this.pagProducts.count<20) {
        $('.seeMoreBtn').show();
      } else {
        $('.seeMoreBtn').hide();
      }
      if (this.data !== []) {
        this.hideLoader();
      }
      this.data = data.filter;
      for (const filterItem in this.filter.brands) {
        if (this.data.brands.indexOf(filterItem) > -1) {
          console.log('filterItem', this.data.brands.indexOf(filterItem));
          // filterItem.sum = this.data.brands.indexOf(filterItem);
        }
      }
      this.pageTitle = data.filter.main_categories[0].name ? data.filter.main_categories[0].name : 'No Data';
      this.itemsCount = data.count;
    });
  };
  search = function(payload) {
    console.log('payload',payload);
    this.itemService.searchBar(payload, this.pageCount).subscribe(data => {
      console.log('data',data);
      this.pageData(data);
      if (data.count === 0 || payload.query === '') {
        Swal.fire('sorry we don`t have products!', '', 'error');
        this.router.navigate(['home']);
      } else {
        this.filter = data.filter;
        this.maxValue = data.filter.max_price;
        this.minValue = data.filter.min_price;
        this.options = {
          floor: data.filter.min_price,
          ceil: data.filter.max_price,
          translate: (value: number, label: LabelType): string => {
            switch (label) {
              case LabelType.Low:
                return 'LE ' + value;
              case LabelType.High:
                return 'LE ' + value;
              default:
                return '';
            }
          }
        };
      }
    });
  };
  pageData = function(data) {
    this.data = [];
    this.pagProducts=data;
    if (this.pagProducts.count>20) {
      $('.seeMoreBtn').show();
    } else {
      $('.seeMoreBtn').hide();
    }
    if (data.count === 0) {
      this.router.navigate(['home']);
      Swal.fire('sorry we don`t have products!', '', 'error');
    } else {
      this.pageTitle = data.filter.main_categories[0].name;
      this.itemsCount = data.count;
      for (const item of data.product) {
        this.items.push(item);
      }
      this.data = data.filter;
      if (this.data !== []) {
        this.hideLoader();
      }
      this.disableScroll = data.product.length === 0;
      this.filter = data.filter;
      this.maxValue = data.filter.max_price;
      this.minValue = data.filter.min_price;
      this.options = {
        floor: data.filter.min_price,
        ceil: data.filter.max_price,
        translate: (value: number, label: LabelType): string => {
          switch (label) {
            case LabelType.Low:
              return 'LE ' + value;
            case LabelType.High:
              return 'LE ' + value;
            default:
              return '';
          }
        }
      };
    }
  };

  seeMore() {
    this.pageCount += 1;
    this.init(false);
  }

  init = function(first: boolean = true) {
    this.route.paramMap.subscribe(params => {
      if (first) {
        this.items = [];
        this.pageCount = 1;
      }
      const id = params.get('id');
      this.id = params.get('id');
      switch (params.get('page').toLowerCase()) {
        case 'maincat':
          this.itemService.main_cat_items(id, this.pageCount).subscribe(data => {
            this.isPageDataReady = false;
            $('#loading').fadeIn();
            $('.data').hide();
            this.pageData(data);
          });
          this.categoryId.push(parseInt(id));
          break;
        case 'hotproduct':
          this.itemService.hotProduct(this.pageCount).subscribe(data => {
            this.isPageDataReady = false;
            $('#loading').fadeIn();
            $('.data').hide();
            this.pageData(data);
            this.pageTitle = 'hot product';
          });
          break;
        case 'new':
          this.itemService.newArrivals(this.pageCount).subscribe(data => {
            this.isPageDataReady = false;
            $('#loading').fadeIn(2000);
            $('.data').hide();
            this.pageData(data);
            this.pageTitle = 'new arrivals';
          });
          break;
        case 'brand':
          this.itemService.top_items_by_brand(id).subscribe(data => {
            this.isPageDataReady = false;
            $('#loading').fadeIn(2000);
            $('.data').hide();
            this.pageData(data);
          });
          this.brandsId.push(parseInt(id));
          break;

        case 'subcat':
          this.itemService.get_sub_cat_items_id(id, this.pageCount).subscribe(data => {
            this.isPageDataReady = false;
            $('#loading').fadeIn(2000);
            $('.data').hide();
            this.pageData(data);
          });
          this.categoriesId.push(parseInt(id));
          break;
        case 'search':
          this.text = id;
          this.search({query: this.text});
          break;
        case 'brands':
          const ids=id;
          const brandID =Number(ids.substr(0,ids.indexOf('-')));
          const catID =Number(ids.substr(ids.indexOf('-')+1));
          console.log('brandID',brandID);
          console.log('catID',catID);
          this.search({brands: [brandID],main_cats:[catID]});
          break;
        default:
          break;
      }
    });

  };
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

    this.storageService.getCartItems();
    this.storageService.getwishListItems();
    this.storageService.getCartObservable().subscribe(data => {
      this.itemListIDS = [];
      for (const product of data) {
        this.itemListIDS.push(product.id);
      }
    });
    this.storageService.getwishListObservable().subscribe(data => {
      this.wishListIDS = [];
      for (const product of data) {
        this.wishListIDS.push(product.id);
      }
    });
    this.init();
    window.scrollTo(0, 0);
    this.pageCount = 1;
    this.items = [];
    $('#screen_Btn').click(() => {

    });

  }

  showBrands() {
    $('#Check_List').slideToggle();
    $('#icon').toggleClass('fa-rotate-270');
  }

  showDiscount() {
    $('#offer_List').slideToggle();
    $('#icon1').toggleClass('fa-rotate-270');
  }

  showScreen(id) {
    $('#size_List' + id).slideToggle();
    $('#icon2' + id).toggleClass('fa-rotate-270');
  }
}
