import {xml} from 'xml-decorators';
import {XSDSchema} from "./lib/models/XSDSchema";
import {IXSDSchemaOptions} from "./lib/interfaces/IXSDSchemaOptions";
import {XSD_NS} from "./lib/utils";

export {XSD_NS} from "./lib/utils";

export {IFullXSDElementOptions} from './lib/interfaces/IFullXSDElementOptions';
export {IWSDLChoiceOptions} from './lib/interfaces/IXSDChoiceOptions';
export {IXSDComplexTypeOptions} from './lib/interfaces/IXSDComplexTypeOptions';
export {IXSDElementOptions} from './lib/interfaces/IXSDElementOptions';
export {IXSDAttributeTypeReqOptions} from './lib/interfaces/IXSDAttributeTypeReqOptions';
export {IXSDAttributeOptions} from './lib/interfaces/IXSDAttributeOptions';

export {XSDComplexType} from './lib/annotations/XSDComplexType';
export {XSDElement} from './lib/annotations/XSDElement';
export {XSDAttribute} from './lib/annotations/XSDAttribute';

export {XSDAttribute as XSDAttributeModel} from './lib/models/XSDAttribute';
export {XSDElement as XSDElementModel} from './lib/models/XSDElement';
export {XSDComplexType as XSDComplexTypeModel} from './lib/models/XSDComplexType';
export {XSDChoice} from './lib/models/XSDChoice';
export {XSDEnumeration} from './lib/models/XSDEnumeration';
export {XSDExtension} from './lib/models/XSDExtension';
export {XSDPattern} from './lib/models/XSDPattern';
export {XSDRestriction} from './lib/models/XSDRestriction';
export {XSDSimpleType} from './lib/models/XSDSimpleType';
export {XSDSchema} from './lib/models/XSDSchema';

export function createSchemaXml(options: IXSDSchemaOptions): string {

  return xml.serialize(`${XSD_NS}:schema`, XSDSchema.createElement(options));
}

export function createJsonSchema(options: IXSDSchemaOptions): any {

  return xml.getSchema(XSDSchema.createElement(options));
}


