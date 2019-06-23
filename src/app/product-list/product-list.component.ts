import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {Options, LabelType} from 'ng5-slider';
import {query} from '@angular/animations';
import {init} from 'protractor/built/launcher';


declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  constructor(private itemService: ItemService, private route: ActivatedRoute) {
  }

  minValue: number;
  maxValue: number;
  options: Options = {};
  items: any[] = [];
  filter = {};
  filterCategoryAttributes = [];
  brandsId: any[] = [];
  categoriesId: any[] = [];
  categoryAttrs: any[] = [];
  private text: string;
  disableScroll = false;
  pageCount = 1;

  onScroll() {
    this.disableScroll = true;
    this.pageCount += 1;
    this.init();
    console.log('scrolled!!');
  }

  filterChange(event, minValue: number, maxValue: number, brandID: number, categoryID: number, subCatID: number) {
    if (event.currentTarget) {
      if (event.currentTarget.checked) {
        if (brandID != null) {
          this.brandsId.push(brandID);
        } else if (categoryID != null) {
          this.categoriesId.push(categoryID);
        } else if (subCatID != null) {
          this.categoryAttrs.push(subCatID);
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
        }
      }
    }
    console.log(this.brandsId);
    console.log(this.categoriesId);
    this.applyFilter({
      brands: this.brandsId, cats: this.categoriesId, query: this.text, cat_attrs_values: this.categoryAttrs,
      max_price: this.maxValue, min_price: this.minValue
    });
  }

  applyFilter = function(payload) {
    this.itemService.search(payload).subscribe(data => {
      this.items = data;
      this.disableScroll = false;
      console.log(data.filter);
      if (data.filter.brands.length > this.filter.brands.length) {
        this.filter.brands = data.filter.brands;
      }
      if (data.filter.categories.length > this.filter.categories.length) {
        this.filter.categories = data.filter.categories;
      }
      this.filterCategoryAttributes = data.filter.category_attributes;
      this.maxValue = data.filter.max_price;
      this.minValue = data.filter.min_price;
      console.log(data);
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

    });
  };
  search = function(payload) {
    console.log('Page: ', this.pageCount);
    this.itemService.search(payload, this.pageCount).subscribe(data => {
      this.items = data;
      console.log('Data: ', data);
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

    });
  };
  pageData = function(data) {
    console.log(data, this.pageCount);
    for (const item of data.product) {
      this.items.push(item);
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
  };

  init = function() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      switch (params.get('page').toLowerCase()) {
        case 'maincat':
          this.itemService.main_cat_items(this.pageCount).subscribe(data => {
            this.pageData(data);
          });
          break;
        case 'hotproduct':
          this.itemService.hotProduct(this.pageCount).subscribe(data => {
            this.pageData(data);
          });
          break;
        case 'newarrivales':
          this.itemService.newArrivales(this.pageCount).subscribe(data => {
            this.pageData(data);

          });
          break;
        case 'brand':
          this.itemService.top_items_by_brand(this.pageCount).subscribe(data => {
            this.pageData(data);
          });
          break;

        case 'subcat':
          this.itemService.get_sub_cat_items_id(this.pageCount).subscribe(data => {
            this.pageData(data);
          });
          break;
        case 'search':
          this.text = id;
          this.search({query: this.text});
          break;
        case 'brands':
          this.search({brands: [id]});
          break;
        default:
          break;
      }


    });
  };

  ngOnInit() {
    console.log('ngOnInit');
    this.pageCount = 1;
    this.items = [];
    this.init();

    $('#brands_Btn').click(() => {
      $('#Check_List').slideToggle();
      $('#icon').toggleClass('fa-rotate-270');
    });

    $('#discount_Btn').click(() => {
      $('#offer_List').slideToggle();
      $('#icon1').toggleClass('fa-rotate-270');
    });

    $('#screen_Btn').click(() => {
      $('#size_List').slideToggle();
      $('#icon2').toggleClass('fa-rotate-270');
    });
  }
}
