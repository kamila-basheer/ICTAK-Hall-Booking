import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private router:Router) { }

  registerUser(associate:any){
    console.log(associate);
    return this.http.post("http://localhost:3000/register", associate);
    
  }

  loginUser(associate:any){
    console.log(associate);
    return this.http.post<any>("http://localhost:3000/login", associate);
  }

  loginAdmin(admin:any){
    console.log(admin);
    return this.http.post<any>("http://localhost:3000/adm-login", admin);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }

  getAssociates(){
    return this.http.get("http://localhost:3000/associates");
  }

  deleteAssociate(id:any){
    
    console.log(id);
    return this.http.delete("http://localhost:3000/del-associate/"+id);
    
  }

  getAssociate(id:any){
    console.log(id);
    return this.http.get("http://localhost:3000/associate/"+id);
  }

  editAssociate(associate:any){
    console.log("client update");
    return this.http.put("http://localhost:3000/edit-associate", associate)
      .subscribe((data)=>{
        console.log(data);
      })
  }

}
