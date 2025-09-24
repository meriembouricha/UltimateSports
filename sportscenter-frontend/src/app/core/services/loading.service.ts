import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingReqCount = 0;
  
  constructor() { }

  loading(){
    this.loadingReqCount++;
  }
  idle(){
    this.loadingReqCount--;
    if(this.loadingReqCount<=0){
      this.loadingReqCount = 0;
    }
  }
}