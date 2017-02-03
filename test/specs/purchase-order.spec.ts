import 'es6-shim';
import {expect} from 'chai';
import * as parser from 'xml2json';
import {createSchemaXml, createJsonSchema} from "../../index";
import {PurchaseOrder} from "../models/PurchaseOrder";
import {XSD_NS} from "../../lib/utils";

const exampleSchemaOptions = {
  elementName: 'purchaseOrder',
  target: PurchaseOrder,
  targetNamespace: 'http://purchase.example.com',
  namespaces: {
    wsdl: 'http://schemas.xmlsoap.org/wsdl/'
  }
};

describe('createSchemaXml()', () => {

  it('should not throw', () => {

    expect(() => createSchemaXml(exampleSchemaOptions)).not.to.throw;
  });

  it('should be able to create a valid wsdl', () => {

    const result = createSchemaXml(exampleSchemaOptions);

    expect(() => parser.toJson(result)).not.to.throw;
    expect(typeof result).to.equal('string');
  });

});

describe('createJsonSchema()', () => {

  it('should not throw', () => {

    expect(() => createJsonSchema(exampleSchemaOptions)).not.to.throw;
  });

  const result = createJsonSchema(exampleSchemaOptions);
  let complexTypes;

  it('should have one root xsd:element', () => {

    expect(result[`${XSD_NS}:element`]).to.have.property('length', 1);
  });

  it('should have appropriate count of complex types', () => {

    complexTypes = result[`${XSD_NS}:complexType`];
    expect(complexTypes).to.have.property('length', 7);
  });

  it('should have appropriate count of simple types', () => {

    expect(result[`${XSD_NS}:simpleType`]).to.have.property('length', 3);
  });

  let purchaseOrderComplexType;
  let purchaseOrderSequence;

  it('should have appropriate count of sequences in purchase order', () => {

    purchaseOrderComplexType = complexTypes[0];
    expect(purchaseOrderComplexType).to.have.property(`${XSD_NS}:sequence`);
    purchaseOrderSequence = purchaseOrderComplexType[`${XSD_NS}:sequence`];
  });

  it('should have appropriate count of elements', () => {

    expect(purchaseOrderSequence).to.have.property(`${XSD_NS}:element`);
    const purchaseOrderElements = purchaseOrderSequence[`${XSD_NS}:element`];
    expect(purchaseOrderElements).to.have.property('length', 5);
  });

  it('should have appropriate count of choices', () => {

    expect(purchaseOrderSequence).to.have.property(`${XSD_NS}:choice`);
    const purchaseOrderChoices = purchaseOrderSequence[`${XSD_NS}:choice`];
    expect(purchaseOrderChoices).to.have.property('length', 1);
  });

});
