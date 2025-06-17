/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * A rendered value as an iterable of strings or Promises of a RenderResult.
 *
 * This type is a synchronous Iterable so that consumers do not have to await
 * every value according to the JS asynchronous iterator protocol, which would
 * cause additional overhead compared to a sync iterator.
 *
 * Consumers should check the type of each value emitted by the iterator, and
 * if it is a Promise await it if possible, or throw an error.
 *
 * The utility functions {@link collectRenderResult} and
 * {@link collectRenderResultSync} do this for you.
 */
export type RenderResult = AsyncIterable<string | RenderResult | Promise<RenderResult>>;

/**
 * Joins a RenderResult into a string
 */
export const collectResultAsync = async (result: RenderResult): Promise<string> => {
  let value = '';
  for await (const chunk of result) {
    value +=
      typeof chunk === 'string' ? chunk : await collectResultAsync(await chunk);
  }
  return value;
};