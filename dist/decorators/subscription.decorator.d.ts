import 'reflect-metadata';
import { BaseTypeOptions, ReturnTypeFunc } from '../interfaces';
/**
 * Interface defining options that can be passed to `@Subscription()` decorator.
 */
export interface SubscriptionOptions extends BaseTypeOptions {
    /**
     * Name of the subscription.
     */
    name?: string;
    /**
     * Description of the subscription.
     */
    description?: string;
    /**
     * Subscription deprecation reason (if deprecated).
     */
    deprecationReason?: string;
    /**
     * Filter messages function.
     */
    filter?: (payload: any, variables: any, context: any) => boolean | Promise<boolean>;
    /**
     * Resolve messages function (to transform payload/message shape).
     */
    resolve?: (payload: any, args: any, context: any, info: any) => any | Promise<any>;
}
/**
 * Subscription handler (method) Decorator. Routes subscriptions to this method.
 */
export declare function Subscription(): MethodDecorator;
/**
 * Subscription handler (method) Decorator. Routes subscriptions to this method.
 */
export declare function Subscription(name: string): MethodDecorator;
/**
 * Subscription handler (method) Decorator. Routes subscriptions to this method.
 */
export declare function Subscription(name: string, options: Pick<SubscriptionOptions, 'filter' | 'resolve'>): MethodDecorator;
/**
 * Subscription handler (method) Decorator. Routes subscriptions to this method.
 */
export declare function Subscription(typeFunc: ReturnTypeFunc, options?: SubscriptionOptions): MethodDecorator;
//# sourceMappingURL=subscription.decorator.d.ts.map