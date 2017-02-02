import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";

@XSDComplexType
export class Payment {

  @XSDElement({
    enumeration: ['credit card', 'paypal']
  })
  payWith: string;
}
