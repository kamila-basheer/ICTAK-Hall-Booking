import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AssociateModel } from './associates.model';


@Component({
  selector: 'app-admin-assocaites',
  templateUrl: './admin-assocaites.component.html',
  styleUrls: ['./admin-assocaites.component.css']
})
export class AdminAssocaitesComponent implements OnInit {

  title:String="Associate Details";
  associates:AssociateModel[] = [];
  associatesLength:any
  

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.getAssociates()
     .subscribe((data)=>{
      this.associates = JSON.parse(JSON.stringify(data));
      this.associatesLength=this.associates.length;
     },err=>{
      console.log(err.error.message);
      if(err.error.message=='Unauthorized'){
      this.router.navigate(['home']);}
      // this.errors=err.error.message;
      // alert(this.errors);
      // this.router.navigate(['home']);

    })
  }

  deleteAssociate(associate :any){
    
    this.authService.deleteAssociate(associate._id)
      .subscribe((data)=>{
        this.associates=this.associates.filter(a=>a!==associate);
        console.log(data);
      },err=>{
        console.log(err.error.message);
        if(err.error.message=='Unauthorized'){
        this.router.navigate(['home']);}
        // this.errors=err.error.message;
        // alert(this.errors);
        // this.router.navigate(['home']);
  
      })
  }

  updateBook(book:any){
    console.log(book);
    localStorage.setItem("editAssociateId", book._id.toString());
    this.router.navigate(['edit-associate']);
  }
  

}
