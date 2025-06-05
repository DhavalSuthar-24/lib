import { EMPTY_STR } from "@bit-core-api/shared-utils-lib";
import { ClassWithoutParentException, ParentWithoutPropertyException } from "./exceptions";

export const Override = () => {
  return (target: any, __: any, property: PropertyDescriptor): void => {
    const parentTarget = Object.getPrototypeOf(target);
    if (Object.getPrototypeOf(target.constructor).name === EMPTY_STR) {
      throw new ClassWithoutParentException(`Class ${target.constructor.name} doesn't have parent`);
    }
    const parentPropertyDescriptor = Object.getOwnPropertyDescriptor(parentTarget, property.value.name);
    if (parentPropertyDescriptor == null) {
      throw new ParentWithoutPropertyException(
        `Parent class ${parentTarget.constructor.name} doesn't have property ${property.value.name}`,
      );
    }
    const metadataKeys = Reflect.getOwnMetadataKeys(parentPropertyDescriptor.value);
    for (const mkey of metadataKeys) {
      const parentMetadata = Reflect.getMetadata(mkey, parentPropertyDescriptor.value);
      Reflect.defineMetadata(mkey, parentMetadata, property.value);
    }
  };
};
