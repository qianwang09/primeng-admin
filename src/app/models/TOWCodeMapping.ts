import {SECChangeType} from './SECChangeType'
export class TOWCodeMapping {
  constructor(LoS: string = '', LoSDescription: string = '', ProductCode: string = '', ProductDescription: string = '',
  SECChangeTypeCode: number = 1,  SECChangeTypeValue: string = 'N') {
    this.TOWCodeMappingID = 0;
    this.LoS = LoS;
    this.LoSDescription = LoSDescription;
    this.ProductCode = ProductCode;
    this.ProductDescription = ProductDescription;
    this.SECChangeTypeCode = SECChangeTypeCode;
    this.SECChangeTypeValue = SECChangeTypeValue;
    this.IsValid = 'Y';
  }
  TOWCodeMappingID: number;
  LoS: string;
  LoSDescription: string | null;
  ProductCode: string;
  ProductDescription: string | null;
  SECChangeTypeCode:  number | null;
  SECChangeTypeValue: string | null;
  IsValid: string | null;
}
