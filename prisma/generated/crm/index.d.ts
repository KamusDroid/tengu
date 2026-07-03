
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model BlogPost
 * 
 */
export type BlogPost = $Result.DefaultSelection<Prisma.$BlogPostPayload>
/**
 * Model Taller
 * 
 */
export type Taller = $Result.DefaultSelection<Prisma.$TallerPayload>
/**
 * Model Inscripcion
 * 
 */
export type Inscripcion = $Result.DefaultSelection<Prisma.$InscripcionPayload>
/**
 * Model ConfiguracionSitio
 * 
 */
export type ConfiguracionSitio = $Result.DefaultSelection<Prisma.$ConfiguracionSitioPayload>
/**
 * Model BillingClient
 * 
 */
export type BillingClient = $Result.DefaultSelection<Prisma.$BillingClientPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs>;

  /**
   * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPosts
    * const blogPosts = await prisma.blogPost.findMany()
    * ```
    */
  get blogPost(): Prisma.BlogPostDelegate<ExtArgs>;

  /**
   * `prisma.taller`: Exposes CRUD operations for the **Taller** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tallers
    * const tallers = await prisma.taller.findMany()
    * ```
    */
  get taller(): Prisma.TallerDelegate<ExtArgs>;

  /**
   * `prisma.inscripcion`: Exposes CRUD operations for the **Inscripcion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inscripcions
    * const inscripcions = await prisma.inscripcion.findMany()
    * ```
    */
  get inscripcion(): Prisma.InscripcionDelegate<ExtArgs>;

  /**
   * `prisma.configuracionSitio`: Exposes CRUD operations for the **ConfiguracionSitio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConfiguracionSitios
    * const configuracionSitios = await prisma.configuracionSitio.findMany()
    * ```
    */
  get configuracionSitio(): Prisma.ConfiguracionSitioDelegate<ExtArgs>;

  /**
   * `prisma.billingClient`: Exposes CRUD operations for the **BillingClient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BillingClients
    * const billingClients = await prisma.billingClient.findMany()
    * ```
    */
  get billingClient(): Prisma.BillingClientDelegate<ExtArgs>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Customer: 'Customer',
    BlogPost: 'BlogPost',
    Taller: 'Taller',
    Inscripcion: 'Inscripcion',
    ConfiguracionSitio: 'ConfiguracionSitio',
    BillingClient: 'BillingClient',
    Invoice: 'Invoice'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "customer" | "blogPost" | "taller" | "inscripcion" | "configuracionSitio" | "billingClient" | "invoice"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      BlogPost: {
        payload: Prisma.$BlogPostPayload<ExtArgs>
        fields: Prisma.BlogPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findFirst: {
            args: Prisma.BlogPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findMany: {
            args: Prisma.BlogPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          create: {
            args: Prisma.BlogPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          createMany: {
            args: Prisma.BlogPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          delete: {
            args: Prisma.BlogPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          update: {
            args: Prisma.BlogPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          aggregate: {
            args: Prisma.BlogPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPost>
          }
          groupBy: {
            args: Prisma.BlogPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogPostCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostCountAggregateOutputType> | number
          }
        }
      }
      Taller: {
        payload: Prisma.$TallerPayload<ExtArgs>
        fields: Prisma.TallerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TallerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TallerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>
          }
          findFirst: {
            args: Prisma.TallerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TallerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>
          }
          findMany: {
            args: Prisma.TallerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>[]
          }
          create: {
            args: Prisma.TallerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>
          }
          createMany: {
            args: Prisma.TallerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TallerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>[]
          }
          delete: {
            args: Prisma.TallerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>
          }
          update: {
            args: Prisma.TallerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>
          }
          deleteMany: {
            args: Prisma.TallerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TallerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TallerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TallerPayload>
          }
          aggregate: {
            args: Prisma.TallerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTaller>
          }
          groupBy: {
            args: Prisma.TallerGroupByArgs<ExtArgs>
            result: $Utils.Optional<TallerGroupByOutputType>[]
          }
          count: {
            args: Prisma.TallerCountArgs<ExtArgs>
            result: $Utils.Optional<TallerCountAggregateOutputType> | number
          }
        }
      }
      Inscripcion: {
        payload: Prisma.$InscripcionPayload<ExtArgs>
        fields: Prisma.InscripcionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InscripcionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InscripcionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          findFirst: {
            args: Prisma.InscripcionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InscripcionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          findMany: {
            args: Prisma.InscripcionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          create: {
            args: Prisma.InscripcionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          createMany: {
            args: Prisma.InscripcionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InscripcionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          delete: {
            args: Prisma.InscripcionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          update: {
            args: Prisma.InscripcionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          deleteMany: {
            args: Prisma.InscripcionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InscripcionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InscripcionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          aggregate: {
            args: Prisma.InscripcionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInscripcion>
          }
          groupBy: {
            args: Prisma.InscripcionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InscripcionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InscripcionCountArgs<ExtArgs>
            result: $Utils.Optional<InscripcionCountAggregateOutputType> | number
          }
        }
      }
      ConfiguracionSitio: {
        payload: Prisma.$ConfiguracionSitioPayload<ExtArgs>
        fields: Prisma.ConfiguracionSitioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfiguracionSitioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfiguracionSitioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>
          }
          findFirst: {
            args: Prisma.ConfiguracionSitioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfiguracionSitioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>
          }
          findMany: {
            args: Prisma.ConfiguracionSitioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>[]
          }
          create: {
            args: Prisma.ConfiguracionSitioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>
          }
          createMany: {
            args: Prisma.ConfiguracionSitioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfiguracionSitioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>[]
          }
          delete: {
            args: Prisma.ConfiguracionSitioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>
          }
          update: {
            args: Prisma.ConfiguracionSitioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>
          }
          deleteMany: {
            args: Prisma.ConfiguracionSitioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfiguracionSitioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConfiguracionSitioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionSitioPayload>
          }
          aggregate: {
            args: Prisma.ConfiguracionSitioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguracionSitio>
          }
          groupBy: {
            args: Prisma.ConfiguracionSitioGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfiguracionSitioGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfiguracionSitioCountArgs<ExtArgs>
            result: $Utils.Optional<ConfiguracionSitioCountAggregateOutputType> | number
          }
        }
      }
      BillingClient: {
        payload: Prisma.$BillingClientPayload<ExtArgs>
        fields: Prisma.BillingClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillingClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillingClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>
          }
          findFirst: {
            args: Prisma.BillingClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillingClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>
          }
          findMany: {
            args: Prisma.BillingClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>[]
          }
          create: {
            args: Prisma.BillingClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>
          }
          createMany: {
            args: Prisma.BillingClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillingClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>[]
          }
          delete: {
            args: Prisma.BillingClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>
          }
          update: {
            args: Prisma.BillingClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>
          }
          deleteMany: {
            args: Prisma.BillingClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillingClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BillingClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingClientPayload>
          }
          aggregate: {
            args: Prisma.BillingClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBillingClient>
          }
          groupBy: {
            args: Prisma.BillingClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillingClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillingClientCountArgs<ExtArgs>
            result: $Utils.Optional<BillingClientCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TallerCountOutputType
   */

  export type TallerCountOutputType = {
    inscripciones: number
  }

  export type TallerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscripciones?: boolean | TallerCountOutputTypeCountInscripcionesArgs
  }

  // Custom InputTypes
  /**
   * TallerCountOutputType without action
   */
  export type TallerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TallerCountOutputType
     */
    select?: TallerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TallerCountOutputType without action
   */
  export type TallerCountOutputTypeCountInscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
  }


  /**
   * Count Type BillingClientCountOutputType
   */

  export type BillingClientCountOutputType = {
    facturas: number
  }

  export type BillingClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    facturas?: boolean | BillingClientCountOutputTypeCountFacturasArgs
  }

  // Custom InputTypes
  /**
   * BillingClientCountOutputType without action
   */
  export type BillingClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClientCountOutputType
     */
    select?: BillingClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BillingClientCountOutputType without action
   */
  export type BillingClientCountOutputTypeCountFacturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    userId: number
    fullName: number
    email: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    userId?: true
    fullName?: true
    email?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    userId: string | null
    fullName: string
    email: string
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    userId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      fullName: string
      email: string
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly userId: FieldRef<"Customer", 'String'>
    readonly fullName: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
    readonly updatedAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
  }


  /**
   * Model BlogPost
   */

  export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  export type BlogPostMinAggregateOutputType = {
    id: string | null
    titulo: string | null
    slug: string | null
    categoria: string | null
    extracto: string | null
    contenido: string | null
    imagenUrl: string | null
    publicado: boolean | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostMaxAggregateOutputType = {
    id: string | null
    titulo: string | null
    slug: string | null
    categoria: string | null
    extracto: string | null
    contenido: string | null
    imagenUrl: string | null
    publicado: boolean | null
    publishedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogPostCountAggregateOutputType = {
    id: number
    titulo: number
    slug: number
    categoria: number
    extracto: number
    contenido: number
    imagenUrl: number
    publicado: number
    publishedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogPostMinAggregateInputType = {
    id?: true
    titulo?: true
    slug?: true
    categoria?: true
    extracto?: true
    contenido?: true
    imagenUrl?: true
    publicado?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostMaxAggregateInputType = {
    id?: true
    titulo?: true
    slug?: true
    categoria?: true
    extracto?: true
    contenido?: true
    imagenUrl?: true
    publicado?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogPostCountAggregateInputType = {
    id?: true
    titulo?: true
    slug?: true
    categoria?: true
    extracto?: true
    contenido?: true
    imagenUrl?: true
    publicado?: true
    publishedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPost to aggregate.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPosts
    **/
    _count?: true | BlogPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostMaxAggregateInputType
  }

  export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPost[P]>
      : GetScalarType<T[P], AggregateBlogPost[P]>
  }




  export type BlogPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithAggregationInput | BlogPostOrderByWithAggregationInput[]
    by: BlogPostScalarFieldEnum[] | BlogPostScalarFieldEnum
    having?: BlogPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostCountAggregateInputType | true
    _min?: BlogPostMinAggregateInputType
    _max?: BlogPostMaxAggregateInputType
  }

  export type BlogPostGroupByOutputType = {
    id: string
    titulo: string
    slug: string
    categoria: string | null
    extracto: string | null
    contenido: string
    imagenUrl: string | null
    publicado: boolean
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BlogPostCountAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    slug?: boolean
    categoria?: boolean
    extracto?: boolean
    contenido?: boolean
    imagenUrl?: boolean
    publicado?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    slug?: boolean
    categoria?: boolean
    extracto?: boolean
    contenido?: boolean
    imagenUrl?: boolean
    publicado?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["blogPost"]>

  export type BlogPostSelectScalar = {
    id?: boolean
    titulo?: boolean
    slug?: boolean
    categoria?: boolean
    extracto?: boolean
    contenido?: boolean
    imagenUrl?: boolean
    publicado?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $BlogPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPost"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titulo: string
      slug: string
      categoria: string | null
      extracto: string | null
      contenido: string
      imagenUrl: string | null
      publicado: boolean
      publishedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["blogPost"]>
    composites: {}
  }

  type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = $Result.GetResult<Prisma.$BlogPostPayload, S>

  type BlogPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BlogPostCountAggregateInputType | true
    }

  export interface BlogPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'], meta: { name: 'BlogPost' } }
    /**
     * Find zero or one BlogPost that matches the filter.
     * @param {BlogPostFindUniqueArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostFindUniqueArgs>(args: SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BlogPost that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BlogPostFindUniqueOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BlogPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostFindFirstArgs>(args?: SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BlogPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPosts
     * const blogPosts = await prisma.blogPost.findMany()
     * 
     * // Get first 10 BlogPosts
     * const blogPosts = await prisma.blogPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostFindManyArgs>(args?: SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BlogPost.
     * @param {BlogPostCreateArgs} args - Arguments to create a BlogPost.
     * @example
     * // Create one BlogPost
     * const BlogPost = await prisma.blogPost.create({
     *   data: {
     *     // ... data to create a BlogPost
     *   }
     * })
     * 
     */
    create<T extends BlogPostCreateArgs>(args: SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BlogPosts.
     * @param {BlogPostCreateManyArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostCreateManyArgs>(args?: SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlogPosts and returns the data saved in the database.
     * @param {BlogPostCreateManyAndReturnArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlogPosts and only return the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogPostCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BlogPost.
     * @param {BlogPostDeleteArgs} args - Arguments to delete one BlogPost.
     * @example
     * // Delete one BlogPost
     * const BlogPost = await prisma.blogPost.delete({
     *   where: {
     *     // ... filter to delete one BlogPost
     *   }
     * })
     * 
     */
    delete<T extends BlogPostDeleteArgs>(args: SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BlogPost.
     * @param {BlogPostUpdateArgs} args - Arguments to update one BlogPost.
     * @example
     * // Update one BlogPost
     * const blogPost = await prisma.blogPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostUpdateArgs>(args: SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BlogPosts.
     * @param {BlogPostDeleteManyArgs} args - Arguments to filter BlogPosts to delete.
     * @example
     * // Delete a few BlogPosts
     * const { count } = await prisma.blogPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostUpdateManyArgs>(args: SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogPost.
     * @param {BlogPostUpsertArgs} args - Arguments to update or create a BlogPost.
     * @example
     * // Update or create a BlogPost
     * const blogPost = await prisma.blogPost.upsert({
     *   create: {
     *     // ... data to create a BlogPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPost we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostUpsertArgs>(args: SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostCountArgs} args - Arguments to filter BlogPosts to count.
     * @example
     * // Count the number of BlogPosts
     * const count = await prisma.blogPost.count({
     *   where: {
     *     // ... the filter for the BlogPosts we want to count
     *   }
     * })
    **/
    count<T extends BlogPostCountArgs>(
      args?: Subset<T, BlogPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogPostAggregateArgs>(args: Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>

    /**
     * Group by BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPost model
   */
  readonly fields: BlogPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BlogPost model
   */ 
  interface BlogPostFieldRefs {
    readonly id: FieldRef<"BlogPost", 'String'>
    readonly titulo: FieldRef<"BlogPost", 'String'>
    readonly slug: FieldRef<"BlogPost", 'String'>
    readonly categoria: FieldRef<"BlogPost", 'String'>
    readonly extracto: FieldRef<"BlogPost", 'String'>
    readonly contenido: FieldRef<"BlogPost", 'String'>
    readonly imagenUrl: FieldRef<"BlogPost", 'String'>
    readonly publicado: FieldRef<"BlogPost", 'Boolean'>
    readonly publishedAt: FieldRef<"BlogPost", 'DateTime'>
    readonly createdAt: FieldRef<"BlogPost", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlogPost findUnique
   */
  export type BlogPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findUniqueOrThrow
   */
  export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findFirst
   */
  export type BlogPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findFirstOrThrow
   */
  export type BlogPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findMany
   */
  export type BlogPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter, which BlogPosts to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost create
   */
  export type BlogPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * The data needed to create a BlogPost.
     */
    data: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
  }

  /**
   * BlogPost createMany
   */
  export type BlogPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost createManyAndReturn
   */
  export type BlogPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost update
   */
  export type BlogPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * The data needed to update a BlogPost.
     */
    data: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
    /**
     * Choose, which BlogPost to update.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost updateMany
   */
  export type BlogPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
  }

  /**
   * BlogPost upsert
   */
  export type BlogPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * The filter to search for the BlogPost to update in case it exists.
     */
    where: BlogPostWhereUniqueInput
    /**
     * In case the BlogPost found by the `where` argument doesn't exist, create a new BlogPost with this data.
     */
    create: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
    /**
     * In case the BlogPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
  }

  /**
   * BlogPost delete
   */
  export type BlogPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Filter which BlogPost to delete.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost deleteMany
   */
  export type BlogPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPosts to delete
     */
    where?: BlogPostWhereInput
  }

  /**
   * BlogPost without action
   */
  export type BlogPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
  }


  /**
   * Model Taller
   */

  export type AggregateTaller = {
    _count: TallerCountAggregateOutputType | null
    _avg: TallerAvgAggregateOutputType | null
    _sum: TallerSumAggregateOutputType | null
    _min: TallerMinAggregateOutputType | null
    _max: TallerMaxAggregateOutputType | null
  }

  export type TallerAvgAggregateOutputType = {
    precio: number | null
    cupoMaximo: number | null
  }

  export type TallerSumAggregateOutputType = {
    precio: number | null
    cupoMaximo: number | null
  }

  export type TallerMinAggregateOutputType = {
    id: string | null
    titulo: string | null
    nivel: string | null
    modalidad: string | null
    descripcion: string | null
    precio: number | null
    fecha: Date | null
    cupoMaximo: number | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TallerMaxAggregateOutputType = {
    id: string | null
    titulo: string | null
    nivel: string | null
    modalidad: string | null
    descripcion: string | null
    precio: number | null
    fecha: Date | null
    cupoMaximo: number | null
    activo: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TallerCountAggregateOutputType = {
    id: number
    titulo: number
    nivel: number
    modalidad: number
    descripcion: number
    precio: number
    fecha: number
    cupoMaximo: number
    activo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TallerAvgAggregateInputType = {
    precio?: true
    cupoMaximo?: true
  }

  export type TallerSumAggregateInputType = {
    precio?: true
    cupoMaximo?: true
  }

  export type TallerMinAggregateInputType = {
    id?: true
    titulo?: true
    nivel?: true
    modalidad?: true
    descripcion?: true
    precio?: true
    fecha?: true
    cupoMaximo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TallerMaxAggregateInputType = {
    id?: true
    titulo?: true
    nivel?: true
    modalidad?: true
    descripcion?: true
    precio?: true
    fecha?: true
    cupoMaximo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TallerCountAggregateInputType = {
    id?: true
    titulo?: true
    nivel?: true
    modalidad?: true
    descripcion?: true
    precio?: true
    fecha?: true
    cupoMaximo?: true
    activo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TallerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Taller to aggregate.
     */
    where?: TallerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tallers to fetch.
     */
    orderBy?: TallerOrderByWithRelationInput | TallerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TallerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tallers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tallers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tallers
    **/
    _count?: true | TallerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TallerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TallerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TallerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TallerMaxAggregateInputType
  }

  export type GetTallerAggregateType<T extends TallerAggregateArgs> = {
        [P in keyof T & keyof AggregateTaller]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTaller[P]>
      : GetScalarType<T[P], AggregateTaller[P]>
  }




  export type TallerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TallerWhereInput
    orderBy?: TallerOrderByWithAggregationInput | TallerOrderByWithAggregationInput[]
    by: TallerScalarFieldEnum[] | TallerScalarFieldEnum
    having?: TallerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TallerCountAggregateInputType | true
    _avg?: TallerAvgAggregateInputType
    _sum?: TallerSumAggregateInputType
    _min?: TallerMinAggregateInputType
    _max?: TallerMaxAggregateInputType
  }

  export type TallerGroupByOutputType = {
    id: string
    titulo: string
    nivel: string | null
    modalidad: string | null
    descripcion: string | null
    precio: number | null
    fecha: Date | null
    cupoMaximo: number | null
    activo: boolean
    createdAt: Date
    updatedAt: Date
    _count: TallerCountAggregateOutputType | null
    _avg: TallerAvgAggregateOutputType | null
    _sum: TallerSumAggregateOutputType | null
    _min: TallerMinAggregateOutputType | null
    _max: TallerMaxAggregateOutputType | null
  }

  type GetTallerGroupByPayload<T extends TallerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TallerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TallerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TallerGroupByOutputType[P]>
            : GetScalarType<T[P], TallerGroupByOutputType[P]>
        }
      >
    >


  export type TallerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    nivel?: boolean
    modalidad?: boolean
    descripcion?: boolean
    precio?: boolean
    fecha?: boolean
    cupoMaximo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    inscripciones?: boolean | Taller$inscripcionesArgs<ExtArgs>
    _count?: boolean | TallerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["taller"]>

  export type TallerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titulo?: boolean
    nivel?: boolean
    modalidad?: boolean
    descripcion?: boolean
    precio?: boolean
    fecha?: boolean
    cupoMaximo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["taller"]>

  export type TallerSelectScalar = {
    id?: boolean
    titulo?: boolean
    nivel?: boolean
    modalidad?: boolean
    descripcion?: boolean
    precio?: boolean
    fecha?: boolean
    cupoMaximo?: boolean
    activo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TallerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inscripciones?: boolean | Taller$inscripcionesArgs<ExtArgs>
    _count?: boolean | TallerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TallerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TallerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Taller"
    objects: {
      inscripciones: Prisma.$InscripcionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titulo: string
      nivel: string | null
      modalidad: string | null
      descripcion: string | null
      precio: number | null
      fecha: Date | null
      cupoMaximo: number | null
      activo: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["taller"]>
    composites: {}
  }

  type TallerGetPayload<S extends boolean | null | undefined | TallerDefaultArgs> = $Result.GetResult<Prisma.$TallerPayload, S>

  type TallerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TallerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TallerCountAggregateInputType | true
    }

  export interface TallerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Taller'], meta: { name: 'Taller' } }
    /**
     * Find zero or one Taller that matches the filter.
     * @param {TallerFindUniqueArgs} args - Arguments to find a Taller
     * @example
     * // Get one Taller
     * const taller = await prisma.taller.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TallerFindUniqueArgs>(args: SelectSubset<T, TallerFindUniqueArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Taller that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TallerFindUniqueOrThrowArgs} args - Arguments to find a Taller
     * @example
     * // Get one Taller
     * const taller = await prisma.taller.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TallerFindUniqueOrThrowArgs>(args: SelectSubset<T, TallerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Taller that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TallerFindFirstArgs} args - Arguments to find a Taller
     * @example
     * // Get one Taller
     * const taller = await prisma.taller.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TallerFindFirstArgs>(args?: SelectSubset<T, TallerFindFirstArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Taller that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TallerFindFirstOrThrowArgs} args - Arguments to find a Taller
     * @example
     * // Get one Taller
     * const taller = await prisma.taller.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TallerFindFirstOrThrowArgs>(args?: SelectSubset<T, TallerFindFirstOrThrowArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tallers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TallerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tallers
     * const tallers = await prisma.taller.findMany()
     * 
     * // Get first 10 Tallers
     * const tallers = await prisma.taller.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tallerWithIdOnly = await prisma.taller.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TallerFindManyArgs>(args?: SelectSubset<T, TallerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Taller.
     * @param {TallerCreateArgs} args - Arguments to create a Taller.
     * @example
     * // Create one Taller
     * const Taller = await prisma.taller.create({
     *   data: {
     *     // ... data to create a Taller
     *   }
     * })
     * 
     */
    create<T extends TallerCreateArgs>(args: SelectSubset<T, TallerCreateArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tallers.
     * @param {TallerCreateManyArgs} args - Arguments to create many Tallers.
     * @example
     * // Create many Tallers
     * const taller = await prisma.taller.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TallerCreateManyArgs>(args?: SelectSubset<T, TallerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tallers and returns the data saved in the database.
     * @param {TallerCreateManyAndReturnArgs} args - Arguments to create many Tallers.
     * @example
     * // Create many Tallers
     * const taller = await prisma.taller.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tallers and only return the `id`
     * const tallerWithIdOnly = await prisma.taller.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TallerCreateManyAndReturnArgs>(args?: SelectSubset<T, TallerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Taller.
     * @param {TallerDeleteArgs} args - Arguments to delete one Taller.
     * @example
     * // Delete one Taller
     * const Taller = await prisma.taller.delete({
     *   where: {
     *     // ... filter to delete one Taller
     *   }
     * })
     * 
     */
    delete<T extends TallerDeleteArgs>(args: SelectSubset<T, TallerDeleteArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Taller.
     * @param {TallerUpdateArgs} args - Arguments to update one Taller.
     * @example
     * // Update one Taller
     * const taller = await prisma.taller.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TallerUpdateArgs>(args: SelectSubset<T, TallerUpdateArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tallers.
     * @param {TallerDeleteManyArgs} args - Arguments to filter Tallers to delete.
     * @example
     * // Delete a few Tallers
     * const { count } = await prisma.taller.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TallerDeleteManyArgs>(args?: SelectSubset<T, TallerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tallers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TallerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tallers
     * const taller = await prisma.taller.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TallerUpdateManyArgs>(args: SelectSubset<T, TallerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Taller.
     * @param {TallerUpsertArgs} args - Arguments to update or create a Taller.
     * @example
     * // Update or create a Taller
     * const taller = await prisma.taller.upsert({
     *   create: {
     *     // ... data to create a Taller
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Taller we want to update
     *   }
     * })
     */
    upsert<T extends TallerUpsertArgs>(args: SelectSubset<T, TallerUpsertArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tallers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TallerCountArgs} args - Arguments to filter Tallers to count.
     * @example
     * // Count the number of Tallers
     * const count = await prisma.taller.count({
     *   where: {
     *     // ... the filter for the Tallers we want to count
     *   }
     * })
    **/
    count<T extends TallerCountArgs>(
      args?: Subset<T, TallerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TallerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Taller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TallerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TallerAggregateArgs>(args: Subset<T, TallerAggregateArgs>): Prisma.PrismaPromise<GetTallerAggregateType<T>>

    /**
     * Group by Taller.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TallerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TallerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TallerGroupByArgs['orderBy'] }
        : { orderBy?: TallerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TallerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTallerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Taller model
   */
  readonly fields: TallerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Taller.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TallerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inscripciones<T extends Taller$inscripcionesArgs<ExtArgs> = {}>(args?: Subset<T, Taller$inscripcionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Taller model
   */ 
  interface TallerFieldRefs {
    readonly id: FieldRef<"Taller", 'String'>
    readonly titulo: FieldRef<"Taller", 'String'>
    readonly nivel: FieldRef<"Taller", 'String'>
    readonly modalidad: FieldRef<"Taller", 'String'>
    readonly descripcion: FieldRef<"Taller", 'String'>
    readonly precio: FieldRef<"Taller", 'Int'>
    readonly fecha: FieldRef<"Taller", 'DateTime'>
    readonly cupoMaximo: FieldRef<"Taller", 'Int'>
    readonly activo: FieldRef<"Taller", 'Boolean'>
    readonly createdAt: FieldRef<"Taller", 'DateTime'>
    readonly updatedAt: FieldRef<"Taller", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Taller findUnique
   */
  export type TallerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * Filter, which Taller to fetch.
     */
    where: TallerWhereUniqueInput
  }

  /**
   * Taller findUniqueOrThrow
   */
  export type TallerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * Filter, which Taller to fetch.
     */
    where: TallerWhereUniqueInput
  }

  /**
   * Taller findFirst
   */
  export type TallerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * Filter, which Taller to fetch.
     */
    where?: TallerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tallers to fetch.
     */
    orderBy?: TallerOrderByWithRelationInput | TallerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tallers.
     */
    cursor?: TallerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tallers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tallers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tallers.
     */
    distinct?: TallerScalarFieldEnum | TallerScalarFieldEnum[]
  }

  /**
   * Taller findFirstOrThrow
   */
  export type TallerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * Filter, which Taller to fetch.
     */
    where?: TallerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tallers to fetch.
     */
    orderBy?: TallerOrderByWithRelationInput | TallerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tallers.
     */
    cursor?: TallerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tallers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tallers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tallers.
     */
    distinct?: TallerScalarFieldEnum | TallerScalarFieldEnum[]
  }

  /**
   * Taller findMany
   */
  export type TallerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * Filter, which Tallers to fetch.
     */
    where?: TallerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tallers to fetch.
     */
    orderBy?: TallerOrderByWithRelationInput | TallerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tallers.
     */
    cursor?: TallerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tallers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tallers.
     */
    skip?: number
    distinct?: TallerScalarFieldEnum | TallerScalarFieldEnum[]
  }

  /**
   * Taller create
   */
  export type TallerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * The data needed to create a Taller.
     */
    data: XOR<TallerCreateInput, TallerUncheckedCreateInput>
  }

  /**
   * Taller createMany
   */
  export type TallerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tallers.
     */
    data: TallerCreateManyInput | TallerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Taller createManyAndReturn
   */
  export type TallerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tallers.
     */
    data: TallerCreateManyInput | TallerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Taller update
   */
  export type TallerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * The data needed to update a Taller.
     */
    data: XOR<TallerUpdateInput, TallerUncheckedUpdateInput>
    /**
     * Choose, which Taller to update.
     */
    where: TallerWhereUniqueInput
  }

  /**
   * Taller updateMany
   */
  export type TallerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tallers.
     */
    data: XOR<TallerUpdateManyMutationInput, TallerUncheckedUpdateManyInput>
    /**
     * Filter which Tallers to update
     */
    where?: TallerWhereInput
  }

  /**
   * Taller upsert
   */
  export type TallerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * The filter to search for the Taller to update in case it exists.
     */
    where: TallerWhereUniqueInput
    /**
     * In case the Taller found by the `where` argument doesn't exist, create a new Taller with this data.
     */
    create: XOR<TallerCreateInput, TallerUncheckedCreateInput>
    /**
     * In case the Taller was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TallerUpdateInput, TallerUncheckedUpdateInput>
  }

  /**
   * Taller delete
   */
  export type TallerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
    /**
     * Filter which Taller to delete.
     */
    where: TallerWhereUniqueInput
  }

  /**
   * Taller deleteMany
   */
  export type TallerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tallers to delete
     */
    where?: TallerWhereInput
  }

  /**
   * Taller.inscripciones
   */
  export type Taller$inscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    cursor?: InscripcionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Taller without action
   */
  export type TallerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Taller
     */
    select?: TallerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TallerInclude<ExtArgs> | null
  }


  /**
   * Model Inscripcion
   */

  export type AggregateInscripcion = {
    _count: InscripcionCountAggregateOutputType | null
    _min: InscripcionMinAggregateOutputType | null
    _max: InscripcionMaxAggregateOutputType | null
  }

  export type InscripcionMinAggregateOutputType = {
    id: string | null
    tallerId: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    estado: string | null
    createdAt: Date | null
  }

  export type InscripcionMaxAggregateOutputType = {
    id: string | null
    tallerId: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    estado: string | null
    createdAt: Date | null
  }

  export type InscripcionCountAggregateOutputType = {
    id: number
    tallerId: number
    nombre: number
    email: number
    telefono: number
    estado: number
    createdAt: number
    _all: number
  }


  export type InscripcionMinAggregateInputType = {
    id?: true
    tallerId?: true
    nombre?: true
    email?: true
    telefono?: true
    estado?: true
    createdAt?: true
  }

  export type InscripcionMaxAggregateInputType = {
    id?: true
    tallerId?: true
    nombre?: true
    email?: true
    telefono?: true
    estado?: true
    createdAt?: true
  }

  export type InscripcionCountAggregateInputType = {
    id?: true
    tallerId?: true
    nombre?: true
    email?: true
    telefono?: true
    estado?: true
    createdAt?: true
    _all?: true
  }

  export type InscripcionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscripcion to aggregate.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inscripcions
    **/
    _count?: true | InscripcionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InscripcionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InscripcionMaxAggregateInputType
  }

  export type GetInscripcionAggregateType<T extends InscripcionAggregateArgs> = {
        [P in keyof T & keyof AggregateInscripcion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInscripcion[P]>
      : GetScalarType<T[P], AggregateInscripcion[P]>
  }




  export type InscripcionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithAggregationInput | InscripcionOrderByWithAggregationInput[]
    by: InscripcionScalarFieldEnum[] | InscripcionScalarFieldEnum
    having?: InscripcionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InscripcionCountAggregateInputType | true
    _min?: InscripcionMinAggregateInputType
    _max?: InscripcionMaxAggregateInputType
  }

  export type InscripcionGroupByOutputType = {
    id: string
    tallerId: string
    nombre: string
    email: string
    telefono: string | null
    estado: string
    createdAt: Date
    _count: InscripcionCountAggregateOutputType | null
    _min: InscripcionMinAggregateOutputType | null
    _max: InscripcionMaxAggregateOutputType | null
  }

  type GetInscripcionGroupByPayload<T extends InscripcionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InscripcionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InscripcionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InscripcionGroupByOutputType[P]>
            : GetScalarType<T[P], InscripcionGroupByOutputType[P]>
        }
      >
    >


  export type InscripcionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tallerId?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    estado?: boolean
    createdAt?: boolean
    taller?: boolean | TallerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tallerId?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    estado?: boolean
    createdAt?: boolean
    taller?: boolean | TallerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectScalar = {
    id?: boolean
    tallerId?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    estado?: boolean
    createdAt?: boolean
  }

  export type InscripcionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taller?: boolean | TallerDefaultArgs<ExtArgs>
  }
  export type InscripcionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    taller?: boolean | TallerDefaultArgs<ExtArgs>
  }

  export type $InscripcionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inscripcion"
    objects: {
      taller: Prisma.$TallerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tallerId: string
      nombre: string
      email: string
      telefono: string | null
      estado: string
      createdAt: Date
    }, ExtArgs["result"]["inscripcion"]>
    composites: {}
  }

  type InscripcionGetPayload<S extends boolean | null | undefined | InscripcionDefaultArgs> = $Result.GetResult<Prisma.$InscripcionPayload, S>

  type InscripcionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InscripcionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InscripcionCountAggregateInputType | true
    }

  export interface InscripcionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inscripcion'], meta: { name: 'Inscripcion' } }
    /**
     * Find zero or one Inscripcion that matches the filter.
     * @param {InscripcionFindUniqueArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InscripcionFindUniqueArgs>(args: SelectSubset<T, InscripcionFindUniqueArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Inscripcion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InscripcionFindUniqueOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InscripcionFindUniqueOrThrowArgs>(args: SelectSubset<T, InscripcionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Inscripcion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InscripcionFindFirstArgs>(args?: SelectSubset<T, InscripcionFindFirstArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Inscripcion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InscripcionFindFirstOrThrowArgs>(args?: SelectSubset<T, InscripcionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Inscripcions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany()
     * 
     * // Get first 10 Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inscripcionWithIdOnly = await prisma.inscripcion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InscripcionFindManyArgs>(args?: SelectSubset<T, InscripcionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Inscripcion.
     * @param {InscripcionCreateArgs} args - Arguments to create a Inscripcion.
     * @example
     * // Create one Inscripcion
     * const Inscripcion = await prisma.inscripcion.create({
     *   data: {
     *     // ... data to create a Inscripcion
     *   }
     * })
     * 
     */
    create<T extends InscripcionCreateArgs>(args: SelectSubset<T, InscripcionCreateArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Inscripcions.
     * @param {InscripcionCreateManyArgs} args - Arguments to create many Inscripcions.
     * @example
     * // Create many Inscripcions
     * const inscripcion = await prisma.inscripcion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InscripcionCreateManyArgs>(args?: SelectSubset<T, InscripcionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inscripcions and returns the data saved in the database.
     * @param {InscripcionCreateManyAndReturnArgs} args - Arguments to create many Inscripcions.
     * @example
     * // Create many Inscripcions
     * const inscripcion = await prisma.inscripcion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inscripcions and only return the `id`
     * const inscripcionWithIdOnly = await prisma.inscripcion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InscripcionCreateManyAndReturnArgs>(args?: SelectSubset<T, InscripcionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Inscripcion.
     * @param {InscripcionDeleteArgs} args - Arguments to delete one Inscripcion.
     * @example
     * // Delete one Inscripcion
     * const Inscripcion = await prisma.inscripcion.delete({
     *   where: {
     *     // ... filter to delete one Inscripcion
     *   }
     * })
     * 
     */
    delete<T extends InscripcionDeleteArgs>(args: SelectSubset<T, InscripcionDeleteArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Inscripcion.
     * @param {InscripcionUpdateArgs} args - Arguments to update one Inscripcion.
     * @example
     * // Update one Inscripcion
     * const inscripcion = await prisma.inscripcion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InscripcionUpdateArgs>(args: SelectSubset<T, InscripcionUpdateArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Inscripcions.
     * @param {InscripcionDeleteManyArgs} args - Arguments to filter Inscripcions to delete.
     * @example
     * // Delete a few Inscripcions
     * const { count } = await prisma.inscripcion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InscripcionDeleteManyArgs>(args?: SelectSubset<T, InscripcionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inscripcions
     * const inscripcion = await prisma.inscripcion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InscripcionUpdateManyArgs>(args: SelectSubset<T, InscripcionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Inscripcion.
     * @param {InscripcionUpsertArgs} args - Arguments to update or create a Inscripcion.
     * @example
     * // Update or create a Inscripcion
     * const inscripcion = await prisma.inscripcion.upsert({
     *   create: {
     *     // ... data to create a Inscripcion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inscripcion we want to update
     *   }
     * })
     */
    upsert<T extends InscripcionUpsertArgs>(args: SelectSubset<T, InscripcionUpsertArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionCountArgs} args - Arguments to filter Inscripcions to count.
     * @example
     * // Count the number of Inscripcions
     * const count = await prisma.inscripcion.count({
     *   where: {
     *     // ... the filter for the Inscripcions we want to count
     *   }
     * })
    **/
    count<T extends InscripcionCountArgs>(
      args?: Subset<T, InscripcionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InscripcionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InscripcionAggregateArgs>(args: Subset<T, InscripcionAggregateArgs>): Prisma.PrismaPromise<GetInscripcionAggregateType<T>>

    /**
     * Group by Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InscripcionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InscripcionGroupByArgs['orderBy'] }
        : { orderBy?: InscripcionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InscripcionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInscripcionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inscripcion model
   */
  readonly fields: InscripcionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inscripcion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InscripcionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    taller<T extends TallerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TallerDefaultArgs<ExtArgs>>): Prisma__TallerClient<$Result.GetResult<Prisma.$TallerPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inscripcion model
   */ 
  interface InscripcionFieldRefs {
    readonly id: FieldRef<"Inscripcion", 'String'>
    readonly tallerId: FieldRef<"Inscripcion", 'String'>
    readonly nombre: FieldRef<"Inscripcion", 'String'>
    readonly email: FieldRef<"Inscripcion", 'String'>
    readonly telefono: FieldRef<"Inscripcion", 'String'>
    readonly estado: FieldRef<"Inscripcion", 'String'>
    readonly createdAt: FieldRef<"Inscripcion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inscripcion findUnique
   */
  export type InscripcionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion findUniqueOrThrow
   */
  export type InscripcionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion findFirst
   */
  export type InscripcionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion findFirstOrThrow
   */
  export type InscripcionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion findMany
   */
  export type InscripcionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcions to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion create
   */
  export type InscripcionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The data needed to create a Inscripcion.
     */
    data: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>
  }

  /**
   * Inscripcion createMany
   */
  export type InscripcionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inscripcions.
     */
    data: InscripcionCreateManyInput | InscripcionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inscripcion createManyAndReturn
   */
  export type InscripcionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Inscripcions.
     */
    data: InscripcionCreateManyInput | InscripcionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscripcion update
   */
  export type InscripcionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The data needed to update a Inscripcion.
     */
    data: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>
    /**
     * Choose, which Inscripcion to update.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion updateMany
   */
  export type InscripcionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inscripcions.
     */
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyInput>
    /**
     * Filter which Inscripcions to update
     */
    where?: InscripcionWhereInput
  }

  /**
   * Inscripcion upsert
   */
  export type InscripcionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The filter to search for the Inscripcion to update in case it exists.
     */
    where: InscripcionWhereUniqueInput
    /**
     * In case the Inscripcion found by the `where` argument doesn't exist, create a new Inscripcion with this data.
     */
    create: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>
    /**
     * In case the Inscripcion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>
  }

  /**
   * Inscripcion delete
   */
  export type InscripcionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter which Inscripcion to delete.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion deleteMany
   */
  export type InscripcionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscripcions to delete
     */
    where?: InscripcionWhereInput
  }

  /**
   * Inscripcion without action
   */
  export type InscripcionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
  }


  /**
   * Model ConfiguracionSitio
   */

  export type AggregateConfiguracionSitio = {
    _count: ConfiguracionSitioCountAggregateOutputType | null
    _min: ConfiguracionSitioMinAggregateOutputType | null
    _max: ConfiguracionSitioMaxAggregateOutputType | null
  }

  export type ConfiguracionSitioMinAggregateOutputType = {
    id: string | null
    clave: string | null
    valor: string | null
  }

  export type ConfiguracionSitioMaxAggregateOutputType = {
    id: string | null
    clave: string | null
    valor: string | null
  }

  export type ConfiguracionSitioCountAggregateOutputType = {
    id: number
    clave: number
    valor: number
    _all: number
  }


  export type ConfiguracionSitioMinAggregateInputType = {
    id?: true
    clave?: true
    valor?: true
  }

  export type ConfiguracionSitioMaxAggregateInputType = {
    id?: true
    clave?: true
    valor?: true
  }

  export type ConfiguracionSitioCountAggregateInputType = {
    id?: true
    clave?: true
    valor?: true
    _all?: true
  }

  export type ConfiguracionSitioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConfiguracionSitio to aggregate.
     */
    where?: ConfiguracionSitioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfiguracionSitios to fetch.
     */
    orderBy?: ConfiguracionSitioOrderByWithRelationInput | ConfiguracionSitioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfiguracionSitioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfiguracionSitios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfiguracionSitios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConfiguracionSitios
    **/
    _count?: true | ConfiguracionSitioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfiguracionSitioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfiguracionSitioMaxAggregateInputType
  }

  export type GetConfiguracionSitioAggregateType<T extends ConfiguracionSitioAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguracionSitio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguracionSitio[P]>
      : GetScalarType<T[P], AggregateConfiguracionSitio[P]>
  }




  export type ConfiguracionSitioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfiguracionSitioWhereInput
    orderBy?: ConfiguracionSitioOrderByWithAggregationInput | ConfiguracionSitioOrderByWithAggregationInput[]
    by: ConfiguracionSitioScalarFieldEnum[] | ConfiguracionSitioScalarFieldEnum
    having?: ConfiguracionSitioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfiguracionSitioCountAggregateInputType | true
    _min?: ConfiguracionSitioMinAggregateInputType
    _max?: ConfiguracionSitioMaxAggregateInputType
  }

  export type ConfiguracionSitioGroupByOutputType = {
    id: string
    clave: string
    valor: string
    _count: ConfiguracionSitioCountAggregateOutputType | null
    _min: ConfiguracionSitioMinAggregateOutputType | null
    _max: ConfiguracionSitioMaxAggregateOutputType | null
  }

  type GetConfiguracionSitioGroupByPayload<T extends ConfiguracionSitioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfiguracionSitioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfiguracionSitioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfiguracionSitioGroupByOutputType[P]>
            : GetScalarType<T[P], ConfiguracionSitioGroupByOutputType[P]>
        }
      >
    >


  export type ConfiguracionSitioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clave?: boolean
    valor?: boolean
  }, ExtArgs["result"]["configuracionSitio"]>

  export type ConfiguracionSitioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clave?: boolean
    valor?: boolean
  }, ExtArgs["result"]["configuracionSitio"]>

  export type ConfiguracionSitioSelectScalar = {
    id?: boolean
    clave?: boolean
    valor?: boolean
  }


  export type $ConfiguracionSitioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConfiguracionSitio"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clave: string
      valor: string
    }, ExtArgs["result"]["configuracionSitio"]>
    composites: {}
  }

  type ConfiguracionSitioGetPayload<S extends boolean | null | undefined | ConfiguracionSitioDefaultArgs> = $Result.GetResult<Prisma.$ConfiguracionSitioPayload, S>

  type ConfiguracionSitioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConfiguracionSitioFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConfiguracionSitioCountAggregateInputType | true
    }

  export interface ConfiguracionSitioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConfiguracionSitio'], meta: { name: 'ConfiguracionSitio' } }
    /**
     * Find zero or one ConfiguracionSitio that matches the filter.
     * @param {ConfiguracionSitioFindUniqueArgs} args - Arguments to find a ConfiguracionSitio
     * @example
     * // Get one ConfiguracionSitio
     * const configuracionSitio = await prisma.configuracionSitio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfiguracionSitioFindUniqueArgs>(args: SelectSubset<T, ConfiguracionSitioFindUniqueArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ConfiguracionSitio that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConfiguracionSitioFindUniqueOrThrowArgs} args - Arguments to find a ConfiguracionSitio
     * @example
     * // Get one ConfiguracionSitio
     * const configuracionSitio = await prisma.configuracionSitio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfiguracionSitioFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfiguracionSitioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ConfiguracionSitio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionSitioFindFirstArgs} args - Arguments to find a ConfiguracionSitio
     * @example
     * // Get one ConfiguracionSitio
     * const configuracionSitio = await prisma.configuracionSitio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfiguracionSitioFindFirstArgs>(args?: SelectSubset<T, ConfiguracionSitioFindFirstArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ConfiguracionSitio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionSitioFindFirstOrThrowArgs} args - Arguments to find a ConfiguracionSitio
     * @example
     * // Get one ConfiguracionSitio
     * const configuracionSitio = await prisma.configuracionSitio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfiguracionSitioFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfiguracionSitioFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ConfiguracionSitios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionSitioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConfiguracionSitios
     * const configuracionSitios = await prisma.configuracionSitio.findMany()
     * 
     * // Get first 10 ConfiguracionSitios
     * const configuracionSitios = await prisma.configuracionSitio.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configuracionSitioWithIdOnly = await prisma.configuracionSitio.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConfiguracionSitioFindManyArgs>(args?: SelectSubset<T, ConfiguracionSitioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ConfiguracionSitio.
     * @param {ConfiguracionSitioCreateArgs} args - Arguments to create a ConfiguracionSitio.
     * @example
     * // Create one ConfiguracionSitio
     * const ConfiguracionSitio = await prisma.configuracionSitio.create({
     *   data: {
     *     // ... data to create a ConfiguracionSitio
     *   }
     * })
     * 
     */
    create<T extends ConfiguracionSitioCreateArgs>(args: SelectSubset<T, ConfiguracionSitioCreateArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ConfiguracionSitios.
     * @param {ConfiguracionSitioCreateManyArgs} args - Arguments to create many ConfiguracionSitios.
     * @example
     * // Create many ConfiguracionSitios
     * const configuracionSitio = await prisma.configuracionSitio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfiguracionSitioCreateManyArgs>(args?: SelectSubset<T, ConfiguracionSitioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConfiguracionSitios and returns the data saved in the database.
     * @param {ConfiguracionSitioCreateManyAndReturnArgs} args - Arguments to create many ConfiguracionSitios.
     * @example
     * // Create many ConfiguracionSitios
     * const configuracionSitio = await prisma.configuracionSitio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConfiguracionSitios and only return the `id`
     * const configuracionSitioWithIdOnly = await prisma.configuracionSitio.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfiguracionSitioCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfiguracionSitioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ConfiguracionSitio.
     * @param {ConfiguracionSitioDeleteArgs} args - Arguments to delete one ConfiguracionSitio.
     * @example
     * // Delete one ConfiguracionSitio
     * const ConfiguracionSitio = await prisma.configuracionSitio.delete({
     *   where: {
     *     // ... filter to delete one ConfiguracionSitio
     *   }
     * })
     * 
     */
    delete<T extends ConfiguracionSitioDeleteArgs>(args: SelectSubset<T, ConfiguracionSitioDeleteArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ConfiguracionSitio.
     * @param {ConfiguracionSitioUpdateArgs} args - Arguments to update one ConfiguracionSitio.
     * @example
     * // Update one ConfiguracionSitio
     * const configuracionSitio = await prisma.configuracionSitio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfiguracionSitioUpdateArgs>(args: SelectSubset<T, ConfiguracionSitioUpdateArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ConfiguracionSitios.
     * @param {ConfiguracionSitioDeleteManyArgs} args - Arguments to filter ConfiguracionSitios to delete.
     * @example
     * // Delete a few ConfiguracionSitios
     * const { count } = await prisma.configuracionSitio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfiguracionSitioDeleteManyArgs>(args?: SelectSubset<T, ConfiguracionSitioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConfiguracionSitios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionSitioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConfiguracionSitios
     * const configuracionSitio = await prisma.configuracionSitio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfiguracionSitioUpdateManyArgs>(args: SelectSubset<T, ConfiguracionSitioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ConfiguracionSitio.
     * @param {ConfiguracionSitioUpsertArgs} args - Arguments to update or create a ConfiguracionSitio.
     * @example
     * // Update or create a ConfiguracionSitio
     * const configuracionSitio = await prisma.configuracionSitio.upsert({
     *   create: {
     *     // ... data to create a ConfiguracionSitio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConfiguracionSitio we want to update
     *   }
     * })
     */
    upsert<T extends ConfiguracionSitioUpsertArgs>(args: SelectSubset<T, ConfiguracionSitioUpsertArgs<ExtArgs>>): Prisma__ConfiguracionSitioClient<$Result.GetResult<Prisma.$ConfiguracionSitioPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ConfiguracionSitios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionSitioCountArgs} args - Arguments to filter ConfiguracionSitios to count.
     * @example
     * // Count the number of ConfiguracionSitios
     * const count = await prisma.configuracionSitio.count({
     *   where: {
     *     // ... the filter for the ConfiguracionSitios we want to count
     *   }
     * })
    **/
    count<T extends ConfiguracionSitioCountArgs>(
      args?: Subset<T, ConfiguracionSitioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfiguracionSitioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConfiguracionSitio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionSitioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfiguracionSitioAggregateArgs>(args: Subset<T, ConfiguracionSitioAggregateArgs>): Prisma.PrismaPromise<GetConfiguracionSitioAggregateType<T>>

    /**
     * Group by ConfiguracionSitio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionSitioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfiguracionSitioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfiguracionSitioGroupByArgs['orderBy'] }
        : { orderBy?: ConfiguracionSitioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfiguracionSitioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfiguracionSitioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConfiguracionSitio model
   */
  readonly fields: ConfiguracionSitioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConfiguracionSitio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfiguracionSitioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConfiguracionSitio model
   */ 
  interface ConfiguracionSitioFieldRefs {
    readonly id: FieldRef<"ConfiguracionSitio", 'String'>
    readonly clave: FieldRef<"ConfiguracionSitio", 'String'>
    readonly valor: FieldRef<"ConfiguracionSitio", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ConfiguracionSitio findUnique
   */
  export type ConfiguracionSitioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * Filter, which ConfiguracionSitio to fetch.
     */
    where: ConfiguracionSitioWhereUniqueInput
  }

  /**
   * ConfiguracionSitio findUniqueOrThrow
   */
  export type ConfiguracionSitioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * Filter, which ConfiguracionSitio to fetch.
     */
    where: ConfiguracionSitioWhereUniqueInput
  }

  /**
   * ConfiguracionSitio findFirst
   */
  export type ConfiguracionSitioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * Filter, which ConfiguracionSitio to fetch.
     */
    where?: ConfiguracionSitioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfiguracionSitios to fetch.
     */
    orderBy?: ConfiguracionSitioOrderByWithRelationInput | ConfiguracionSitioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConfiguracionSitios.
     */
    cursor?: ConfiguracionSitioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfiguracionSitios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfiguracionSitios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConfiguracionSitios.
     */
    distinct?: ConfiguracionSitioScalarFieldEnum | ConfiguracionSitioScalarFieldEnum[]
  }

  /**
   * ConfiguracionSitio findFirstOrThrow
   */
  export type ConfiguracionSitioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * Filter, which ConfiguracionSitio to fetch.
     */
    where?: ConfiguracionSitioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfiguracionSitios to fetch.
     */
    orderBy?: ConfiguracionSitioOrderByWithRelationInput | ConfiguracionSitioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConfiguracionSitios.
     */
    cursor?: ConfiguracionSitioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfiguracionSitios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfiguracionSitios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConfiguracionSitios.
     */
    distinct?: ConfiguracionSitioScalarFieldEnum | ConfiguracionSitioScalarFieldEnum[]
  }

  /**
   * ConfiguracionSitio findMany
   */
  export type ConfiguracionSitioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * Filter, which ConfiguracionSitios to fetch.
     */
    where?: ConfiguracionSitioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConfiguracionSitios to fetch.
     */
    orderBy?: ConfiguracionSitioOrderByWithRelationInput | ConfiguracionSitioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConfiguracionSitios.
     */
    cursor?: ConfiguracionSitioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConfiguracionSitios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConfiguracionSitios.
     */
    skip?: number
    distinct?: ConfiguracionSitioScalarFieldEnum | ConfiguracionSitioScalarFieldEnum[]
  }

  /**
   * ConfiguracionSitio create
   */
  export type ConfiguracionSitioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * The data needed to create a ConfiguracionSitio.
     */
    data: XOR<ConfiguracionSitioCreateInput, ConfiguracionSitioUncheckedCreateInput>
  }

  /**
   * ConfiguracionSitio createMany
   */
  export type ConfiguracionSitioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConfiguracionSitios.
     */
    data: ConfiguracionSitioCreateManyInput | ConfiguracionSitioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConfiguracionSitio createManyAndReturn
   */
  export type ConfiguracionSitioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ConfiguracionSitios.
     */
    data: ConfiguracionSitioCreateManyInput | ConfiguracionSitioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConfiguracionSitio update
   */
  export type ConfiguracionSitioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * The data needed to update a ConfiguracionSitio.
     */
    data: XOR<ConfiguracionSitioUpdateInput, ConfiguracionSitioUncheckedUpdateInput>
    /**
     * Choose, which ConfiguracionSitio to update.
     */
    where: ConfiguracionSitioWhereUniqueInput
  }

  /**
   * ConfiguracionSitio updateMany
   */
  export type ConfiguracionSitioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConfiguracionSitios.
     */
    data: XOR<ConfiguracionSitioUpdateManyMutationInput, ConfiguracionSitioUncheckedUpdateManyInput>
    /**
     * Filter which ConfiguracionSitios to update
     */
    where?: ConfiguracionSitioWhereInput
  }

  /**
   * ConfiguracionSitio upsert
   */
  export type ConfiguracionSitioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * The filter to search for the ConfiguracionSitio to update in case it exists.
     */
    where: ConfiguracionSitioWhereUniqueInput
    /**
     * In case the ConfiguracionSitio found by the `where` argument doesn't exist, create a new ConfiguracionSitio with this data.
     */
    create: XOR<ConfiguracionSitioCreateInput, ConfiguracionSitioUncheckedCreateInput>
    /**
     * In case the ConfiguracionSitio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfiguracionSitioUpdateInput, ConfiguracionSitioUncheckedUpdateInput>
  }

  /**
   * ConfiguracionSitio delete
   */
  export type ConfiguracionSitioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
    /**
     * Filter which ConfiguracionSitio to delete.
     */
    where: ConfiguracionSitioWhereUniqueInput
  }

  /**
   * ConfiguracionSitio deleteMany
   */
  export type ConfiguracionSitioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConfiguracionSitios to delete
     */
    where?: ConfiguracionSitioWhereInput
  }

  /**
   * ConfiguracionSitio without action
   */
  export type ConfiguracionSitioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConfiguracionSitio
     */
    select?: ConfiguracionSitioSelect<ExtArgs> | null
  }


  /**
   * Model BillingClient
   */

  export type AggregateBillingClient = {
    _count: BillingClientCountAggregateOutputType | null
    _avg: BillingClientAvgAggregateOutputType | null
    _sum: BillingClientSumAggregateOutputType | null
    _min: BillingClientMinAggregateOutputType | null
    _max: BillingClientMaxAggregateOutputType | null
  }

  export type BillingClientAvgAggregateOutputType = {
    valorMensual: number | null
  }

  export type BillingClientSumAggregateOutputType = {
    valorMensual: number | null
  }

  export type BillingClientMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    industria: string | null
    cuit: string | null
    direccion: string | null
    datosPago: string | null
    valorMensual: number | null
    moneda: string | null
    inicioContrato: Date | null
    renovacionContrato: Date | null
    estado: string | null
    notas: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillingClientMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    email: string | null
    telefono: string | null
    industria: string | null
    cuit: string | null
    direccion: string | null
    datosPago: string | null
    valorMensual: number | null
    moneda: string | null
    inicioContrato: Date | null
    renovacionContrato: Date | null
    estado: string | null
    notas: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BillingClientCountAggregateOutputType = {
    id: number
    nombre: number
    email: number
    telefono: number
    industria: number
    cuit: number
    direccion: number
    datosPago: number
    valorMensual: number
    moneda: number
    inicioContrato: number
    renovacionContrato: number
    estado: number
    notas: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BillingClientAvgAggregateInputType = {
    valorMensual?: true
  }

  export type BillingClientSumAggregateInputType = {
    valorMensual?: true
  }

  export type BillingClientMinAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    telefono?: true
    industria?: true
    cuit?: true
    direccion?: true
    datosPago?: true
    valorMensual?: true
    moneda?: true
    inicioContrato?: true
    renovacionContrato?: true
    estado?: true
    notas?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillingClientMaxAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    telefono?: true
    industria?: true
    cuit?: true
    direccion?: true
    datosPago?: true
    valorMensual?: true
    moneda?: true
    inicioContrato?: true
    renovacionContrato?: true
    estado?: true
    notas?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BillingClientCountAggregateInputType = {
    id?: true
    nombre?: true
    email?: true
    telefono?: true
    industria?: true
    cuit?: true
    direccion?: true
    datosPago?: true
    valorMensual?: true
    moneda?: true
    inicioContrato?: true
    renovacionContrato?: true
    estado?: true
    notas?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BillingClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillingClient to aggregate.
     */
    where?: BillingClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingClients to fetch.
     */
    orderBy?: BillingClientOrderByWithRelationInput | BillingClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillingClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BillingClients
    **/
    _count?: true | BillingClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillingClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillingClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillingClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillingClientMaxAggregateInputType
  }

  export type GetBillingClientAggregateType<T extends BillingClientAggregateArgs> = {
        [P in keyof T & keyof AggregateBillingClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBillingClient[P]>
      : GetScalarType<T[P], AggregateBillingClient[P]>
  }




  export type BillingClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillingClientWhereInput
    orderBy?: BillingClientOrderByWithAggregationInput | BillingClientOrderByWithAggregationInput[]
    by: BillingClientScalarFieldEnum[] | BillingClientScalarFieldEnum
    having?: BillingClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillingClientCountAggregateInputType | true
    _avg?: BillingClientAvgAggregateInputType
    _sum?: BillingClientSumAggregateInputType
    _min?: BillingClientMinAggregateInputType
    _max?: BillingClientMaxAggregateInputType
  }

  export type BillingClientGroupByOutputType = {
    id: string
    nombre: string
    email: string | null
    telefono: string | null
    industria: string | null
    cuit: string | null
    direccion: string | null
    datosPago: string | null
    valorMensual: number
    moneda: string
    inicioContrato: Date | null
    renovacionContrato: Date | null
    estado: string
    notas: string | null
    createdAt: Date
    updatedAt: Date
    _count: BillingClientCountAggregateOutputType | null
    _avg: BillingClientAvgAggregateOutputType | null
    _sum: BillingClientSumAggregateOutputType | null
    _min: BillingClientMinAggregateOutputType | null
    _max: BillingClientMaxAggregateOutputType | null
  }

  type GetBillingClientGroupByPayload<T extends BillingClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillingClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillingClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillingClientGroupByOutputType[P]>
            : GetScalarType<T[P], BillingClientGroupByOutputType[P]>
        }
      >
    >


  export type BillingClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    industria?: boolean
    cuit?: boolean
    direccion?: boolean
    datosPago?: boolean
    valorMensual?: boolean
    moneda?: boolean
    inicioContrato?: boolean
    renovacionContrato?: boolean
    estado?: boolean
    notas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    facturas?: boolean | BillingClient$facturasArgs<ExtArgs>
    _count?: boolean | BillingClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["billingClient"]>

  export type BillingClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    industria?: boolean
    cuit?: boolean
    direccion?: boolean
    datosPago?: boolean
    valorMensual?: boolean
    moneda?: boolean
    inicioContrato?: boolean
    renovacionContrato?: boolean
    estado?: boolean
    notas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["billingClient"]>

  export type BillingClientSelectScalar = {
    id?: boolean
    nombre?: boolean
    email?: boolean
    telefono?: boolean
    industria?: boolean
    cuit?: boolean
    direccion?: boolean
    datosPago?: boolean
    valorMensual?: boolean
    moneda?: boolean
    inicioContrato?: boolean
    renovacionContrato?: boolean
    estado?: boolean
    notas?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BillingClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    facturas?: boolean | BillingClient$facturasArgs<ExtArgs>
    _count?: boolean | BillingClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BillingClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BillingClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BillingClient"
    objects: {
      facturas: Prisma.$InvoicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      email: string | null
      telefono: string | null
      industria: string | null
      cuit: string | null
      direccion: string | null
      datosPago: string | null
      valorMensual: number
      moneda: string
      inicioContrato: Date | null
      renovacionContrato: Date | null
      estado: string
      notas: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["billingClient"]>
    composites: {}
  }

  type BillingClientGetPayload<S extends boolean | null | undefined | BillingClientDefaultArgs> = $Result.GetResult<Prisma.$BillingClientPayload, S>

  type BillingClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BillingClientFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BillingClientCountAggregateInputType | true
    }

  export interface BillingClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BillingClient'], meta: { name: 'BillingClient' } }
    /**
     * Find zero or one BillingClient that matches the filter.
     * @param {BillingClientFindUniqueArgs} args - Arguments to find a BillingClient
     * @example
     * // Get one BillingClient
     * const billingClient = await prisma.billingClient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillingClientFindUniqueArgs>(args: SelectSubset<T, BillingClientFindUniqueArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BillingClient that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BillingClientFindUniqueOrThrowArgs} args - Arguments to find a BillingClient
     * @example
     * // Get one BillingClient
     * const billingClient = await prisma.billingClient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillingClientFindUniqueOrThrowArgs>(args: SelectSubset<T, BillingClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BillingClient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingClientFindFirstArgs} args - Arguments to find a BillingClient
     * @example
     * // Get one BillingClient
     * const billingClient = await prisma.billingClient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillingClientFindFirstArgs>(args?: SelectSubset<T, BillingClientFindFirstArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BillingClient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingClientFindFirstOrThrowArgs} args - Arguments to find a BillingClient
     * @example
     * // Get one BillingClient
     * const billingClient = await prisma.billingClient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillingClientFindFirstOrThrowArgs>(args?: SelectSubset<T, BillingClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BillingClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BillingClients
     * const billingClients = await prisma.billingClient.findMany()
     * 
     * // Get first 10 BillingClients
     * const billingClients = await prisma.billingClient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billingClientWithIdOnly = await prisma.billingClient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillingClientFindManyArgs>(args?: SelectSubset<T, BillingClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BillingClient.
     * @param {BillingClientCreateArgs} args - Arguments to create a BillingClient.
     * @example
     * // Create one BillingClient
     * const BillingClient = await prisma.billingClient.create({
     *   data: {
     *     // ... data to create a BillingClient
     *   }
     * })
     * 
     */
    create<T extends BillingClientCreateArgs>(args: SelectSubset<T, BillingClientCreateArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BillingClients.
     * @param {BillingClientCreateManyArgs} args - Arguments to create many BillingClients.
     * @example
     * // Create many BillingClients
     * const billingClient = await prisma.billingClient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillingClientCreateManyArgs>(args?: SelectSubset<T, BillingClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BillingClients and returns the data saved in the database.
     * @param {BillingClientCreateManyAndReturnArgs} args - Arguments to create many BillingClients.
     * @example
     * // Create many BillingClients
     * const billingClient = await prisma.billingClient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BillingClients and only return the `id`
     * const billingClientWithIdOnly = await prisma.billingClient.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillingClientCreateManyAndReturnArgs>(args?: SelectSubset<T, BillingClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BillingClient.
     * @param {BillingClientDeleteArgs} args - Arguments to delete one BillingClient.
     * @example
     * // Delete one BillingClient
     * const BillingClient = await prisma.billingClient.delete({
     *   where: {
     *     // ... filter to delete one BillingClient
     *   }
     * })
     * 
     */
    delete<T extends BillingClientDeleteArgs>(args: SelectSubset<T, BillingClientDeleteArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BillingClient.
     * @param {BillingClientUpdateArgs} args - Arguments to update one BillingClient.
     * @example
     * // Update one BillingClient
     * const billingClient = await prisma.billingClient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillingClientUpdateArgs>(args: SelectSubset<T, BillingClientUpdateArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BillingClients.
     * @param {BillingClientDeleteManyArgs} args - Arguments to filter BillingClients to delete.
     * @example
     * // Delete a few BillingClients
     * const { count } = await prisma.billingClient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillingClientDeleteManyArgs>(args?: SelectSubset<T, BillingClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillingClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BillingClients
     * const billingClient = await prisma.billingClient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillingClientUpdateManyArgs>(args: SelectSubset<T, BillingClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BillingClient.
     * @param {BillingClientUpsertArgs} args - Arguments to update or create a BillingClient.
     * @example
     * // Update or create a BillingClient
     * const billingClient = await prisma.billingClient.upsert({
     *   create: {
     *     // ... data to create a BillingClient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BillingClient we want to update
     *   }
     * })
     */
    upsert<T extends BillingClientUpsertArgs>(args: SelectSubset<T, BillingClientUpsertArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BillingClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingClientCountArgs} args - Arguments to filter BillingClients to count.
     * @example
     * // Count the number of BillingClients
     * const count = await prisma.billingClient.count({
     *   where: {
     *     // ... the filter for the BillingClients we want to count
     *   }
     * })
    **/
    count<T extends BillingClientCountArgs>(
      args?: Subset<T, BillingClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillingClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BillingClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BillingClientAggregateArgs>(args: Subset<T, BillingClientAggregateArgs>): Prisma.PrismaPromise<GetBillingClientAggregateType<T>>

    /**
     * Group by BillingClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BillingClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillingClientGroupByArgs['orderBy'] }
        : { orderBy?: BillingClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BillingClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillingClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BillingClient model
   */
  readonly fields: BillingClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BillingClient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillingClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    facturas<T extends BillingClient$facturasArgs<ExtArgs> = {}>(args?: Subset<T, BillingClient$facturasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BillingClient model
   */ 
  interface BillingClientFieldRefs {
    readonly id: FieldRef<"BillingClient", 'String'>
    readonly nombre: FieldRef<"BillingClient", 'String'>
    readonly email: FieldRef<"BillingClient", 'String'>
    readonly telefono: FieldRef<"BillingClient", 'String'>
    readonly industria: FieldRef<"BillingClient", 'String'>
    readonly cuit: FieldRef<"BillingClient", 'String'>
    readonly direccion: FieldRef<"BillingClient", 'String'>
    readonly datosPago: FieldRef<"BillingClient", 'String'>
    readonly valorMensual: FieldRef<"BillingClient", 'Int'>
    readonly moneda: FieldRef<"BillingClient", 'String'>
    readonly inicioContrato: FieldRef<"BillingClient", 'DateTime'>
    readonly renovacionContrato: FieldRef<"BillingClient", 'DateTime'>
    readonly estado: FieldRef<"BillingClient", 'String'>
    readonly notas: FieldRef<"BillingClient", 'String'>
    readonly createdAt: FieldRef<"BillingClient", 'DateTime'>
    readonly updatedAt: FieldRef<"BillingClient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BillingClient findUnique
   */
  export type BillingClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * Filter, which BillingClient to fetch.
     */
    where: BillingClientWhereUniqueInput
  }

  /**
   * BillingClient findUniqueOrThrow
   */
  export type BillingClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * Filter, which BillingClient to fetch.
     */
    where: BillingClientWhereUniqueInput
  }

  /**
   * BillingClient findFirst
   */
  export type BillingClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * Filter, which BillingClient to fetch.
     */
    where?: BillingClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingClients to fetch.
     */
    orderBy?: BillingClientOrderByWithRelationInput | BillingClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillingClients.
     */
    cursor?: BillingClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillingClients.
     */
    distinct?: BillingClientScalarFieldEnum | BillingClientScalarFieldEnum[]
  }

  /**
   * BillingClient findFirstOrThrow
   */
  export type BillingClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * Filter, which BillingClient to fetch.
     */
    where?: BillingClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingClients to fetch.
     */
    orderBy?: BillingClientOrderByWithRelationInput | BillingClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillingClients.
     */
    cursor?: BillingClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillingClients.
     */
    distinct?: BillingClientScalarFieldEnum | BillingClientScalarFieldEnum[]
  }

  /**
   * BillingClient findMany
   */
  export type BillingClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * Filter, which BillingClients to fetch.
     */
    where?: BillingClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillingClients to fetch.
     */
    orderBy?: BillingClientOrderByWithRelationInput | BillingClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BillingClients.
     */
    cursor?: BillingClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillingClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillingClients.
     */
    skip?: number
    distinct?: BillingClientScalarFieldEnum | BillingClientScalarFieldEnum[]
  }

  /**
   * BillingClient create
   */
  export type BillingClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * The data needed to create a BillingClient.
     */
    data: XOR<BillingClientCreateInput, BillingClientUncheckedCreateInput>
  }

  /**
   * BillingClient createMany
   */
  export type BillingClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BillingClients.
     */
    data: BillingClientCreateManyInput | BillingClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BillingClient createManyAndReturn
   */
  export type BillingClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BillingClients.
     */
    data: BillingClientCreateManyInput | BillingClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BillingClient update
   */
  export type BillingClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * The data needed to update a BillingClient.
     */
    data: XOR<BillingClientUpdateInput, BillingClientUncheckedUpdateInput>
    /**
     * Choose, which BillingClient to update.
     */
    where: BillingClientWhereUniqueInput
  }

  /**
   * BillingClient updateMany
   */
  export type BillingClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BillingClients.
     */
    data: XOR<BillingClientUpdateManyMutationInput, BillingClientUncheckedUpdateManyInput>
    /**
     * Filter which BillingClients to update
     */
    where?: BillingClientWhereInput
  }

  /**
   * BillingClient upsert
   */
  export type BillingClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * The filter to search for the BillingClient to update in case it exists.
     */
    where: BillingClientWhereUniqueInput
    /**
     * In case the BillingClient found by the `where` argument doesn't exist, create a new BillingClient with this data.
     */
    create: XOR<BillingClientCreateInput, BillingClientUncheckedCreateInput>
    /**
     * In case the BillingClient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillingClientUpdateInput, BillingClientUncheckedUpdateInput>
  }

  /**
   * BillingClient delete
   */
  export type BillingClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
    /**
     * Filter which BillingClient to delete.
     */
    where: BillingClientWhereUniqueInput
  }

  /**
   * BillingClient deleteMany
   */
  export type BillingClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillingClients to delete
     */
    where?: BillingClientWhereInput
  }

  /**
   * BillingClient.facturas
   */
  export type BillingClient$facturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * BillingClient without action
   */
  export type BillingClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillingClient
     */
    select?: BillingClientSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingClientInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    subtotal: number | null
    tasaIva: number | null
    montoIva: number | null
    descuento: number | null
    total: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    subtotal: number | null
    tasaIva: number | null
    montoIva: number | null
    descuento: number | null
    total: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: string | null
    numero: string | null
    clienteId: string | null
    descripcion: string | null
    items: string | null
    subtotal: number | null
    tasaIva: number | null
    montoIva: number | null
    descuento: number | null
    total: number | null
    moneda: string | null
    estado: string | null
    emitidaEn: Date | null
    venceEn: Date | null
    pagadaEn: Date | null
    notas: string | null
    datosPago: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    clienteId: string | null
    descripcion: string | null
    items: string | null
    subtotal: number | null
    tasaIva: number | null
    montoIva: number | null
    descuento: number | null
    total: number | null
    moneda: string | null
    estado: string | null
    emitidaEn: Date | null
    venceEn: Date | null
    pagadaEn: Date | null
    notas: string | null
    datosPago: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    numero: number
    clienteId: number
    descripcion: number
    items: number
    subtotal: number
    tasaIva: number
    montoIva: number
    descuento: number
    total: number
    moneda: number
    estado: number
    emitidaEn: number
    venceEn: number
    pagadaEn: number
    notas: number
    datosPago: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    subtotal?: true
    tasaIva?: true
    montoIva?: true
    descuento?: true
    total?: true
  }

  export type InvoiceSumAggregateInputType = {
    subtotal?: true
    tasaIva?: true
    montoIva?: true
    descuento?: true
    total?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    numero?: true
    clienteId?: true
    descripcion?: true
    items?: true
    subtotal?: true
    tasaIva?: true
    montoIva?: true
    descuento?: true
    total?: true
    moneda?: true
    estado?: true
    emitidaEn?: true
    venceEn?: true
    pagadaEn?: true
    notas?: true
    datosPago?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    numero?: true
    clienteId?: true
    descripcion?: true
    items?: true
    subtotal?: true
    tasaIva?: true
    montoIva?: true
    descuento?: true
    total?: true
    moneda?: true
    estado?: true
    emitidaEn?: true
    venceEn?: true
    pagadaEn?: true
    notas?: true
    datosPago?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    numero?: true
    clienteId?: true
    descripcion?: true
    items?: true
    subtotal?: true
    tasaIva?: true
    montoIva?: true
    descuento?: true
    total?: true
    moneda?: true
    estado?: true
    emitidaEn?: true
    venceEn?: true
    pagadaEn?: true
    notas?: true
    datosPago?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: string
    numero: string
    clienteId: string
    descripcion: string | null
    items: string | null
    subtotal: number
    tasaIva: number
    montoIva: number
    descuento: number
    total: number
    moneda: string
    estado: string
    emitidaEn: Date
    venceEn: Date
    pagadaEn: Date | null
    notas: string | null
    datosPago: string | null
    createdAt: Date
    updatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    clienteId?: boolean
    descripcion?: boolean
    items?: boolean
    subtotal?: boolean
    tasaIva?: boolean
    montoIva?: boolean
    descuento?: boolean
    total?: boolean
    moneda?: boolean
    estado?: boolean
    emitidaEn?: boolean
    venceEn?: boolean
    pagadaEn?: boolean
    notas?: boolean
    datosPago?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | BillingClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    clienteId?: boolean
    descripcion?: boolean
    items?: boolean
    subtotal?: boolean
    tasaIva?: boolean
    montoIva?: boolean
    descuento?: boolean
    total?: boolean
    moneda?: boolean
    estado?: boolean
    emitidaEn?: boolean
    venceEn?: boolean
    pagadaEn?: boolean
    notas?: boolean
    datosPago?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | BillingClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    numero?: boolean
    clienteId?: boolean
    descripcion?: boolean
    items?: boolean
    subtotal?: boolean
    tasaIva?: boolean
    montoIva?: boolean
    descuento?: boolean
    total?: boolean
    moneda?: boolean
    estado?: boolean
    emitidaEn?: boolean
    venceEn?: boolean
    pagadaEn?: boolean
    notas?: boolean
    datosPago?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | BillingClientDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | BillingClientDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      cliente: Prisma.$BillingClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      clienteId: string
      descripcion: string | null
      items: string | null
      subtotal: number
      tasaIva: number
      montoIva: number
      descuento: number
      total: number
      moneda: string
      estado: string
      emitidaEn: Date
      venceEn: Date
      pagadaEn: Date | null
      notas: string | null
      datosPago: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends BillingClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BillingClientDefaultArgs<ExtArgs>>): Prisma__BillingClientClient<$Result.GetResult<Prisma.$BillingClientPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */ 
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'String'>
    readonly numero: FieldRef<"Invoice", 'String'>
    readonly clienteId: FieldRef<"Invoice", 'String'>
    readonly descripcion: FieldRef<"Invoice", 'String'>
    readonly items: FieldRef<"Invoice", 'String'>
    readonly subtotal: FieldRef<"Invoice", 'Int'>
    readonly tasaIva: FieldRef<"Invoice", 'Int'>
    readonly montoIva: FieldRef<"Invoice", 'Int'>
    readonly descuento: FieldRef<"Invoice", 'Int'>
    readonly total: FieldRef<"Invoice", 'Int'>
    readonly moneda: FieldRef<"Invoice", 'String'>
    readonly estado: FieldRef<"Invoice", 'String'>
    readonly emitidaEn: FieldRef<"Invoice", 'DateTime'>
    readonly venceEn: FieldRef<"Invoice", 'DateTime'>
    readonly pagadaEn: FieldRef<"Invoice", 'DateTime'>
    readonly notas: FieldRef<"Invoice", 'String'>
    readonly datosPago: FieldRef<"Invoice", 'String'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const BlogPostScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    slug: 'slug',
    categoria: 'categoria',
    extracto: 'extracto',
    contenido: 'contenido',
    imagenUrl: 'imagenUrl',
    publicado: 'publicado',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum]


  export const TallerScalarFieldEnum: {
    id: 'id',
    titulo: 'titulo',
    nivel: 'nivel',
    modalidad: 'modalidad',
    descripcion: 'descripcion',
    precio: 'precio',
    fecha: 'fecha',
    cupoMaximo: 'cupoMaximo',
    activo: 'activo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TallerScalarFieldEnum = (typeof TallerScalarFieldEnum)[keyof typeof TallerScalarFieldEnum]


  export const InscripcionScalarFieldEnum: {
    id: 'id',
    tallerId: 'tallerId',
    nombre: 'nombre',
    email: 'email',
    telefono: 'telefono',
    estado: 'estado',
    createdAt: 'createdAt'
  };

  export type InscripcionScalarFieldEnum = (typeof InscripcionScalarFieldEnum)[keyof typeof InscripcionScalarFieldEnum]


  export const ConfiguracionSitioScalarFieldEnum: {
    id: 'id',
    clave: 'clave',
    valor: 'valor'
  };

  export type ConfiguracionSitioScalarFieldEnum = (typeof ConfiguracionSitioScalarFieldEnum)[keyof typeof ConfiguracionSitioScalarFieldEnum]


  export const BillingClientScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    email: 'email',
    telefono: 'telefono',
    industria: 'industria',
    cuit: 'cuit',
    direccion: 'direccion',
    datosPago: 'datosPago',
    valorMensual: 'valorMensual',
    moneda: 'moneda',
    inicioContrato: 'inicioContrato',
    renovacionContrato: 'renovacionContrato',
    estado: 'estado',
    notas: 'notas',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BillingClientScalarFieldEnum = (typeof BillingClientScalarFieldEnum)[keyof typeof BillingClientScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    numero: 'numero',
    clienteId: 'clienteId',
    descripcion: 'descripcion',
    items: 'items',
    subtotal: 'subtotal',
    tasaIva: 'tasaIva',
    montoIva: 'montoIva',
    descuento: 'descuento',
    total: 'total',
    moneda: 'moneda',
    estado: 'estado',
    emitidaEn: 'emitidaEn',
    venceEn: 'venceEn',
    pagadaEn: 'pagadaEn',
    notas: 'notas',
    datosPago: 'datosPago',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    userId?: StringNullableFilter<"Customer"> | string | null
    fullName?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    userId?: StringNullableFilter<"Customer"> | string | null
    fullName?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    phone?: StringNullableFilter<"Customer"> | string | null
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    updatedAt?: DateTimeFilter<"Customer"> | Date | string
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    userId?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    fullName?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type BlogPostWhereInput = {
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    id?: StringFilter<"BlogPost"> | string
    titulo?: StringFilter<"BlogPost"> | string
    slug?: StringFilter<"BlogPost"> | string
    categoria?: StringNullableFilter<"BlogPost"> | string | null
    extracto?: StringNullableFilter<"BlogPost"> | string | null
    contenido?: StringFilter<"BlogPost"> | string
    imagenUrl?: StringNullableFilter<"BlogPost"> | string | null
    publicado?: BoolFilter<"BlogPost"> | boolean
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
  }

  export type BlogPostOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    slug?: SortOrder
    categoria?: SortOrderInput | SortOrder
    extracto?: SortOrderInput | SortOrder
    contenido?: SortOrder
    imagenUrl?: SortOrderInput | SortOrder
    publicado?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    titulo?: StringFilter<"BlogPost"> | string
    categoria?: StringNullableFilter<"BlogPost"> | string | null
    extracto?: StringNullableFilter<"BlogPost"> | string | null
    contenido?: StringFilter<"BlogPost"> | string
    imagenUrl?: StringNullableFilter<"BlogPost"> | string | null
    publicado?: BoolFilter<"BlogPost"> | boolean
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
  }, "id" | "slug">

  export type BlogPostOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    slug?: SortOrder
    categoria?: SortOrderInput | SortOrder
    extracto?: SortOrderInput | SortOrder
    contenido?: SortOrder
    imagenUrl?: SortOrderInput | SortOrder
    publicado?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogPostCountOrderByAggregateInput
    _max?: BlogPostMaxOrderByAggregateInput
    _min?: BlogPostMinOrderByAggregateInput
  }

  export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    OR?: BlogPostScalarWhereWithAggregatesInput[]
    NOT?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BlogPost"> | string
    titulo?: StringWithAggregatesFilter<"BlogPost"> | string
    slug?: StringWithAggregatesFilter<"BlogPost"> | string
    categoria?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    extracto?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    contenido?: StringWithAggregatesFilter<"BlogPost"> | string
    imagenUrl?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    publicado?: BoolWithAggregatesFilter<"BlogPost"> | boolean
    publishedAt?: DateTimeNullableWithAggregatesFilter<"BlogPost"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
  }

  export type TallerWhereInput = {
    AND?: TallerWhereInput | TallerWhereInput[]
    OR?: TallerWhereInput[]
    NOT?: TallerWhereInput | TallerWhereInput[]
    id?: StringFilter<"Taller"> | string
    titulo?: StringFilter<"Taller"> | string
    nivel?: StringNullableFilter<"Taller"> | string | null
    modalidad?: StringNullableFilter<"Taller"> | string | null
    descripcion?: StringNullableFilter<"Taller"> | string | null
    precio?: IntNullableFilter<"Taller"> | number | null
    fecha?: DateTimeNullableFilter<"Taller"> | Date | string | null
    cupoMaximo?: IntNullableFilter<"Taller"> | number | null
    activo?: BoolFilter<"Taller"> | boolean
    createdAt?: DateTimeFilter<"Taller"> | Date | string
    updatedAt?: DateTimeFilter<"Taller"> | Date | string
    inscripciones?: InscripcionListRelationFilter
  }

  export type TallerOrderByWithRelationInput = {
    id?: SortOrder
    titulo?: SortOrder
    nivel?: SortOrderInput | SortOrder
    modalidad?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    precio?: SortOrderInput | SortOrder
    fecha?: SortOrderInput | SortOrder
    cupoMaximo?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    inscripciones?: InscripcionOrderByRelationAggregateInput
  }

  export type TallerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TallerWhereInput | TallerWhereInput[]
    OR?: TallerWhereInput[]
    NOT?: TallerWhereInput | TallerWhereInput[]
    titulo?: StringFilter<"Taller"> | string
    nivel?: StringNullableFilter<"Taller"> | string | null
    modalidad?: StringNullableFilter<"Taller"> | string | null
    descripcion?: StringNullableFilter<"Taller"> | string | null
    precio?: IntNullableFilter<"Taller"> | number | null
    fecha?: DateTimeNullableFilter<"Taller"> | Date | string | null
    cupoMaximo?: IntNullableFilter<"Taller"> | number | null
    activo?: BoolFilter<"Taller"> | boolean
    createdAt?: DateTimeFilter<"Taller"> | Date | string
    updatedAt?: DateTimeFilter<"Taller"> | Date | string
    inscripciones?: InscripcionListRelationFilter
  }, "id">

  export type TallerOrderByWithAggregationInput = {
    id?: SortOrder
    titulo?: SortOrder
    nivel?: SortOrderInput | SortOrder
    modalidad?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    precio?: SortOrderInput | SortOrder
    fecha?: SortOrderInput | SortOrder
    cupoMaximo?: SortOrderInput | SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TallerCountOrderByAggregateInput
    _avg?: TallerAvgOrderByAggregateInput
    _max?: TallerMaxOrderByAggregateInput
    _min?: TallerMinOrderByAggregateInput
    _sum?: TallerSumOrderByAggregateInput
  }

  export type TallerScalarWhereWithAggregatesInput = {
    AND?: TallerScalarWhereWithAggregatesInput | TallerScalarWhereWithAggregatesInput[]
    OR?: TallerScalarWhereWithAggregatesInput[]
    NOT?: TallerScalarWhereWithAggregatesInput | TallerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Taller"> | string
    titulo?: StringWithAggregatesFilter<"Taller"> | string
    nivel?: StringNullableWithAggregatesFilter<"Taller"> | string | null
    modalidad?: StringNullableWithAggregatesFilter<"Taller"> | string | null
    descripcion?: StringNullableWithAggregatesFilter<"Taller"> | string | null
    precio?: IntNullableWithAggregatesFilter<"Taller"> | number | null
    fecha?: DateTimeNullableWithAggregatesFilter<"Taller"> | Date | string | null
    cupoMaximo?: IntNullableWithAggregatesFilter<"Taller"> | number | null
    activo?: BoolWithAggregatesFilter<"Taller"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Taller"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Taller"> | Date | string
  }

  export type InscripcionWhereInput = {
    AND?: InscripcionWhereInput | InscripcionWhereInput[]
    OR?: InscripcionWhereInput[]
    NOT?: InscripcionWhereInput | InscripcionWhereInput[]
    id?: StringFilter<"Inscripcion"> | string
    tallerId?: StringFilter<"Inscripcion"> | string
    nombre?: StringFilter<"Inscripcion"> | string
    email?: StringFilter<"Inscripcion"> | string
    telefono?: StringNullableFilter<"Inscripcion"> | string | null
    estado?: StringFilter<"Inscripcion"> | string
    createdAt?: DateTimeFilter<"Inscripcion"> | Date | string
    taller?: XOR<TallerRelationFilter, TallerWhereInput>
  }

  export type InscripcionOrderByWithRelationInput = {
    id?: SortOrder
    tallerId?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrderInput | SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    taller?: TallerOrderByWithRelationInput
  }

  export type InscripcionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InscripcionWhereInput | InscripcionWhereInput[]
    OR?: InscripcionWhereInput[]
    NOT?: InscripcionWhereInput | InscripcionWhereInput[]
    tallerId?: StringFilter<"Inscripcion"> | string
    nombre?: StringFilter<"Inscripcion"> | string
    email?: StringFilter<"Inscripcion"> | string
    telefono?: StringNullableFilter<"Inscripcion"> | string | null
    estado?: StringFilter<"Inscripcion"> | string
    createdAt?: DateTimeFilter<"Inscripcion"> | Date | string
    taller?: XOR<TallerRelationFilter, TallerWhereInput>
  }, "id">

  export type InscripcionOrderByWithAggregationInput = {
    id?: SortOrder
    tallerId?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrderInput | SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
    _count?: InscripcionCountOrderByAggregateInput
    _max?: InscripcionMaxOrderByAggregateInput
    _min?: InscripcionMinOrderByAggregateInput
  }

  export type InscripcionScalarWhereWithAggregatesInput = {
    AND?: InscripcionScalarWhereWithAggregatesInput | InscripcionScalarWhereWithAggregatesInput[]
    OR?: InscripcionScalarWhereWithAggregatesInput[]
    NOT?: InscripcionScalarWhereWithAggregatesInput | InscripcionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Inscripcion"> | string
    tallerId?: StringWithAggregatesFilter<"Inscripcion"> | string
    nombre?: StringWithAggregatesFilter<"Inscripcion"> | string
    email?: StringWithAggregatesFilter<"Inscripcion"> | string
    telefono?: StringNullableWithAggregatesFilter<"Inscripcion"> | string | null
    estado?: StringWithAggregatesFilter<"Inscripcion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Inscripcion"> | Date | string
  }

  export type ConfiguracionSitioWhereInput = {
    AND?: ConfiguracionSitioWhereInput | ConfiguracionSitioWhereInput[]
    OR?: ConfiguracionSitioWhereInput[]
    NOT?: ConfiguracionSitioWhereInput | ConfiguracionSitioWhereInput[]
    id?: StringFilter<"ConfiguracionSitio"> | string
    clave?: StringFilter<"ConfiguracionSitio"> | string
    valor?: StringFilter<"ConfiguracionSitio"> | string
  }

  export type ConfiguracionSitioOrderByWithRelationInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type ConfiguracionSitioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clave?: string
    AND?: ConfiguracionSitioWhereInput | ConfiguracionSitioWhereInput[]
    OR?: ConfiguracionSitioWhereInput[]
    NOT?: ConfiguracionSitioWhereInput | ConfiguracionSitioWhereInput[]
    valor?: StringFilter<"ConfiguracionSitio"> | string
  }, "id" | "clave">

  export type ConfiguracionSitioOrderByWithAggregationInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
    _count?: ConfiguracionSitioCountOrderByAggregateInput
    _max?: ConfiguracionSitioMaxOrderByAggregateInput
    _min?: ConfiguracionSitioMinOrderByAggregateInput
  }

  export type ConfiguracionSitioScalarWhereWithAggregatesInput = {
    AND?: ConfiguracionSitioScalarWhereWithAggregatesInput | ConfiguracionSitioScalarWhereWithAggregatesInput[]
    OR?: ConfiguracionSitioScalarWhereWithAggregatesInput[]
    NOT?: ConfiguracionSitioScalarWhereWithAggregatesInput | ConfiguracionSitioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ConfiguracionSitio"> | string
    clave?: StringWithAggregatesFilter<"ConfiguracionSitio"> | string
    valor?: StringWithAggregatesFilter<"ConfiguracionSitio"> | string
  }

  export type BillingClientWhereInput = {
    AND?: BillingClientWhereInput | BillingClientWhereInput[]
    OR?: BillingClientWhereInput[]
    NOT?: BillingClientWhereInput | BillingClientWhereInput[]
    id?: StringFilter<"BillingClient"> | string
    nombre?: StringFilter<"BillingClient"> | string
    email?: StringNullableFilter<"BillingClient"> | string | null
    telefono?: StringNullableFilter<"BillingClient"> | string | null
    industria?: StringNullableFilter<"BillingClient"> | string | null
    cuit?: StringNullableFilter<"BillingClient"> | string | null
    direccion?: StringNullableFilter<"BillingClient"> | string | null
    datosPago?: StringNullableFilter<"BillingClient"> | string | null
    valorMensual?: IntFilter<"BillingClient"> | number
    moneda?: StringFilter<"BillingClient"> | string
    inicioContrato?: DateTimeNullableFilter<"BillingClient"> | Date | string | null
    renovacionContrato?: DateTimeNullableFilter<"BillingClient"> | Date | string | null
    estado?: StringFilter<"BillingClient"> | string
    notas?: StringNullableFilter<"BillingClient"> | string | null
    createdAt?: DateTimeFilter<"BillingClient"> | Date | string
    updatedAt?: DateTimeFilter<"BillingClient"> | Date | string
    facturas?: InvoiceListRelationFilter
  }

  export type BillingClientOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    industria?: SortOrderInput | SortOrder
    cuit?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    datosPago?: SortOrderInput | SortOrder
    valorMensual?: SortOrder
    moneda?: SortOrder
    inicioContrato?: SortOrderInput | SortOrder
    renovacionContrato?: SortOrderInput | SortOrder
    estado?: SortOrder
    notas?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    facturas?: InvoiceOrderByRelationAggregateInput
  }

  export type BillingClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BillingClientWhereInput | BillingClientWhereInput[]
    OR?: BillingClientWhereInput[]
    NOT?: BillingClientWhereInput | BillingClientWhereInput[]
    nombre?: StringFilter<"BillingClient"> | string
    email?: StringNullableFilter<"BillingClient"> | string | null
    telefono?: StringNullableFilter<"BillingClient"> | string | null
    industria?: StringNullableFilter<"BillingClient"> | string | null
    cuit?: StringNullableFilter<"BillingClient"> | string | null
    direccion?: StringNullableFilter<"BillingClient"> | string | null
    datosPago?: StringNullableFilter<"BillingClient"> | string | null
    valorMensual?: IntFilter<"BillingClient"> | number
    moneda?: StringFilter<"BillingClient"> | string
    inicioContrato?: DateTimeNullableFilter<"BillingClient"> | Date | string | null
    renovacionContrato?: DateTimeNullableFilter<"BillingClient"> | Date | string | null
    estado?: StringFilter<"BillingClient"> | string
    notas?: StringNullableFilter<"BillingClient"> | string | null
    createdAt?: DateTimeFilter<"BillingClient"> | Date | string
    updatedAt?: DateTimeFilter<"BillingClient"> | Date | string
    facturas?: InvoiceListRelationFilter
  }, "id">

  export type BillingClientOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    industria?: SortOrderInput | SortOrder
    cuit?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    datosPago?: SortOrderInput | SortOrder
    valorMensual?: SortOrder
    moneda?: SortOrder
    inicioContrato?: SortOrderInput | SortOrder
    renovacionContrato?: SortOrderInput | SortOrder
    estado?: SortOrder
    notas?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BillingClientCountOrderByAggregateInput
    _avg?: BillingClientAvgOrderByAggregateInput
    _max?: BillingClientMaxOrderByAggregateInput
    _min?: BillingClientMinOrderByAggregateInput
    _sum?: BillingClientSumOrderByAggregateInput
  }

  export type BillingClientScalarWhereWithAggregatesInput = {
    AND?: BillingClientScalarWhereWithAggregatesInput | BillingClientScalarWhereWithAggregatesInput[]
    OR?: BillingClientScalarWhereWithAggregatesInput[]
    NOT?: BillingClientScalarWhereWithAggregatesInput | BillingClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BillingClient"> | string
    nombre?: StringWithAggregatesFilter<"BillingClient"> | string
    email?: StringNullableWithAggregatesFilter<"BillingClient"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"BillingClient"> | string | null
    industria?: StringNullableWithAggregatesFilter<"BillingClient"> | string | null
    cuit?: StringNullableWithAggregatesFilter<"BillingClient"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"BillingClient"> | string | null
    datosPago?: StringNullableWithAggregatesFilter<"BillingClient"> | string | null
    valorMensual?: IntWithAggregatesFilter<"BillingClient"> | number
    moneda?: StringWithAggregatesFilter<"BillingClient"> | string
    inicioContrato?: DateTimeNullableWithAggregatesFilter<"BillingClient"> | Date | string | null
    renovacionContrato?: DateTimeNullableWithAggregatesFilter<"BillingClient"> | Date | string | null
    estado?: StringWithAggregatesFilter<"BillingClient"> | string
    notas?: StringNullableWithAggregatesFilter<"BillingClient"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BillingClient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BillingClient"> | Date | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: StringFilter<"Invoice"> | string
    numero?: StringFilter<"Invoice"> | string
    clienteId?: StringFilter<"Invoice"> | string
    descripcion?: StringNullableFilter<"Invoice"> | string | null
    items?: StringNullableFilter<"Invoice"> | string | null
    subtotal?: IntFilter<"Invoice"> | number
    tasaIva?: IntFilter<"Invoice"> | number
    montoIva?: IntFilter<"Invoice"> | number
    descuento?: IntFilter<"Invoice"> | number
    total?: IntFilter<"Invoice"> | number
    moneda?: StringFilter<"Invoice"> | string
    estado?: StringFilter<"Invoice"> | string
    emitidaEn?: DateTimeFilter<"Invoice"> | Date | string
    venceEn?: DateTimeFilter<"Invoice"> | Date | string
    pagadaEn?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    notas?: StringNullableFilter<"Invoice"> | string | null
    datosPago?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    cliente?: XOR<BillingClientRelationFilter, BillingClientWhereInput>
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    clienteId?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    items?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    tasaIva?: SortOrder
    montoIva?: SortOrder
    descuento?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    emitidaEn?: SortOrder
    venceEn?: SortOrder
    pagadaEn?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    datosPago?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cliente?: BillingClientOrderByWithRelationInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    clienteId?: StringFilter<"Invoice"> | string
    descripcion?: StringNullableFilter<"Invoice"> | string | null
    items?: StringNullableFilter<"Invoice"> | string | null
    subtotal?: IntFilter<"Invoice"> | number
    tasaIva?: IntFilter<"Invoice"> | number
    montoIva?: IntFilter<"Invoice"> | number
    descuento?: IntFilter<"Invoice"> | number
    total?: IntFilter<"Invoice"> | number
    moneda?: StringFilter<"Invoice"> | string
    estado?: StringFilter<"Invoice"> | string
    emitidaEn?: DateTimeFilter<"Invoice"> | Date | string
    venceEn?: DateTimeFilter<"Invoice"> | Date | string
    pagadaEn?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    notas?: StringNullableFilter<"Invoice"> | string | null
    datosPago?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    cliente?: XOR<BillingClientRelationFilter, BillingClientWhereInput>
  }, "id" | "numero">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    clienteId?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    items?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    tasaIva?: SortOrder
    montoIva?: SortOrder
    descuento?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    emitidaEn?: SortOrder
    venceEn?: SortOrder
    pagadaEn?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    datosPago?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Invoice"> | string
    numero?: StringWithAggregatesFilter<"Invoice"> | string
    clienteId?: StringWithAggregatesFilter<"Invoice"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    items?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    subtotal?: IntWithAggregatesFilter<"Invoice"> | number
    tasaIva?: IntWithAggregatesFilter<"Invoice"> | number
    montoIva?: IntWithAggregatesFilter<"Invoice"> | number
    descuento?: IntWithAggregatesFilter<"Invoice"> | number
    total?: IntWithAggregatesFilter<"Invoice"> | number
    moneda?: StringWithAggregatesFilter<"Invoice"> | string
    estado?: StringWithAggregatesFilter<"Invoice"> | string
    emitidaEn?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    venceEn?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    pagadaEn?: DateTimeNullableWithAggregatesFilter<"Invoice"> | Date | string | null
    notas?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    datosPago?: StringNullableWithAggregatesFilter<"Invoice"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type CustomerCreateInput = {
    id?: string
    userId?: string | null
    fullName: string
    email: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    userId?: string | null
    fullName: string
    email: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateManyInput = {
    id?: string
    userId?: string | null
    fullName: string
    email: string
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostCreateInput = {
    id?: string
    titulo: string
    slug: string
    categoria?: string | null
    extracto?: string | null
    contenido: string
    imagenUrl?: string | null
    publicado?: boolean
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUncheckedCreateInput = {
    id?: string
    titulo: string
    slug: string
    categoria?: string | null
    extracto?: string | null
    contenido: string
    imagenUrl?: string | null
    publicado?: boolean
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    extracto?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: StringFieldUpdateOperationsInput | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publicado?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    extracto?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: StringFieldUpdateOperationsInput | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publicado?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostCreateManyInput = {
    id?: string
    titulo: string
    slug: string
    categoria?: string | null
    extracto?: string | null
    contenido: string
    imagenUrl?: string | null
    publicado?: boolean
    publishedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    extracto?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: StringFieldUpdateOperationsInput | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publicado?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    categoria?: NullableStringFieldUpdateOperationsInput | string | null
    extracto?: NullableStringFieldUpdateOperationsInput | string | null
    contenido?: StringFieldUpdateOperationsInput | string
    imagenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    publicado?: BoolFieldUpdateOperationsInput | boolean
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TallerCreateInput = {
    id?: string
    titulo: string
    nivel?: string | null
    modalidad?: string | null
    descripcion?: string | null
    precio?: number | null
    fecha?: Date | string | null
    cupoMaximo?: number | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscripciones?: InscripcionCreateNestedManyWithoutTallerInput
  }

  export type TallerUncheckedCreateInput = {
    id?: string
    titulo: string
    nivel?: string | null
    modalidad?: string | null
    descripcion?: string | null
    precio?: number | null
    fecha?: Date | string | null
    cupoMaximo?: number | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutTallerInput
  }

  export type TallerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    modalidad?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cupoMaximo?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscripciones?: InscripcionUpdateManyWithoutTallerNestedInput
  }

  export type TallerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    modalidad?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cupoMaximo?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inscripciones?: InscripcionUncheckedUpdateManyWithoutTallerNestedInput
  }

  export type TallerCreateManyInput = {
    id?: string
    titulo: string
    nivel?: string | null
    modalidad?: string | null
    descripcion?: string | null
    precio?: number | null
    fecha?: Date | string | null
    cupoMaximo?: number | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TallerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    modalidad?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cupoMaximo?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TallerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    modalidad?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cupoMaximo?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionCreateInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    estado?: string
    createdAt?: Date | string
    taller: TallerCreateNestedOneWithoutInscripcionesInput
  }

  export type InscripcionUncheckedCreateInput = {
    id?: string
    tallerId: string
    nombre: string
    email: string
    telefono?: string | null
    estado?: string
    createdAt?: Date | string
  }

  export type InscripcionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    taller?: TallerUpdateOneRequiredWithoutInscripcionesNestedInput
  }

  export type InscripcionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tallerId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionCreateManyInput = {
    id?: string
    tallerId: string
    nombre: string
    email: string
    telefono?: string | null
    estado?: string
    createdAt?: Date | string
  }

  export type InscripcionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tallerId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfiguracionSitioCreateInput = {
    id?: string
    clave: string
    valor: string
  }

  export type ConfiguracionSitioUncheckedCreateInput = {
    id?: string
    clave: string
    valor: string
  }

  export type ConfiguracionSitioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type ConfiguracionSitioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type ConfiguracionSitioCreateManyInput = {
    id?: string
    clave: string
    valor: string
  }

  export type ConfiguracionSitioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type ConfiguracionSitioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clave?: StringFieldUpdateOperationsInput | string
    valor?: StringFieldUpdateOperationsInput | string
  }

  export type BillingClientCreateInput = {
    id?: string
    nombre: string
    email?: string | null
    telefono?: string | null
    industria?: string | null
    cuit?: string | null
    direccion?: string | null
    datosPago?: string | null
    valorMensual?: number
    moneda?: string
    inicioContrato?: Date | string | null
    renovacionContrato?: Date | string | null
    estado?: string
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    facturas?: InvoiceCreateNestedManyWithoutClienteInput
  }

  export type BillingClientUncheckedCreateInput = {
    id?: string
    nombre: string
    email?: string | null
    telefono?: string | null
    industria?: string | null
    cuit?: string | null
    direccion?: string | null
    datosPago?: string | null
    valorMensual?: number
    moneda?: string
    inicioContrato?: Date | string | null
    renovacionContrato?: Date | string | null
    estado?: string
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    facturas?: InvoiceUncheckedCreateNestedManyWithoutClienteInput
  }

  export type BillingClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    industria?: NullableStringFieldUpdateOperationsInput | string | null
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    valorMensual?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    inicioContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    renovacionContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facturas?: InvoiceUpdateManyWithoutClienteNestedInput
  }

  export type BillingClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    industria?: NullableStringFieldUpdateOperationsInput | string | null
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    valorMensual?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    inicioContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    renovacionContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facturas?: InvoiceUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type BillingClientCreateManyInput = {
    id?: string
    nombre: string
    email?: string | null
    telefono?: string | null
    industria?: string | null
    cuit?: string | null
    direccion?: string | null
    datosPago?: string | null
    valorMensual?: number
    moneda?: string
    inicioContrato?: Date | string | null
    renovacionContrato?: Date | string | null
    estado?: string
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillingClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    industria?: NullableStringFieldUpdateOperationsInput | string | null
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    valorMensual?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    inicioContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    renovacionContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillingClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    industria?: NullableStringFieldUpdateOperationsInput | string | null
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    valorMensual?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    inicioContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    renovacionContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateInput = {
    id?: string
    numero: string
    descripcion?: string | null
    items?: string | null
    subtotal?: number
    tasaIva?: number
    montoIva?: number
    descuento?: number
    total?: number
    moneda?: string
    estado?: string
    emitidaEn?: Date | string
    venceEn: Date | string
    pagadaEn?: Date | string | null
    notas?: string | null
    datosPago?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: BillingClientCreateNestedOneWithoutFacturasInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: string
    numero: string
    clienteId: string
    descripcion?: string | null
    items?: string | null
    subtotal?: number
    tasaIva?: number
    montoIva?: number
    descuento?: number
    total?: number
    moneda?: string
    estado?: string
    emitidaEn?: Date | string
    venceEn: Date | string
    pagadaEn?: Date | string | null
    notas?: string | null
    datosPago?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    items?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: IntFieldUpdateOperationsInput | number
    tasaIva?: IntFieldUpdateOperationsInput | number
    montoIva?: IntFieldUpdateOperationsInput | number
    descuento?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    emitidaEn?: DateTimeFieldUpdateOperationsInput | Date | string
    venceEn?: DateTimeFieldUpdateOperationsInput | Date | string
    pagadaEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: BillingClientUpdateOneRequiredWithoutFacturasNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    items?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: IntFieldUpdateOperationsInput | number
    tasaIva?: IntFieldUpdateOperationsInput | number
    montoIva?: IntFieldUpdateOperationsInput | number
    descuento?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    emitidaEn?: DateTimeFieldUpdateOperationsInput | Date | string
    venceEn?: DateTimeFieldUpdateOperationsInput | Date | string
    pagadaEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManyInput = {
    id?: string
    numero: string
    clienteId: string
    descripcion?: string | null
    items?: string | null
    subtotal?: number
    tasaIva?: number
    montoIva?: number
    descuento?: number
    total?: number
    moneda?: string
    estado?: string
    emitidaEn?: Date | string
    venceEn: Date | string
    pagadaEn?: Date | string | null
    notas?: string | null
    datosPago?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    items?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: IntFieldUpdateOperationsInput | number
    tasaIva?: IntFieldUpdateOperationsInput | number
    montoIva?: IntFieldUpdateOperationsInput | number
    descuento?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    emitidaEn?: DateTimeFieldUpdateOperationsInput | Date | string
    venceEn?: DateTimeFieldUpdateOperationsInput | Date | string
    pagadaEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    clienteId?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    items?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: IntFieldUpdateOperationsInput | number
    tasaIva?: IntFieldUpdateOperationsInput | number
    montoIva?: IntFieldUpdateOperationsInput | number
    descuento?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    emitidaEn?: DateTimeFieldUpdateOperationsInput | Date | string
    venceEn?: DateTimeFieldUpdateOperationsInput | Date | string
    pagadaEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BlogPostCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    slug?: SortOrder
    categoria?: SortOrder
    extracto?: SortOrder
    contenido?: SortOrder
    imagenUrl?: SortOrder
    publicado?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    slug?: SortOrder
    categoria?: SortOrder
    extracto?: SortOrder
    contenido?: SortOrder
    imagenUrl?: SortOrder
    publicado?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogPostMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    slug?: SortOrder
    categoria?: SortOrder
    extracto?: SortOrder
    contenido?: SortOrder
    imagenUrl?: SortOrder
    publicado?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type InscripcionListRelationFilter = {
    every?: InscripcionWhereInput
    some?: InscripcionWhereInput
    none?: InscripcionWhereInput
  }

  export type InscripcionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TallerCountOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    nivel?: SortOrder
    modalidad?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    fecha?: SortOrder
    cupoMaximo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TallerAvgOrderByAggregateInput = {
    precio?: SortOrder
    cupoMaximo?: SortOrder
  }

  export type TallerMaxOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    nivel?: SortOrder
    modalidad?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    fecha?: SortOrder
    cupoMaximo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TallerMinOrderByAggregateInput = {
    id?: SortOrder
    titulo?: SortOrder
    nivel?: SortOrder
    modalidad?: SortOrder
    descripcion?: SortOrder
    precio?: SortOrder
    fecha?: SortOrder
    cupoMaximo?: SortOrder
    activo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TallerSumOrderByAggregateInput = {
    precio?: SortOrder
    cupoMaximo?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TallerRelationFilter = {
    is?: TallerWhereInput
    isNot?: TallerWhereInput
  }

  export type InscripcionCountOrderByAggregateInput = {
    id?: SortOrder
    tallerId?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
  }

  export type InscripcionMaxOrderByAggregateInput = {
    id?: SortOrder
    tallerId?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
  }

  export type InscripcionMinOrderByAggregateInput = {
    id?: SortOrder
    tallerId?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    estado?: SortOrder
    createdAt?: SortOrder
  }

  export type ConfiguracionSitioCountOrderByAggregateInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type ConfiguracionSitioMaxOrderByAggregateInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type ConfiguracionSitioMinOrderByAggregateInput = {
    id?: SortOrder
    clave?: SortOrder
    valor?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillingClientCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    industria?: SortOrder
    cuit?: SortOrder
    direccion?: SortOrder
    datosPago?: SortOrder
    valorMensual?: SortOrder
    moneda?: SortOrder
    inicioContrato?: SortOrder
    renovacionContrato?: SortOrder
    estado?: SortOrder
    notas?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillingClientAvgOrderByAggregateInput = {
    valorMensual?: SortOrder
  }

  export type BillingClientMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    industria?: SortOrder
    cuit?: SortOrder
    direccion?: SortOrder
    datosPago?: SortOrder
    valorMensual?: SortOrder
    moneda?: SortOrder
    inicioContrato?: SortOrder
    renovacionContrato?: SortOrder
    estado?: SortOrder
    notas?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillingClientMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    industria?: SortOrder
    cuit?: SortOrder
    direccion?: SortOrder
    datosPago?: SortOrder
    valorMensual?: SortOrder
    moneda?: SortOrder
    inicioContrato?: SortOrder
    renovacionContrato?: SortOrder
    estado?: SortOrder
    notas?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillingClientSumOrderByAggregateInput = {
    valorMensual?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BillingClientRelationFilter = {
    is?: BillingClientWhereInput
    isNot?: BillingClientWhereInput
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    clienteId?: SortOrder
    descripcion?: SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    tasaIva?: SortOrder
    montoIva?: SortOrder
    descuento?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    emitidaEn?: SortOrder
    venceEn?: SortOrder
    pagadaEn?: SortOrder
    notas?: SortOrder
    datosPago?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    tasaIva?: SortOrder
    montoIva?: SortOrder
    descuento?: SortOrder
    total?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    clienteId?: SortOrder
    descripcion?: SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    tasaIva?: SortOrder
    montoIva?: SortOrder
    descuento?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    emitidaEn?: SortOrder
    venceEn?: SortOrder
    pagadaEn?: SortOrder
    notas?: SortOrder
    datosPago?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    clienteId?: SortOrder
    descripcion?: SortOrder
    items?: SortOrder
    subtotal?: SortOrder
    tasaIva?: SortOrder
    montoIva?: SortOrder
    descuento?: SortOrder
    total?: SortOrder
    moneda?: SortOrder
    estado?: SortOrder
    emitidaEn?: SortOrder
    venceEn?: SortOrder
    pagadaEn?: SortOrder
    notas?: SortOrder
    datosPago?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    subtotal?: SortOrder
    tasaIva?: SortOrder
    montoIva?: SortOrder
    descuento?: SortOrder
    total?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type InscripcionCreateNestedManyWithoutTallerInput = {
    create?: XOR<InscripcionCreateWithoutTallerInput, InscripcionUncheckedCreateWithoutTallerInput> | InscripcionCreateWithoutTallerInput[] | InscripcionUncheckedCreateWithoutTallerInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutTallerInput | InscripcionCreateOrConnectWithoutTallerInput[]
    createMany?: InscripcionCreateManyTallerInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type InscripcionUncheckedCreateNestedManyWithoutTallerInput = {
    create?: XOR<InscripcionCreateWithoutTallerInput, InscripcionUncheckedCreateWithoutTallerInput> | InscripcionCreateWithoutTallerInput[] | InscripcionUncheckedCreateWithoutTallerInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutTallerInput | InscripcionCreateOrConnectWithoutTallerInput[]
    createMany?: InscripcionCreateManyTallerInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InscripcionUpdateManyWithoutTallerNestedInput = {
    create?: XOR<InscripcionCreateWithoutTallerInput, InscripcionUncheckedCreateWithoutTallerInput> | InscripcionCreateWithoutTallerInput[] | InscripcionUncheckedCreateWithoutTallerInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutTallerInput | InscripcionCreateOrConnectWithoutTallerInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutTallerInput | InscripcionUpsertWithWhereUniqueWithoutTallerInput[]
    createMany?: InscripcionCreateManyTallerInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutTallerInput | InscripcionUpdateWithWhereUniqueWithoutTallerInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutTallerInput | InscripcionUpdateManyWithWhereWithoutTallerInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type InscripcionUncheckedUpdateManyWithoutTallerNestedInput = {
    create?: XOR<InscripcionCreateWithoutTallerInput, InscripcionUncheckedCreateWithoutTallerInput> | InscripcionCreateWithoutTallerInput[] | InscripcionUncheckedCreateWithoutTallerInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutTallerInput | InscripcionCreateOrConnectWithoutTallerInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutTallerInput | InscripcionUpsertWithWhereUniqueWithoutTallerInput[]
    createMany?: InscripcionCreateManyTallerInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutTallerInput | InscripcionUpdateWithWhereUniqueWithoutTallerInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutTallerInput | InscripcionUpdateManyWithWhereWithoutTallerInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type TallerCreateNestedOneWithoutInscripcionesInput = {
    create?: XOR<TallerCreateWithoutInscripcionesInput, TallerUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: TallerCreateOrConnectWithoutInscripcionesInput
    connect?: TallerWhereUniqueInput
  }

  export type TallerUpdateOneRequiredWithoutInscripcionesNestedInput = {
    create?: XOR<TallerCreateWithoutInscripcionesInput, TallerUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: TallerCreateOrConnectWithoutInscripcionesInput
    upsert?: TallerUpsertWithoutInscripcionesInput
    connect?: TallerWhereUniqueInput
    update?: XOR<XOR<TallerUpdateToOneWithWhereWithoutInscripcionesInput, TallerUpdateWithoutInscripcionesInput>, TallerUncheckedUpdateWithoutInscripcionesInput>
  }

  export type InvoiceCreateNestedManyWithoutClienteInput = {
    create?: XOR<InvoiceCreateWithoutClienteInput, InvoiceUncheckedCreateWithoutClienteInput> | InvoiceCreateWithoutClienteInput[] | InvoiceUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClienteInput | InvoiceCreateOrConnectWithoutClienteInput[]
    createMany?: InvoiceCreateManyClienteInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<InvoiceCreateWithoutClienteInput, InvoiceUncheckedCreateWithoutClienteInput> | InvoiceCreateWithoutClienteInput[] | InvoiceUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClienteInput | InvoiceCreateOrConnectWithoutClienteInput[]
    createMany?: InvoiceCreateManyClienteInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InvoiceUpdateManyWithoutClienteNestedInput = {
    create?: XOR<InvoiceCreateWithoutClienteInput, InvoiceUncheckedCreateWithoutClienteInput> | InvoiceCreateWithoutClienteInput[] | InvoiceUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClienteInput | InvoiceCreateOrConnectWithoutClienteInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutClienteInput | InvoiceUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: InvoiceCreateManyClienteInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutClienteInput | InvoiceUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutClienteInput | InvoiceUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<InvoiceCreateWithoutClienteInput, InvoiceUncheckedCreateWithoutClienteInput> | InvoiceCreateWithoutClienteInput[] | InvoiceUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutClienteInput | InvoiceCreateOrConnectWithoutClienteInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutClienteInput | InvoiceUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: InvoiceCreateManyClienteInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutClienteInput | InvoiceUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutClienteInput | InvoiceUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type BillingClientCreateNestedOneWithoutFacturasInput = {
    create?: XOR<BillingClientCreateWithoutFacturasInput, BillingClientUncheckedCreateWithoutFacturasInput>
    connectOrCreate?: BillingClientCreateOrConnectWithoutFacturasInput
    connect?: BillingClientWhereUniqueInput
  }

  export type BillingClientUpdateOneRequiredWithoutFacturasNestedInput = {
    create?: XOR<BillingClientCreateWithoutFacturasInput, BillingClientUncheckedCreateWithoutFacturasInput>
    connectOrCreate?: BillingClientCreateOrConnectWithoutFacturasInput
    upsert?: BillingClientUpsertWithoutFacturasInput
    connect?: BillingClientWhereUniqueInput
    update?: XOR<XOR<BillingClientUpdateToOneWithWhereWithoutFacturasInput, BillingClientUpdateWithoutFacturasInput>, BillingClientUncheckedUpdateWithoutFacturasInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type InscripcionCreateWithoutTallerInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    estado?: string
    createdAt?: Date | string
  }

  export type InscripcionUncheckedCreateWithoutTallerInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    estado?: string
    createdAt?: Date | string
  }

  export type InscripcionCreateOrConnectWithoutTallerInput = {
    where: InscripcionWhereUniqueInput
    create: XOR<InscripcionCreateWithoutTallerInput, InscripcionUncheckedCreateWithoutTallerInput>
  }

  export type InscripcionCreateManyTallerInputEnvelope = {
    data: InscripcionCreateManyTallerInput | InscripcionCreateManyTallerInput[]
    skipDuplicates?: boolean
  }

  export type InscripcionUpsertWithWhereUniqueWithoutTallerInput = {
    where: InscripcionWhereUniqueInput
    update: XOR<InscripcionUpdateWithoutTallerInput, InscripcionUncheckedUpdateWithoutTallerInput>
    create: XOR<InscripcionCreateWithoutTallerInput, InscripcionUncheckedCreateWithoutTallerInput>
  }

  export type InscripcionUpdateWithWhereUniqueWithoutTallerInput = {
    where: InscripcionWhereUniqueInput
    data: XOR<InscripcionUpdateWithoutTallerInput, InscripcionUncheckedUpdateWithoutTallerInput>
  }

  export type InscripcionUpdateManyWithWhereWithoutTallerInput = {
    where: InscripcionScalarWhereInput
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyWithoutTallerInput>
  }

  export type InscripcionScalarWhereInput = {
    AND?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
    OR?: InscripcionScalarWhereInput[]
    NOT?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
    id?: StringFilter<"Inscripcion"> | string
    tallerId?: StringFilter<"Inscripcion"> | string
    nombre?: StringFilter<"Inscripcion"> | string
    email?: StringFilter<"Inscripcion"> | string
    telefono?: StringNullableFilter<"Inscripcion"> | string | null
    estado?: StringFilter<"Inscripcion"> | string
    createdAt?: DateTimeFilter<"Inscripcion"> | Date | string
  }

  export type TallerCreateWithoutInscripcionesInput = {
    id?: string
    titulo: string
    nivel?: string | null
    modalidad?: string | null
    descripcion?: string | null
    precio?: number | null
    fecha?: Date | string | null
    cupoMaximo?: number | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TallerUncheckedCreateWithoutInscripcionesInput = {
    id?: string
    titulo: string
    nivel?: string | null
    modalidad?: string | null
    descripcion?: string | null
    precio?: number | null
    fecha?: Date | string | null
    cupoMaximo?: number | null
    activo?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TallerCreateOrConnectWithoutInscripcionesInput = {
    where: TallerWhereUniqueInput
    create: XOR<TallerCreateWithoutInscripcionesInput, TallerUncheckedCreateWithoutInscripcionesInput>
  }

  export type TallerUpsertWithoutInscripcionesInput = {
    update: XOR<TallerUpdateWithoutInscripcionesInput, TallerUncheckedUpdateWithoutInscripcionesInput>
    create: XOR<TallerCreateWithoutInscripcionesInput, TallerUncheckedCreateWithoutInscripcionesInput>
    where?: TallerWhereInput
  }

  export type TallerUpdateToOneWithWhereWithoutInscripcionesInput = {
    where?: TallerWhereInput
    data: XOR<TallerUpdateWithoutInscripcionesInput, TallerUncheckedUpdateWithoutInscripcionesInput>
  }

  export type TallerUpdateWithoutInscripcionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    modalidad?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cupoMaximo?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TallerUncheckedUpdateWithoutInscripcionesInput = {
    id?: StringFieldUpdateOperationsInput | string
    titulo?: StringFieldUpdateOperationsInput | string
    nivel?: NullableStringFieldUpdateOperationsInput | string | null
    modalidad?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    precio?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cupoMaximo?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateWithoutClienteInput = {
    id?: string
    numero: string
    descripcion?: string | null
    items?: string | null
    subtotal?: number
    tasaIva?: number
    montoIva?: number
    descuento?: number
    total?: number
    moneda?: string
    estado?: string
    emitidaEn?: Date | string
    venceEn: Date | string
    pagadaEn?: Date | string | null
    notas?: string | null
    datosPago?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUncheckedCreateWithoutClienteInput = {
    id?: string
    numero: string
    descripcion?: string | null
    items?: string | null
    subtotal?: number
    tasaIva?: number
    montoIva?: number
    descuento?: number
    total?: number
    moneda?: string
    estado?: string
    emitidaEn?: Date | string
    venceEn: Date | string
    pagadaEn?: Date | string | null
    notas?: string | null
    datosPago?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceCreateOrConnectWithoutClienteInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutClienteInput, InvoiceUncheckedCreateWithoutClienteInput>
  }

  export type InvoiceCreateManyClienteInputEnvelope = {
    data: InvoiceCreateManyClienteInput | InvoiceCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceUpsertWithWhereUniqueWithoutClienteInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutClienteInput, InvoiceUncheckedUpdateWithoutClienteInput>
    create: XOR<InvoiceCreateWithoutClienteInput, InvoiceUncheckedCreateWithoutClienteInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutClienteInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutClienteInput, InvoiceUncheckedUpdateWithoutClienteInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutClienteInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutClienteInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: StringFilter<"Invoice"> | string
    numero?: StringFilter<"Invoice"> | string
    clienteId?: StringFilter<"Invoice"> | string
    descripcion?: StringNullableFilter<"Invoice"> | string | null
    items?: StringNullableFilter<"Invoice"> | string | null
    subtotal?: IntFilter<"Invoice"> | number
    tasaIva?: IntFilter<"Invoice"> | number
    montoIva?: IntFilter<"Invoice"> | number
    descuento?: IntFilter<"Invoice"> | number
    total?: IntFilter<"Invoice"> | number
    moneda?: StringFilter<"Invoice"> | string
    estado?: StringFilter<"Invoice"> | string
    emitidaEn?: DateTimeFilter<"Invoice"> | Date | string
    venceEn?: DateTimeFilter<"Invoice"> | Date | string
    pagadaEn?: DateTimeNullableFilter<"Invoice"> | Date | string | null
    notas?: StringNullableFilter<"Invoice"> | string | null
    datosPago?: StringNullableFilter<"Invoice"> | string | null
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
  }

  export type BillingClientCreateWithoutFacturasInput = {
    id?: string
    nombre: string
    email?: string | null
    telefono?: string | null
    industria?: string | null
    cuit?: string | null
    direccion?: string | null
    datosPago?: string | null
    valorMensual?: number
    moneda?: string
    inicioContrato?: Date | string | null
    renovacionContrato?: Date | string | null
    estado?: string
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillingClientUncheckedCreateWithoutFacturasInput = {
    id?: string
    nombre: string
    email?: string | null
    telefono?: string | null
    industria?: string | null
    cuit?: string | null
    direccion?: string | null
    datosPago?: string | null
    valorMensual?: number
    moneda?: string
    inicioContrato?: Date | string | null
    renovacionContrato?: Date | string | null
    estado?: string
    notas?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BillingClientCreateOrConnectWithoutFacturasInput = {
    where: BillingClientWhereUniqueInput
    create: XOR<BillingClientCreateWithoutFacturasInput, BillingClientUncheckedCreateWithoutFacturasInput>
  }

  export type BillingClientUpsertWithoutFacturasInput = {
    update: XOR<BillingClientUpdateWithoutFacturasInput, BillingClientUncheckedUpdateWithoutFacturasInput>
    create: XOR<BillingClientCreateWithoutFacturasInput, BillingClientUncheckedCreateWithoutFacturasInput>
    where?: BillingClientWhereInput
  }

  export type BillingClientUpdateToOneWithWhereWithoutFacturasInput = {
    where?: BillingClientWhereInput
    data: XOR<BillingClientUpdateWithoutFacturasInput, BillingClientUncheckedUpdateWithoutFacturasInput>
  }

  export type BillingClientUpdateWithoutFacturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    industria?: NullableStringFieldUpdateOperationsInput | string | null
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    valorMensual?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    inicioContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    renovacionContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillingClientUncheckedUpdateWithoutFacturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    industria?: NullableStringFieldUpdateOperationsInput | string | null
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    valorMensual?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    inicioContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    renovacionContrato?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionCreateManyTallerInput = {
    id?: string
    nombre: string
    email: string
    telefono?: string | null
    estado?: string
    createdAt?: Date | string
  }

  export type InscripcionUpdateWithoutTallerInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUncheckedUpdateWithoutTallerInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUncheckedUpdateManyWithoutTallerInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateManyClienteInput = {
    id?: string
    numero: string
    descripcion?: string | null
    items?: string | null
    subtotal?: number
    tasaIva?: number
    montoIva?: number
    descuento?: number
    total?: number
    moneda?: string
    estado?: string
    emitidaEn?: Date | string
    venceEn: Date | string
    pagadaEn?: Date | string | null
    notas?: string | null
    datosPago?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    items?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: IntFieldUpdateOperationsInput | number
    tasaIva?: IntFieldUpdateOperationsInput | number
    montoIva?: IntFieldUpdateOperationsInput | number
    descuento?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    emitidaEn?: DateTimeFieldUpdateOperationsInput | Date | string
    venceEn?: DateTimeFieldUpdateOperationsInput | Date | string
    pagadaEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    items?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: IntFieldUpdateOperationsInput | number
    tasaIva?: IntFieldUpdateOperationsInput | number
    montoIva?: IntFieldUpdateOperationsInput | number
    descuento?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    emitidaEn?: DateTimeFieldUpdateOperationsInput | Date | string
    venceEn?: DateTimeFieldUpdateOperationsInput | Date | string
    pagadaEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    items?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: IntFieldUpdateOperationsInput | number
    tasaIva?: IntFieldUpdateOperationsInput | number
    montoIva?: IntFieldUpdateOperationsInput | number
    descuento?: IntFieldUpdateOperationsInput | number
    total?: IntFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    emitidaEn?: DateTimeFieldUpdateOperationsInput | Date | string
    venceEn?: DateTimeFieldUpdateOperationsInput | Date | string
    pagadaEn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    datosPago?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TallerCountOutputTypeDefaultArgs instead
     */
    export type TallerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TallerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillingClientCountOutputTypeDefaultArgs instead
     */
    export type BillingClientCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillingClientCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerDefaultArgs instead
     */
    export type CustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BlogPostDefaultArgs instead
     */
    export type BlogPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BlogPostDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TallerDefaultArgs instead
     */
    export type TallerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TallerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InscripcionDefaultArgs instead
     */
    export type InscripcionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InscripcionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConfiguracionSitioDefaultArgs instead
     */
    export type ConfiguracionSitioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConfiguracionSitioDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillingClientDefaultArgs instead
     */
    export type BillingClientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillingClientDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InvoiceDefaultArgs instead
     */
    export type InvoiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InvoiceDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}