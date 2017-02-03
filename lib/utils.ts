import 'es6-shim';
import 'reflect-metadata';

export const XSD_URL = 'http://www.w3.org/2001/XMLSchema';
export const XSD_NS = 'xsd';
export const TNS_NS = 'tns';
export const XMLNS_NS = 'xmlns';
export const TYPE_SUFFIX = 'Type';

export type XSDType = 'string'|'boolean'|'decimal'|'int'|'integer'|'float'|'double'|'duration'|'dateTime'|'time'|'date'|
  'gYearMonth'|'gYear'|'gMonthDay'|'gDay'|'gMonth'|'hexBinary'|'base64Binary'|'anyURI'|'QName'|'NOTATION';

export type XSDNSType = 'xsd:string'|'xsd:boolean'|'xsd:int'|'xsd:integer'|'xsd:decimal'|'xsd:float'|'xsd:double'|
  'xsd:duration'|'xsd:dateTime'|'xsd:time'|'xsd:date'|'xsd:gYearMonth'|'xsd:gYear'|'xsd:gMonthDay'|'xsd:gDay'|
  'xsd:gMonth'|'xsd:hexBinary'|'xsd:base64Binary'|'xsd:anyURI'|'xsd:QName'|'xsd:NOTATION';


/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
export function getXSDTypeByValue(value: XSDType): XSDNSType {

  const type = typeof value;

  return addXSDNamespace(type as any);
}


/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
export function getXSDTypeByDataType(type: any): XSDNSType {

  switch (type) {

    case String:
      return addXSDNamespace('string');
    case Number:
      return addXSDNamespace('int');
    case Boolean:
      return addXSDNamespace('boolean');
    case Date:
      return addXSDNamespace('dateTime');
    default:
      throw Error(`Cannot convert type of given value. Unkown type '${type}'`);
  }
}

/**
 * Adds xsd namespace to specified string and returns this value
 */
export function addXSDNamespace(str: XSDType): XSDNSType {

  return (XSD_NS + ':' + str) as XSDNSType;
}

/**
 * Adds tns namespace to specified string and returns this value
 */
export function addCustomNamespace(str: string): string {

  return TNS_NS + ':' + str;
}
