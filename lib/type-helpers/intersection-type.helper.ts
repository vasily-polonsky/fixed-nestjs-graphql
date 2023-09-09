import { Type } from '@nestjs/common';
import { isFunction } from '@nestjs/common/utils/shared.utils';
import {
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from '@nestjs/mapped-types';
import { Field } from '../decorators';
import { ClassDecoratorFactory } from '../interfaces/class-decorator-factory.interface';
import { MetadataLoader } from '../plugin/metadata-loader';
import { PropertyMetadata } from '../schema-builder/metadata';
import { getFieldsAndDecoratorForType } from '../schema-builder/utils/get-fields-and-decorator.util';
import { applyFieldDecorators } from './type-helpers.utils';

export function IntersectionType<A, B>(
  classARef: Type<A>,
  classBRef: Type<B>,
  decorator?: ClassDecoratorFactory,
): Type<A & B> {
  const { decoratorFactory, fields: fieldsA } =
    getFieldsAndDecoratorForType(classARef);
  const { fields: fieldsB } = getFieldsAndDecoratorForType(classBRef);
  const fields = [...fieldsA, ...fieldsB];

  abstract class IntersectionObjectType {
    constructor() {
      inheritPropertyInitializers(this, classARef);
      inheritPropertyInitializers(this, classBRef);
    }
  }
  if (decorator) {
    decorator({ isAbstract: true })(IntersectionObjectType);
  } else {
    decoratorFactory({ isAbstract: true })(IntersectionObjectType);
  }

  inheritValidationMetadata(classARef, IntersectionObjectType);
  inheritTransformationMetadata(classARef, IntersectionObjectType);
  inheritValidationMetadata(classBRef, IntersectionObjectType);
  inheritTransformationMetadata(classBRef, IntersectionObjectType);

  function applyFields(fields: PropertyMetadata[]) {
    fields.forEach((item) => {
      if (isFunction(item.typeFn)) {
        // Execute type function eagerly to update the type options object (before "clone" operation)
        // when the passed function (e.g., @Field(() => Type)) lazily returns an array.
        item.typeFn();
      }

      Field(item.typeFn, { ...item.options })(
        IntersectionObjectType.prototype,
        item.name,
      );
      applyFieldDecorators(IntersectionObjectType, item);
    });
  }
  applyFields(fields);

  // Register a refresh hook to update the fields when the serialized metadata
  // is loaded from file.
  MetadataLoader.addRefreshHook(() => {
    const { fields: fieldsA } = getFieldsAndDecoratorForType(classARef, {
      overrideFields: true,
    });
    const { fields: fieldsB } = getFieldsAndDecoratorForType(classBRef, {
      overrideFields: true,
    });
    const fields = [...fieldsA, ...fieldsB];

    applyFields(fields);
  });

  Object.defineProperty(IntersectionObjectType, 'name', {
    value: `Intersection${classARef.name}${classBRef.name}`,
  });
  return IntersectionObjectType as Type<A & B>;
}
