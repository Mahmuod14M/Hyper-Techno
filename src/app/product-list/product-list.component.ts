import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemService} from '../item.service';
import {ActivatedRoute} from '@angular/router';
import {Options, LabelType} from 'ng5-slider';
import {query} from '@angular/animations';


declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

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

  constructor(private itemService: ItemService, private route: ActivatedRoute) {
  }

  applyFilter = function(payload) {
    this.itemService.search(payload).subscribe(data => {
      this.items = data;
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
  search = function (payload) {
    this.itemService.search(payload).subscribe(data => {
      this.items = data;
      this.filter = data.filter;
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const page = params.get('page');
      switch (page.toLowerCase()) {
        case 'maincat':
          this.itemService.main_cat_items(id).subscribe(data => {
            this.items = data;
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
          break;
        case 'hotproduct':
          this.itemService.hotProduct(id).subscribe(data => {
            this.items = data;
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
          break;
        case 'newarrivales':
          this.itemService.newArrivales(id).subscribe(data => {
            this.items = data;
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
          break;
        case 'brand':
          this.itemService.top_items_by_brand(id).subscribe(data => {
            this.items = data;
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
          break;

        case 'subcat':
          this.itemService.get_sub_cat_items_id(id).subscribe(data => {
            this.items = data;
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
