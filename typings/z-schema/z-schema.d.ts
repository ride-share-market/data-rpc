interface Validator {
  validateSchema(schema: any): boolean;
  validate(json: string, schema: any): void;
  getLastErrors(): any;
}

interface ZSchemaFactory {
  new(): Validator
}

declare var ZSchema: ZSchemaFactory;

declare module 'z-schema' {
  export = ZSchema
}
