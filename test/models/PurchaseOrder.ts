import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {Customer} from "./Customer";
import {Items} from "./Items";
import {Payment} from "./Payment";

@XSDComplexType
export class PurchaseOrder {

  @XSDElement({
    minOccurs: 1,
    maxOccurs: 1,
  })
  shipTo: Customer;

  @XSDElement({
    minOccurs: 1,
    maxOccurs: 1,
  })
  billTo: Customer;

  @XSDElement({
    minOccurs: 1,
    maxOccurs: 1,
  })
  payment: Payment;

  @XSDElement({
    maxOccurs: 10,
    maxLength: 250
  })
  comment: string;

  @XSDElement
  items: Items;
}
