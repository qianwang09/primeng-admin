import { Component } from '@angular/core';
import { TOWCodeMapping } from './models/TOWCodeMapping';
import { TOWCodeMappingService } from './service/TOWCodeMappingService';
import { ConfirmationService, Message } from 'primeng/primeng';
import { ResponseResult } from './models/ResponseResult';
import { SECChangeType } from './models/SECChangeType';
import { SelectItem } from 'primeng/primeng';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ConfirmationService]
})
export class AppComponent {
  title = 'TOW Code Mapping';
  SECChangeTypes: SECChangeType[] = [];
  SECChangeTypeList: SelectItem[];
  mappings: TOWCodeMapping[];
  mapping: TOWCodeMapping = null;
  selectedMapping: TOWCodeMapping;

  displayDialog = false;
  newMapping: boolean;
  editMessage: Message[] = [];

  searchLoS = '';
  searchProductCode = '';
  first = 0;
  rows = 20;
  totalRecords = 0;
  loading = true;
  // responsive
  stacked = false;

  constructor(private mappingService: TOWCodeMappingService, private confirmationService: ConfirmationService) {

  }
  ngOnInit(): any {
    this.SECChangeTypeList = [{ label: ' - Select -', value: 0 }];
    this.mappingService.GetSECChangeTypes().then(result => {
      this.SECChangeTypes = result.result.records;
      for (const r of this.SECChangeTypes) {
        this.SECChangeTypeList.push({ label: r.Description, value: r.Code });
      }
      this.mapping = new TOWCodeMapping();
    });
  }
  getCESStatusChangeTypeDes(code: number): string {
    for (const c of this.SECChangeTypes) {
      if (c.Code === code) {
        return c.Description;
      }
    }
    return '';
  }
  add() {
    this.newMapping = true;
    this.mapping = new TOWCodeMapping();
    this.displayDialog = true;
  }

  productCodeFinished () {
    if (this.newMapping === true && this.mapping.ProductCode.length === 4) {
     this.mappingService.getProposedTOWCodeMapping(this.mapping.ProductCode).then(result => {
      const proposed = result.result;
      this.mapping.ProductDescription = proposed.ProductDescription;
      this.mapping.LoS = proposed.LoS;
      this.mapping.LoSDescription = proposed.LoSDescription;
      console.log(result);
     });
    }
  }
  edit(mapping: TOWCodeMapping) {
    this.selectedMapping = mapping;
    const operatedMappingClone = this.cloneMapping(mapping);
    this.mapping = operatedMappingClone;
    this.displayDialog = true;
    console.log(this.mapping + 'edited');
  }
  delete(mapping: TOWCodeMapping) {
    this.selectedMapping = mapping;
    this.mapping = mapping;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this record?',
      accept: (map: any) => {
        console.log(map);
        this.displayDialog = false;
        const index = this.findSelectedIndex();
        this.mappingService.deleteTOWCodeMapping(this.mapping).then(result => {
          if (result === 'true') {
            this.displayDialog = false;
            this.mapping = null;
            this.first = 0;
            this.mappingService.GetTOWCodeMappings(this.searchLoS, this.searchProductCode, this.first / this.rows, this.rows).then(r => {
              this.totalRecords = r.result.total;
              this.mappings = r.result.records;
              this.loading = false;
              this.editMessage = [{
                severity: 'success',
                summary: 'Record operation successfully!',
                detail: 'This record has submitted and save to database successfully.'
              }];
              // setTimeout(() => { this.editMessage = []; }, 3000);
            });
          } else {
            this.displayDialog = false;
            this.editMessage = [{
              severity: 'warn',
              summary: 'Record operation failed!',
              detail: 'Operation failed, Please refresh page and try again.'
            }];
            // setTimeout(() => { this.editMessage = []; }, 3000);
          }
        });
      }
    });
  }
  save() {
    if (this.mapping.SECChangeTypeCode === 0) {
      this.editMessage = [{
        severity: 'warn',
        summary: 'CES Status Change Type can not be empty',
        detail: 'Please select a CES Status Change Type!'
      }];
      return false;
    }

    this.loading = true;
    if (this.newMapping) {
      // this.mappings.push(this.mapping);
      this.mappingService.addTOWCodeMapping(this.mapping).then(result => {
        if (result === 'true') {
          this.displayDialog = false;
          this.mapping = null;
          this.first = 0;
          this.mappingService.GetTOWCodeMappings(this.searchLoS, this.searchProductCode, this.first / this.rows, this.rows).then(r => {
            this.totalRecords = r.result.total;
            this.mappings = r.result.records;
            this.loading = false;
            this.editMessage = [{
              severity: 'success',
              summary: 'Record operation successfully!',
              detail: 'This record has submitted and save to database successfully.'
            }];
          });
        } else {
          this.displayDialog = false;
          this.editMessage = [{
            severity: 'warn',
            summary: 'Record operation failed!',
            detail: 'Operation failed, Please refresh page and try again.'
          }];
        }
      });

    } else {
      this.mappingService.saveTOWCodeMapping(this.mapping).then(result => {
        if (result === 'true') {
          this.displayDialog = false;
          this.mapping = null;
          this.first = 0;
          this.mappingService.GetTOWCodeMappings(this.searchLoS, this.searchProductCode, this.first / this.rows, this.rows).then(r => {
            this.totalRecords = r.result.total;
            this.mappings = r.result.records;
            this.loading = false;
            this.editMessage = [{
              severity: 'success',
              summary: 'Record operation successfully!',
              detail: 'This record has submitted and save to database successfully.'
            }];
          });
        } else {
          this.displayDialog = false;
          this.editMessage = [{
            severity: 'warn',
            summary: 'Record operation failed!',
            detail: 'Operation failed, Please refresh page and try again.'
          }];
        }
      });
    }
  }
  cancelEdit() {
    this.displayDialog = false;
    this.mapping = null;
  }
  onRowSelect(event) {
    this.newMapping = false;
    this.mapping = this.cloneMapping(event.data);
    this.selectedMapping = event.data;
  }

  GetTOWCodeMappings(event) {
    this.loading = true;
    this.mappingService.GetTOWCodeMappings(this.searchLoS, this.searchProductCode, event.first / event.rows, event.rows).then(result => {
      this.totalRecords = result.result.total;
      this.mappings = result.result.records;
      this.loading = false;
    });
  }

  cloneMapping(mapping: TOWCodeMapping): TOWCodeMapping {
    const clone = new TOWCodeMapping();
    for (let prop in mapping) {
      clone[prop] = mapping[prop];
    }
    return clone;
  }
  findSelectedIndex(): number {
    const _selected = this.selectedMapping;
    let index = -1;
    this.mappings.forEach((e, i) => {
      if (e.TOWCodeMappingID === _selected.TOWCodeMappingID) {
        index = i;
      }
    });
    return index;
    // return this.mappings.indexOf(this.selectedMapping);
  }
}
