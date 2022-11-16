/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

/** Type helpers */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
type OneOf<T extends any[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
  ? OneOf<[XOR<A, B>, ...Rest]>
  : never;

export interface paths {
  '/users': {
    post: {
      requestBody?: {
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      responses: {
        /** @description successful operation */
        200: {
          content: {
            'application/json': {
              /**
               * Format: uuid
               * @example b99ec52b-e9e2-444c-8c73-fb577c25bf70
               */
              id: string;
            } & components['schemas']['User'];
          };
        };
      };
    };
  };
  '/users/{memorableId}': {
    /** Get user by memorable id */
    get: operations['getUserByMemorableId'];
  };
  '/locations': {
    get: {
      responses: {
        /** @description successful operation */
        200: {
          content: {
            'application/json': components['schemas']['Location'][];
          };
        };
      };
    };
  };
  '/locations/{locationId}': {
    get: {
      responses: {
        /** @description successful operation */
        200: {
          content: {
            'application/json': components['schemas']['Location'];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    User: {
      /**
       * Format: uuid
       * @example
       */
      id: string;
      /** @example abc */
      memorableId: string;
      /** @example John */
      firstName: string;
      /** @example James */
      lastName: string;
      /** @example https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg */
      profilePicture?: string;
    };
    Location: {
      /**
       * Format: uuid
       * @example 54268cee-3533-4134-a1ed-fdaae38188a3
       */
      id: string;
      /** @example Nottingham */
      name: string;
      /** @example https://www.thetrainline.com/content/vul/hero-images/city/nottingham/1x.jpg */
      coverPhoto?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: {
    User?: {
      content: {
        'application/json': {
          /** @example abc */
          memorableId: string;
          /** @example John */
          firstName: string;
          /** @example James */
          lastName: string;
          /** @example https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg */
          profilePicture?: string;
        };
      };
    };
  };
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

type HttpPathParam<T extends keyof operations> = {
  params: operations[T]['parameters']['path'];
};

export interface operations {
  getUserByMemorableId: {
    /** Get user by memorable id */
    parameters: {
      path: {
        memorableId: string;
      };
    };
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['User'];
        };
      };
      /** @description User not found */
      404: never;
    };
  };
}
