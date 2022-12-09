import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IProduct,
  IProductBase,
  Product,
} from 'src/app/model/product/product.model';
import { ProductRepository } from 'src/app/model/product/product.repository';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../model/product/product.service';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from '../../../model/category/category.interface';
import { CategoryService } from '../../../model/category/category.service';

@Component({
  selector: 'app-product-edit',
  styleUrls: ['productEditor.component.scss'],
  templateUrl: 'productEditor.component.html',
})
export class ProductEditorComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() product: IProduct | null;

  @Output() closeEditor = new EventEmitter<void | IProduct>();

  public productForm: FormGroup;
  categories$: BehaviorSubject<ICategory[] | null> = new BehaviorSubject<
    ICategory[] | null
  >(null);

  closeEdit(product?: IProduct) {
    this.closeEditor.emit(product);
  }

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryService
      .getAll()
      .subscribe((res) => this.categories$.next(res));
  }

  save() {
    const data = this.productForm.value;
    const newProduct: IProductBase = {
      product_name: data.product_name,
      description: data.description,
      price: data.price,
      material: data.material,
      size: data.size,
      weight: data.weight,
      categoryId: data.categoryId,
    };

    if (this.isEdit && this.product) {
      this.productService
        .putById(newProduct, this.product.id)
        .subscribe((res) => {
          this.closeEdit(res);
        });
    } else
      this.productService.postProduct(newProduct).subscribe((res) => {
        this.closeEdit(res);
      });
  }

  ngOnInit(): void {
    console.log(this.product);
    this.productForm = this.fb.group({
      product_name: new FormControl(
        { value: this.product?.product_name, disabled: false },
        Validators.required
      ),
      description: new FormControl(
        { value: this.product?.description, disabled: false },
        Validators.required
      ),
      price: new FormControl(
        { value: this.product?.price, disabled: false },
        Validators.required
      ),
      material: new FormControl(
        { value: this.product?.material, disabled: false },
        Validators.required
      ),
      size: new FormControl(
        { value: this.product?.size, disabled: false },
        Validators.required
      ),
      weight: new FormControl(
        { value: this.product?.weight, disabled: false },
        Validators.required
      ),
      categoryId: new FormControl(
        { value: this.product?.categoryId, disabled: false },
        Validators.required
      ),
    });
  }

  checkValid(control: string) {
    return this.productForm.controls[control].valid;
  }
}
