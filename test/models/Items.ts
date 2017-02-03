import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {Item} from "./Item";

@XSDComplexType
export class Items {

  @XSDElement({
    type: Item
  })
  item: Item[];

  @XSDElement({
    attributes: {
      unit: {type: 'xsd:string'}
    }
  })
  totalWeight: number;
}
