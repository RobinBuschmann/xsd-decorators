import 'es6-shim';
import 'reflect-metadata';

export const XSD_URL = 'http://www.w3.org/2001/XMLSchema';
export const XSD_NS = 'xsd';
export const TNS_NS = 'tns';
export const XMLNS_NS = 'xmlns';

export type XSDType = 'string'|'decimal'|'integer'|'int'|'boolean'|'date'|'time';
export type XSDNSType = 'xsd:string'|'xsd:decimal'|'xsd:integer'|'xsd:int'|'xsd:boolean'|'xsd:date'|'xsd:time';

/**
 * Returns xsd type of specified value;
 *
 * @examples
 *    'hello' => 'xsd:string'
 *    123     => 'xsd:int'
 */
export function getXSDTypeByValue(value: XSDType): XSDNSType {

  const type = typeof value;

  switch (type) {

    case 'string':
      return addXSDNamespace('string');
    case 'number':
      return addXSDNamespace('int');
    case 'boolean':
      return addXSDNamespace('boolean');
    default:
      throw Error(`Cannot convert type of given value. Unkown type '${type}'`);
  }
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
