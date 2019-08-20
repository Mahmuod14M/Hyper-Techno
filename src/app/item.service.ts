import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: '627562626c6520617069206b6579'
  })
};

const BASE_URL = 'https://hyper-techno-stage.herokuapp.com';
// const BASE_URL = 'http://hyper-testing.herokuapp.com';

// const BASE_URL = "http://192.168.1.10:5000"

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private httpClient: HttpClient) {
  }

  hotProduct(page): Observable<any> {
    return this.httpClient.get(BASE_URL + '/api/WebSite/get_hot_items?Page=' + page);
  }

  homePageRequest(): Observable<any> {
    return this.httpClient.get(BASE_URL + '/api/WebSite/home_page');
  }

  newArrivals(page): Observable<any> {
    return this.httpClient.get(BASE_URL + '/api/WebSite/get_new_items?Page=' + page);
  }

  brands(): Observable<any> {
    return this.httpClient.get(BASE_URL + '/api/WebSite/get_all_brands?Page=1');
  }

  Categ(): Observable<any> {
    return this.httpClient.get(
      BASE_URL + '/api/Category/get_main_cats?Page=1',
      httpOptions
    );
  }

  sub_catg(parentId): Observable<any> {
    return this.httpClient.get(
      BASE_URL +
      '/api/Category/get_sub_cats_by_main_id?MainCatID=' +
      parentId +
      '&Page=1',
      httpOptions
    );
  }

  item_details(itemId): Observable<any> {
    return this.httpClient.get(
      BASE_URL + '/api/General/get_item_details_by_id?ProductId=' + itemId, httpOptions
    );
  }

  main_cat_items(id, page): Observable<any> {
    return this.httpClient.get(
      BASE_URL + '/api/Category/get_main_cat_items_by_id?SubCatID=' + id + '&Page=' + page, httpOptions
    );
  }

  top_items_by_brand(mainId): Observable<any> {
    return this.httpClient.get(
      BASE_URL + '/api/Brand/get_brand_items_by_id?BrandId=' + mainId + '&Page=1', httpOptions
    );
  }

  get_sub_cat_items_id(id, page): Observable<any> {
    return this.httpClient.get(
      BASE_URL + '/api/Category/get_sub_cat_items_by_id?SubCatID=' + id + '&Page=' + page, httpOptions
    );
  }
  removeAddress(id): Observable<any> {
    return this.httpClient.get(
      BASE_URL + '/api/Address/remove_user_address?AddressID=' + id , httpOptions
    );
  }

  searchBar(payload, page): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/General/search?Page=' + page, payload, httpOptions
    );
  }
  search(payload, page): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/General/search?Page=' + page, payload, httpOptions
    );
  }

  signUp(payload): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/User/user_signup', payload, httpOptions
    );
  }

  signIn(payload): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/User/user_login', payload, httpOptions
    );
  }

  address(payload): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/Address/add_edit_user_address', payload, httpOptions
    );
  }

  get_address(id): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/Address/get_user_addresses?UserID=' + id, null, httpOptions
    );
  }
  makeOrder(payload): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/Order/make_order', payload, httpOptions
    );
  }
  get_user_orders(id): Observable<any> {
    return this.httpClient.get(
      BASE_URL + '/api/Order/get_user_orders?UserID='+id, httpOptions
    );
  }
  get_user_address_By_id(id): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/Address/get_user_addresse_by_id?AddressID='+id, null,httpOptions
    );
  }
  add_review(payload): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/Order/AddReview', payload,httpOptions
    );
  }
  getBroductById(payload): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/Eslam/fav_cart', payload, httpOptions
    );
  }
  facebook(payload): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/User/facebook_login', payload, httpOptions
    );
  }
  editUserImg(id): Observable<any> {
    return this.httpClient.post(
      BASE_URL + '/api/User/edit_user_image?UserID='+id, null, httpOptions
    );
  }
}
