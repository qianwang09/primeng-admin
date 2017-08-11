import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { TOWCodeMapping } from '../models/TOWCodeMapping';
import { ResponseResult } from '../models/ResponseResult';
require('../../assets/mapping.json');


@Injectable()
export class TOWCodeMappingService {
  constructor(private http: Http) {

  }

  GetTOWCodeMappings(searchLoS = '', searchProductCode = '', pageIndex = 0, pageSize = 20): Promise<ResponseResult> {
    // const parameterStr = 'skipcount=' + skipcount + '&' + 'pageSize=' + pageSize;
    return this.http.get('GetTOWCodeMappings', {
      params: {
        LoS: searchLoS,
        productCode: searchProductCode,
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    }).toPromise().then((res): ResponseResult => {
      let result: ResponseResult;
      if (res.status === 200) {
        result = <ResponseResult>res.json();
      }
      return result;
    })
      .catch(this.handleError);
  }
  GetSECChangeTypes(): Promise<ResponseResult> {
    return this.http.get('GetSECChangeTypes').toPromise().then((res): ResponseResult => {
      let result: ResponseResult;
      if (res.status === 200) {
        result = <ResponseResult>res.json();
      }
      return result;
    }).catch(this.handleError);
  }

  addTOWCodeMapping(mapping: TOWCodeMapping): Promise<string> {
    return this.http.post(
      '/vRiskwebsite/admin/AddTOWCodeMapping', mapping
    )
      .toPromise()
      .then((res): string => {
        let result = 'false';
        if (res.status === 200) {
          result = res.text().toLowerCase();
        }
        return result;
      })
      .catch(this.handleError);
  }

  saveTOWCodeMapping(mapping: TOWCodeMapping): Promise<string> {
    return this.http.post(
      '/vRiskwebsite/admin/SaveTOWCodeMapping', mapping
    )
      .toPromise()
      .then((res): string => {
        let result = 'false';
        if (res.status === 200) {
          result = res.text().toLowerCase();
        }
        return result;
      })
      .catch(this.handleError);
  }
  deleteTOWCodeMapping(mapping: TOWCodeMapping): Promise<string> {
    return this.http.post(
      '/vRiskwebsite/admin/DeleteTOWCodeMapping', mapping
    )
      .toPromise()
      .then((res): string => {
        let result = 'false';
        if (res.status === 200) {
          result = res.text().toLowerCase();
        }
        return result;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    alert('error');
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
