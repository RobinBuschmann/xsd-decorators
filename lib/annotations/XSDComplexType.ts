import {XSDComplexType as XSDComplexTypeModel} from "../models/XSDComplexType";
import {IXSDComplexTypeOptions} from "../interfaces/IXSDComplexTypeOptions";

export function XSDComplexType(arg: IXSDComplexTypeOptions|any): any {

  if (typeof arg === 'function') {

    const target = arg;
    const options = {name: target.name};

    XSDComplexTypeModel.annotate(target.prototype, options);

  } else if (typeof arg === 'object') {

    const options = arg;

    return (target: any) => {

      if (!options.name) options.name = target.name;

      return XSDComplexTypeModel.annotate(target.prototype, options);
    };
  } else {

    throw new Error('Wrong type of parameter');
  }
}
