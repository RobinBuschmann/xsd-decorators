import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {Customer} from "./Customer";
import {Items} from "./Items";
import {PayPalPayment} from "./PayPalPayment";
import {CreditCardPayment} from "./CreditCardPayment";
import {XSDAttribute} from "../../lib/annotations/XSDAttribute";

@XSDComplexType({
  choices: {
    [PurchaseOrder.PaymentChoice]: {
      minOccurs: 1,
      maxOccurs: 1
    }
  }
})
export class PurchaseOrder {

  private static readonly PaymentChoice = 'payment-choice';

  @XSDAttribute
  dateTime: Date;

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
    enumeration: ['same-day', 'express', 'lazy']
  })
  delivery: string;

  @XSDElement({
    choiceName: PurchaseOrder.PaymentChoice
  })
  payPalPayment: PayPalPayment;

  @XSDElement({
    choiceName: PurchaseOrder.PaymentChoice
  })
  creditCardPayment: CreditCardPayment;

  @XSDElement({
    maxOccurs: 10,
    maxLength: 250
  })
  comment: string;

  @XSDElement
  items: Items;

}
