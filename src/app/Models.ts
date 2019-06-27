export interface Product {
  active: boolean;
  box_content: string;
  box_content_ar: string;
  cat_priority: number;
  category: string;
  code: string;
  colors: any[];
  country?: any;
  date_add: number;
  date_upd: number;
  description: string;
  descriptionAr: string;
  dimensions: string;
  highlights: string;
  highlightsAr: string;
  hot_priority: number;
  id: number;
  id_category: number;
  id_main_category: number;
  id_main_color?: any;
  id_manufacturer: number;
  id_supplier?: any;
  images: Image[];
  is_hot: boolean;
  is_new: boolean;
  main_category: string;
  main_category_ar: string;
  main_color?: any;
  main_image: string;
  main_material: string;
  main_material_ar?: any;
  manufacturer: string;
  manufacturer_ar: string;
  name: string;
  nameAr: string;
  new_code: string;
  new_priority: number;
  on_sale: boolean;
  out_of_stock: boolean;
  price: number;
  quantity: number;
  rate?: any;
  reduction_from?: any;
  reduction_percent: number;
  reduction_price: number;
  reduction_to?: any;
  warranty: string;
  weight: string;
  features_ar: FeaturesAr[];
  features_en: FeaturesEn[];
  related: Product[];
  reviews: any[];
  wholesale_price: number;
}

export interface FeaturesAr {
  key: string;
  value: string;
}

export interface FeaturesEn {
  key: string;
  value: string;
}

export interface Image {
  active: boolean;
  date_add: number;
  date_upd: number;
  id: number;
  id_color: number;
  id_image: number;
  id_product: number;
  image_url: string;
  product: string;
}

