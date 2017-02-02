import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {XSDAttribute} from "../../lib/annotations/XSDAttribute";

@XSDComplexType
export class Customer {

  @XSDAttribute
  country: string;

  @XSDElement
  name: string;

  @XSDElement
  street: string;

  @XSDElement
  city: string;

  @XSDElement
  state: string;

  @XSDElement({
    type: 'xsd:decimal'
  })
  zip: string;
}
