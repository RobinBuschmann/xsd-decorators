[![Build Status](https://travis-ci.org/RobinBuschmann/xsd-decorators.png?branch=master)](https://travis-ci.org/RobinBuschmann/xsd-decorators)

# xsd-decorators
Decorators for creating [xsd schemas](https://www.w3.org/TR/xmlschema11-1/).

## Installation
```
npm install xsd-decorators --save
```

## Usage
### 1. Annotate class

```typescript
import {XSDComplexType, XSDElement} from "xsd-decorators";

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
```
(Click [here](https://github.com/RobinBuschmann/xsd-decorators/tree/master/test/models) for full example )

### 2. Create schema
```typescript
import {createSchemaXml} from "xsd-decorators";

const xml = createSchemaXml({
  elementName: 'purchaseOrder',
  target: PurchaseOrder,
  targetNamespace: 'http://purchase.example.com',
  namespaces: {
    wsdl: 'http://schemas.xmlsoap.org/wsdl/'
  }
});

```
**Result**
```xml
<?xml version='1.0' encoding='UTF-8'?>
<xsd:schema attributeFormDefault='unqualified' elementFormDefault='unqualified' xmlns:xsd='http://www.w3.org/2001/XMLSchema' targetNamespace='http://purchase.example.com' xmlns:wsdl='http://schemas.xmlsoap.org/wsdl/'>
  <xsd:element name='purchaseOrder' type='tns:PurchaseOrder'/>
  <xsd:complexType name='PurchaseOrder'>
    <xsd:sequence>
      <xsd:element name='shipTo' type='tns:Customer' minOccurs='1' maxOccurs='1'/>
      <xsd:element name='billTo' type='tns:Customer' minOccurs='1' maxOccurs='1'/>
      <xsd:element name='delivery' type='tns:deliveryType'/>
      <xsd:element name='comment' type='tns:Length0-250Type' maxOccurs='10'/>
      <xsd:element name='items' type='tns:Items'/>
      <xsd:choice minOccurs='1' maxOccurs='1'>
        <xsd:element name='payPalPayment' type='tns:PayPalPayment'/>
        <xsd:element name='creditCardPayment' type='tns:CreditCardPayment'/>
      </xsd:choice>
    </xsd:sequence>
    <xsd:attribute name='dateTime' type='xsd:dateTime'/>
  </xsd:complexType>
  <xsd:complexType name='PayPalPayment'/>
  <xsd:complexType name='CreditCardPayment'/>
  <xsd:complexType name='Customer'>
    <xsd:sequence>
      <xsd:element name='name' type='xsd:string'/>
      <xsd:element name='street' type='xsd:string'/>
      <xsd:element name='city' type='xsd:string'/>
      <xsd:element name='state' type='xsd:string'/>
      <xsd:element name='zip' type='xsd:decimal'/>
    </xsd:sequence>
    <xsd:attribute name='country' type='xsd:string'/>
  </xsd:complexType>
  <xsd:complexType name='Items'>
    <xsd:sequence>
      <xsd:element name='item' type='tns:Item' maxOccurs='unbounded'/>
      <xsd:element name='totalWeight' type='tns:totalWeightSimpleContentType'/>
    </xsd:sequence>
  </xsd:complexType>
  <xsd:complexType name='Item'>
    <xsd:sequence>
      <xsd:element name='productName' type='xsd:string'/>
      <xsd:element name='quantity' type='xsd:int'/>
      <xsd:element name='price' type='xsd:decimal'/>
      <xsd:element name='comment' type='xsd:string'/>
    </xsd:sequence>
    <xsd:attribute name='partNum' type='tns:SKU'/>
  </xsd:complexType>
  <xsd:complexType name='totalWeightSimpleContentType'>
    <xsd:simpleContent>
      <xsd:extension base='xsd:int'>
        <xsd:attribute name='unit' type='xsd:string'/>
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
  <xsd:simpleType name='deliveryType'>
    <xsd:restriction base='xsd:string'>
      <xsd:enumeration value='same-day'/>
      <xsd:enumeration value='express'/>
      <xsd:enumeration value='lazy'/>
    </xsd:restriction>
  </xsd:simpleType>
  <xsd:simpleType name='Length0-250Type'>
    <xsd:restriction base='xsd:string'>
      <xsd:pattern value='^.{0,250}$'/>
    </xsd:restriction>
  </xsd:simpleType>
  <xsd:simpleType name='SKU'>
    <xsd:restriction base='xsd:string'>
      <xsd:pattern value='\d{3}-[A-Z]{2}'/>
    </xsd:restriction>
  </xsd:simpleType>
</xsd:schema>
```
xsd-decorators uses [xml-decorators](https://www.npmjs.com/package/xml-decorators), 
which uses [js2xmlparser](https://www.npmjs.com/package/js2xmlparser), for serialization.
So if you want to retrieve the js2xmlparser schema call `createJsonSchema` with the same 
options.

## Documentation
### complex type options
| name     | type                            | description                                                                 |
|----------|---------------------------------|-----------------------------------------------------------------------------|
| name?    | string                          | Alternative name of complex type. Overrides inferred name of class.         |
| suffix?  | string                          | Adds a suffix to the name of complex type.                                  |
| prefix?  | string                          | Adds a prefix to the name of complex type.                                  |
| choices? | {[name: string]: <choice options>} | Key/value pairs, for defining choice options for specified key/choice name. |

### element options
| name            | type                                                                                     | description                                                                                                                     |
|-----------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| type?           | [xsd primitive type](https://www.w3.org/TR/xmlschema11-2/#built-in-primitive-datatypes)&#124;Class type    | The type of the xsd:element. Normally the type value will be inferred from the type annotation, but this is not always possible.                                                    |
| simpleTypeName? | string                                                                                   | Overrides inferred simple type name.                                                                                            |
| choiceName?     | string                                                                                   | Identifies to which choice the annotated element belongs.                                                                       |
| minOccurs?      | number                                                                                   | see (w3: declare an element)[https://www.w3.org/TR/xmlschema11-1/#declare-element]                                              |
| maxOccurs?      | number                                                                                   | see (w3: declare an element)[https://www.w3.org/TR/xmlschema11-1/#declare-element]                                              |
| minLength?      | number                                                                                   | Creates a xsd:pattern to restrict the length of the elements value to the specified value. (TODO: use native minLength instead) |
| maxLength?      | number                                                                                   | Creates a xsd:pattern to restrict the length of the elements value to the specified value. (TODO: use native minLength instead) |
| enumeration?    | Array<number&#124;string>                                                                | A list of valid values for the annotated element.                                                                               |
| pattern?        | RegExp                                                                                   | Restricts the value of the annotated element by a specified regular expression.                                                 |
| attributes?     | {[attrName: string]: <attr options>}                                                     | Defines attributes for the xsd:element. (Only available for primitive types or primitive arrays - For complex types, define attributes with the attribute annotation in the corresponding class)                                                 |

### attribute options
| name            | type                                                                                     | description                                                                                                                     |
|-----------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| type?           | [xsd primitive type](https://www.w3.org/TR/xmlschema11-2/#built-in-primitive-datatypes)&#124;Class type    | The type of the xsd:element. Normally the type value will be inferred from the type annotation, but this is not always possible.                                                    |
| simpleTypeName? | string                                                                                   | Overrides inferred simple type name.                                                                                            |
| minLength?      | number                                                                                   | Creates a xsd:pattern to restrict the length of the elements value to the specified value. (TODO: use native minLength instead) |
| maxLength?      | number                                                                                   | Creates a xsd:pattern to restrict the length of the elements value to the specified value. (TODO: use native minLength instead) |
| enumeration?    | Array<number&#124;string>                                                                | A list of valid values for the annotated element.                                                                               |
| pattern?        | RegExp                                                                                   | Restricts the value of the annotated element by a specified regular expression.                                                 |

### type inference
The following javascript types can automatically inferred to a xsd type

| js type         | xsd primitive type  |
|-----------------|---------------------|
| String          | xsd:string          |
| Number          | xsd:int             |
| Date            | xsd:dateTime        |
| Boolean         | xsd:boolean         |

When passing a class/constructor function with `@XSDComplexType` annotation, 
xsd-decorators automatically resolves the xsd type for you.

## Features

- [ ] xsd:annotation
- [x] xsd:attribute
- [x] xsd:choice (implicit through decorator options)
- [x] xsd:complexType
- [x] xsd:element
- [ ] xsd:group
- [ ] xsd:import
- [ ] xsd:include
- [x] xsd:restrictions (implicit through decorator options)
  - [x] xsd:enumeration
  - [ ] xsd:fractionDigits
  - [ ] xsd:length
  - [ ] xsd:maxExclusive
  - [ ] xsd:maxInclusive
  - [x] xsd:maxLength
  - [ ] xsd:minExclusive
  - [ ] xsd:minInclusive
  - [x] xsd:minLength
  - [x] xsd:pattern
  - [ ] xsd:totalDigits
  - [ ] xsd:whiteSpace
- [x] xsd:simpleType (implicit through decorator options)
- [ ] ...