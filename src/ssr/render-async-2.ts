/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { isHydratable, RenderInfo, RenderResult } from '@lit-labs/ssr';
import { renderValue } from '@lit-labs/ssr/lib/render-value';
import { isTemplateResult } from 'lit-html/directive-helpers.js';
import { LitAsyncElementRenderer } from './lit-async-element-renderer';


export function* renderAsync2(
  value: unknown,
  renderInfo?: Partial<RenderInfo>
): RenderResult {
  const defaultRenderInfo = {
    elementRenderers: [LitAsyncElementRenderer],
    customElementInstanceStack: [],
    customElementHostStack: [],
    eventTargetStack: [],
    slotStack: [],
    deferHydration: false,
  } satisfies RenderInfo;
  renderInfo = { ...defaultRenderInfo, ...renderInfo };
  let hydratable = true;
  if (isTemplateResult(value)) {
    hydratable = isHydratable(value);
  }
  yield* renderValue(value, renderInfo as RenderInfo, hydratable);
}
