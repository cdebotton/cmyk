import { Repository, EntityMetadata } from 'typeorm';

type Payload = {
  [x: string]: Payload;
};

type Join = {
  table: string;
  select: string[];
};

type Relation = QueryParams & {
  table: string;
  name: string;
};

type QueryParams = {
  select: string[];
  joins: Join[];
  relations: Relation[];
};

const flattenPayload = (
  payload: Payload,
  metadata: EntityMetadata,
): QueryParams =>
  Object.entries(payload).reduce<QueryParams>(
    (acc, [field, value]) => {
      if (Object.keys(value).length === 0) {
        return {
          ...acc,
          select: [...acc.select, field],
        };
      }

      const relation = metadata.relations.find(
        relation => relation.propertyName === field,
      );

      if (!relation) {
        console.log(metadata.relations.map(r => r.propertyName));
        throw new Error(`Invalid relation ${field}`);
      }

      switch (relation.relationType) {
        case 'one-to-many':
        default:
          return {
            ...acc,
            relations: [
              ...acc.relations,
              {
                name: relation.propertyName,
                table: relation.inverseEntityMetadata.tableName,
                ...flattenPayload(value, relation.inverseEntityMetadata),
              },
            ],
          };
      }
    },
    { select: [], joins: [], relations: [] },
  );

const bindTypeORMQuery = <E>(repository: Repository<E>, payload: Payload) => {
  const info = flattenPayload(payload, repository.metadata);

  return info;
};

export default bindTypeORMQuery;
