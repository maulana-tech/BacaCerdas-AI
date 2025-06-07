type RawSingleData = Record<string, unknown>;
type RawMultipleData = RawSingleData[];
type RawDatabaseData = RawSingleData | RawMultipleData;

type RelationshipItem = {
  type: string;
  attributes: RawSingleData;
  relationships?: Record<string, RelationshipItem | RelationshipItem[]>;
};

type FormattedData = {
  type: string;
  attributes: RawSingleData;
  relationships?: Record<string, RelationshipItem | RelationshipItem[]>;
};

type SerializedData = { data: FormattedData } | { data: FormattedData[] };

export default class ResponseBuilder<
  Data extends RawDatabaseData,
  Field extends string = Data extends RawSingleData
    ? Extract<keyof Data, string>
    : Data extends RawMultipleData
      ? Extract<keyof Data[number], string>
      : never,
> {
  private rawData: Data;
  private excludeFields: Field[] = [];
  private relationshipKeys: Field[] = [];
  private typeMap: Record<string, string> = {};

  constructor(data: Data) {
    this.rawData = data;
  }

  setExcludedFields(fields: Field[]) {
    this.excludeFields = fields;
    return this;
  }

  setRelationships(keys: Field[], typeMap?: Record<string, string>) {
    this.relationshipKeys = keys;
    this.typeMap = typeMap ?? {};
    return this;
  }

  build(type: string): SerializedData {
    const format = (item: RawSingleData): FormattedData => {
      const [attributes, relationships] =
        this.splitAttributesAndRelationships(item);

      return {
        type,
        attributes,
        ...(Object.keys(relationships).length > 0 ? { relationships } : {}),
      };
    };

    if (Array.isArray(this.rawData)) {
      return {
        data: this.rawData.map((item) => format(item)),
      };
    }

    return {
      data: format(this.rawData),
    };
  }

  // --- PRIVATE HELPERS ---

  private splitAttributesAndRelationships(
    data: RawSingleData,
  ): [RawSingleData, Record<string, RelationshipItem | RelationshipItem[]>] {
    const attributes: RawSingleData = {};
    const relationships: Record<string, RelationshipItem | RelationshipItem[]> =
      {};

    for (const [key, value] of Object.entries(data)) {
      if (this.excludeFields.includes(key as Field)) continue;

      if (this.relationshipKeys.includes(key as Field) && value !== null) {
        const relType = this.typeMap[key] ?? key.toLowerCase();

        if (Array.isArray(value)) {
          relationships[key] = value.map((v) =>
            this.createRelationshipObject(relType, v),
          );
        } else {
          relationships[key] = this.createRelationshipObject(
            relType,
            value as RawSingleData,
          );
        }
      } else {
        attributes[key] = value;
      }
    }

    return [attributes, relationships];
  }

  private createRelationshipObject(
    type: string,
    value: RawSingleData,
  ): RelationshipItem {
    const [attributes, nestedRelationships] =
      this.splitAttributesAndRelationships(value);

    return {
      type,
      attributes,
      ...(Object.keys(nestedRelationships).length > 0
        ? { relationships: nestedRelationships }
        : {}),
    };
  }
}
