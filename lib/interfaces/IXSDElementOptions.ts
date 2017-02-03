import {XSDNSType} from "../utils";
import {IRestrictionOptions} from "./IRestrictionOptions";
import {IXSDAttributeTypeReqOptions} from "./IXSDAttributeTypeReqOptions";

export interface IXSDElementOptions extends IRestrictionOptions {

  type?: XSDNSType|any;
  simpleTypeName?: string;
  choiceName?: string;
  minOccurs?: number;
  maxOccurs?: number|'unbounded';
  attributes?: {[name: string]: IXSDAttributeTypeReqOptions};
}
