import {XSDElement} from "./XSDElement";
import {XSDComplexType} from "./XSDComplexType";
import {XSD_URL, XMLNS_NS, XSD_NS} from "../utils";
import {XSDSimpleType} from "./XSDSimpleType";
import {XMLAttribute, XMLChild, xml, xmlAttribute} from "xml-decorators";
import {IXSDSchemaOptions} from "../interfaces/IXSDSchemaOptions";

export class XSDSchema {

  @XMLAttribute
  readonly attributeFormDefault = 'unqualified';

  @XMLAttribute
  readonly elementFormDefault = 'unqualified';

  @XMLAttribute({namespace: XMLNS_NS})
  readonly xsd: string = XSD_URL;

  @XMLAttribute({namespace: XMLNS_NS})
  private tns: string;

  @XMLAttribute
  private targetNamespace: string;

  @XMLChild({
    stripPluralS: true,
    namespace: XSD_NS
  })
  private elements: XSDElement[];
  private hasElement: {[elementName: string]: boolean} = {};

  @XMLChild({
    stripPluralS: true,
    namespace: XSD_NS
  })
  private complexTypes: XSDComplexType[];
  private hasComplexType: {[complexTypeName: string]: boolean} = {};

  @XMLChild({
    stripPluralS: true,
    namespace: XSD_NS
  })
  private simpleTypes: XSDSimpleType[];
  private hasSimpleType: {[simpleTypeName: string]: boolean} = {};

  static createElement(options: IXSDSchemaOptions): XSDSchema {
    const schema = new XSDSchema();
    const complexType = XSDComplexType.getXSDComplexType(options.target.prototype);
    const element = XSDElement.createElement({name: options.elementName}, complexType);

    schema.setTargetNamespace(options.targetNamespace);
    schema.addElement(element);

    if (options.namespaces) {

      const xmlElement = xml.getXMLElement(schema);
      if (xmlElement) {
        Object
          .keys(options.namespaces)
          .forEach(ns => {
            const hasDynElKey = '__hasDynEl';
            xmlElement[hasDynElKey] = xmlElement[hasDynElKey] || {};
            if (xmlElement[hasDynElKey][ns]) return;
            xmlElement[hasDynElKey][ns] = true;
            xmlElement.addAttribute(xmlAttribute.createAttribute({
              name: ns,
              namespace: XMLNS_NS,
              value: options.namespaces && options.namespaces[ns],
            }));
          });
      }
    }

    return schema;
  }

  setTargetNamespace(targetNamespace: string, fillNs: boolean = false): void {

    this.targetNamespace = targetNamespace;
    if (fillNs) this.tns = targetNamespace;
  }

  addElement(element: XSDElement): void {

    if (!this.elements) this.elements = [];

    if (!this.hasElement[element.name]) {

      element
        .getAllComplexTypesRecursively()
        .forEach(complexType => this.addComplexType(complexType));

      element
        .getAllSimpleTypesRecursively()
        .forEach(simpleType => this.addSimpleType(simpleType));

      this.elements.push(element);
      this.hasElement[element.name] = true;
    }
  }

  addComplexType(complexType: XSDComplexType): void {

    if (!this.complexTypes) this.complexTypes = [];

    if (!this.hasComplexType[complexType.name]) {

      this.complexTypes.push(complexType);
      this.hasComplexType[complexType.name] = true;
    }
  }

  private addSimpleType(simpleType: XSDSimpleType): void {

    if (!this.simpleTypes) this.simpleTypes = [];

    if (!this.hasSimpleType[simpleType.name]) {

      this.simpleTypes.push(simpleType);
      this.hasSimpleType[simpleType.name] = true;
    }
  }
}
