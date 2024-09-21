import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {ImageService} from "../../services/image.service";
import {Observable, switchMap} from "rxjs";
import {Property} from "../../model/property";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{

  properties: Property[]=[];
  images: any[]=[];
  isLoadingProperties: boolean = false;
  isLoadingImages: boolean = false;
  private propertyIds: any;

  private userId:string="66d5f19a64eebd353b503c85";

  constructor(
              public propertyService: PropertyService,
              private imageService: ImageService) {}

  ngOnInit() {

    //this.getAllProperties();
    this.getPropertiesPerPage();

    this.propertyService.getPropertiesByUserId(this.userId).pipe(
      switchMap(props => {
        const ids = props.map((obj: { id: any; }) =>obj.id);
        return this.imageService.getImgByProperId(ids);
      }),
    ).subscribe(
      imgs=>{
        this.images = imgs;
        console.log('response ok  :'+this.images[0])
      },
      error => {
        //this.error = '';
        console.error(error);

      }
    )

  }

  getAllProperties() {
    this.propertyService.getProperties().subscribe(
        (res) =>{
          this.properties = res;
          this.propertyIds=this.properties.map(item=>item.id);

          console.log("properties: "+this.properties);
          console.log("ids: "+this.propertyIds);
        },
        (error)=> {
          console.error('Error fetching data:',error);
          this.properties=[]
        },
        ()=> {
          this.isLoadingProperties = true;
        },
      );
  }

  getPropertiesPerPage() {
    this.propertyService.getPropertiesPerPage().subscribe(
      (res) =>{
        this.properties = res.content;
        //this.propertyIds=this.properties.map(item=>item.id);
      },
      (error)=> {
        console.error('Error fetching data:',error);
        this.properties=[]
      },
      ()=> {
        this.isLoadingProperties = true;
      },
    );
  }


  getImagesByPropertyId(propIds:string[]){
    this.imageService.fetchImagesMeta(propIds).subscribe(
      (res) =>{
        this.images=res.filter(item=>item!==null);
        console.log("images : ",this.images)
      },
      (error)=>{
        console.error('Error fetching data:',error)
        this.images=[]
      },
      ()=> {this.isLoadingImages=true}
    )
  }

  getImagesByPropertyId1(propIds:string[]){
    this.imageService.fetchImagesMeta(propIds).subscribe(
      (res) =>{
        this.images=res;
        console.log("images : ",this.images)
      },
      (error)=>{
        console.error('Error fetching data:',error)
        this.images=[]
      },
      ()=> {this.isLoadingImages=true}
    )
  }

  getImagesByPropertyId2(propIds:string[]){
    this.imageService.fetchImagesMeta2(propIds).subscribe(
      (res) =>{
        this.images=res;
        console.log("images : ",this.images)
      },
      (error)=>{
        console.error('Error fetching data:',error)
        this.images=[]
      },
      ()=> {this.isLoadingImages=true}
    )
  }



  ngOnDestroy(): void {
  }
}


