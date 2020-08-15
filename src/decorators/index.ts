import { getRepository } from 'typeorm';

export const InjectRepo = (entity: Function) => (target: any, key: string) => {
  const sKey = Symbol(key);
  const get = () => {
    if (!target[sKey]) target[sKey] = getRepository(entity);
    return target[sKey];
  };

  Object.defineProperty(target, key, {
    get
  });
};
