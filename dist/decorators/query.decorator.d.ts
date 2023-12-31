import 'reflect-metadata';
import { Complexity } from '../interfaces';
import { BaseTypeOptions } from '../interfaces/base-type-options.interface';
import { ReturnTypeFunc } from '../interfaces/return-type-func.interface';
/**
 * Interface defining options that can be passed to `@Query()` decorator.
 */
export interface QueryOptions extends BaseTypeOptions {
    /**
     * Name of the query.
     */
    name?: string;
    /**
     * Description of the query.
     */
    description?: string;
    /**
     * Query deprecation reason (if deprecated).
     */
    deprecationReason?: string;
    /**
     * Query complexity options.
     */
    complexity?: Complexity;
}
/**
 * Query handler (method) Decorator. Routes specified query to this method.
 */
export declare function Query(): MethodDecorator;
/**
 * Query handler (method) Decorator. Routes specified query to this method.
 */
export declare function Query(name: string): MethodDecorator;
/**
 * Query handler (method) Decorator. Routes specified query to this method.
 */
export declare function Query(typeFunc: ReturnTypeFunc, options?: QueryOptions): MethodDecorator;
//# sourceMappingURL=query.decorator.d.ts.map