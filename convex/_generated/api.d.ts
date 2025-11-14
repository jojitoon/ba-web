/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as analytics from "../analytics.js";
import type * as auth from "../auth.js";
import type * as businessStories from "../businessStories.js";
import type * as favorites from "../favorites.js";
import type * as media from "../media.js";
import type * as messages from "../messages.js";
import type * as mux from "../mux.js";
import type * as projects from "../projects.js";
import type * as s3 from "../s3.js";
import type * as seed from "../seed.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  analytics: typeof analytics;
  auth: typeof auth;
  businessStories: typeof businessStories;
  favorites: typeof favorites;
  media: typeof media;
  messages: typeof messages;
  mux: typeof mux;
  projects: typeof projects;
  s3: typeof s3;
  seed: typeof seed;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
