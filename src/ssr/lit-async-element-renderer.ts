import { RenderInfo, RenderResult } from '@lit-labs/ssr';
import { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer'
import { renderValue } from '@lit-labs/ssr/lib/render-value';
import { CSSResult, LitElement } from 'lit';
import { isLitWithSSR } from './lit-with-ssr';


export class LitAsyncElementRenderer extends LitElementRenderer {

  override *renderShadow(renderInfo: RenderInfo): RenderResult {
    if (isLitWithSSR(this.element)) {
      const continuation = this.element.ssrConnected().then((_) =>
        this._renderShadowContents(renderInfo)
      )
      yield continuation;
    }
    else {
      yield* this._renderShadowContents(renderInfo);
    }
  }

  private *_renderShadowContents(renderInfo: RenderInfo): RenderResult {
    // Render styles.
    const styles = (this.element.constructor as typeof LitElement)
      .elementStyles;
    if (styles !== undefined && styles.length > 0) {
      yield '<style>';
      for (const style of styles) {
        yield (style as CSSResult).cssText;
      }
      yield '</style>';
    }
    // Render template
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yield* renderValue((this.element as any).render(), renderInfo);
  }

  override *renderLight(renderInfo: RenderInfo): RenderResult {
    if (isLitWithSSR(this.element)) {
      const continuation = this.element.ssrConnected().then((_) =>
        this._renderLightContents(renderInfo)
      )
      yield continuation;
    }
    else {
      yield* this._renderLightContents(renderInfo);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (this.element as any)?.renderLight();
    if (value) {
      yield* renderValue(value, renderInfo);
    } else {
      yield '';
    }
  }

  private *_renderLightContents(renderInfo: RenderInfo): RenderResult {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (this.element as any)?.renderLight();
    if (value) {
      yield* renderValue(value, renderInfo);
    } else {
      yield '';
    }
  }
}