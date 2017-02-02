import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {XSDAttribute} from "../../lib/annotations/XSDAttribute";

@XSDComplexType
export class Item {

  @XSDAttribute({
    pattern: /\d{3}-[A-Z]{2}/,
    simpleTypeName: 'SKU'
  })
  partNum: string;

  @XSDElement
  productName: string;

  @XSDElement
  quantity: number;

  @XSDElement({
    type: 'xsd:decimal'
  })
  price: number;

  @XSDElement
  comment: string;
}
