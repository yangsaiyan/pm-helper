export type NumericMapping = Readonly<Record<string, number>>;

export type MappingEntry<TMapping extends NumericMapping> = {
  [Key in keyof TMapping & string]: {
    key: Key;
    value: TMapping[Key];
  };
}[keyof TMapping & string];

export const mappingEntries = <TMapping extends NumericMapping>(
  mapping: TMapping,
): Array<MappingEntry<TMapping>> =>
  Object.entries(mapping).map(
    ([key, value]) =>
      ({
        key,
        value,
      }) as MappingEntry<TMapping>,
  );

export const createLabelGetter =
  <TValue extends string | number>(labels: Readonly<Record<TValue, string>>) =>
  (value: TValue): string =>
    labels[value];
