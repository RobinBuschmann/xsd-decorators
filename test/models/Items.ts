import {XSDComplexType} from "../../lib/annotations/XSDComplexType";
import {XSDElement} from "../../lib/annotations/XSDElement";
import {Item} from "./Item";

@XSDComplexType
export class Items {

  @XSDElement({
    arrayType: Item
  })
  item: Item[];
}
