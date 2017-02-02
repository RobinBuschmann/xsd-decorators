import 'es6-shim';
import {expect} from 'chai';
import * as parser from 'xml2json';
import {createSchemaXml, createJsonSchema} from "../../index";
import {PurchaseOrder} from "../models/PurchaseOrder";
import {XSD_NS} from "../../lib/utils";
import {countFiles} from "../utils";
import {fileExtensionFilter} from "../utils";
import {countKeyOccurrenceInFiles} from "../utils";

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

  it('should be able to create a valid wsdl', () => {

    const result = createJsonSchema(exampleSchemaOptions);

    const complexTypes = result[`${XSD_NS}:complexType`];
    expect(complexTypes).to.have.property('length',
      countFiles('./test/models/', fileExtensionFilter('ts')));

    const purchaseOrderComplexType = complexTypes[0];
    expect(purchaseOrderComplexType).to.have.property(`${XSD_NS}:sequence`);

    const purchaseOrderSequence = purchaseOrderComplexType[`${XSD_NS}:sequence`];
    expect(purchaseOrderSequence).to.have.property(`${XSD_NS}:element`);

    const purchaseOrderElements = purchaseOrderSequence[`${XSD_NS}:element`];
    expect(purchaseOrderElements).to.have.property('length',
      countKeyOccurrenceInFiles(['./test/models/PurchaseOrder.ts'], '@XSDElement'));

    expect(result[`${XSD_NS}:simpleType`]).to.have.property('length', 3);

    expect(result[`${XSD_NS}:element`]).to.have.property('length', 1);
  });

});
