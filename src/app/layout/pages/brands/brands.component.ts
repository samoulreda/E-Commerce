import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../project/services/brand/brand.service';
import { brand } from '../../../project/interfaces/brand';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})

export class BrandsComponent implements OnInit {
  Brands!: brand[];
  id!: string;

  constructor(private _BrandService: BrandService) { 
    if(typeof localStorage !='undefined'){
      localStorage.setItem('page','/brands')
        }
  }

  ngOnInit(): void {
    this._BrandService.GetAllBrands().subscribe({
      next: (data) => {
        this.Brands = data.data;
      }
    })
  }
}
