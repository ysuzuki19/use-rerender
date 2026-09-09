import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useReRender from './index';

describe('useReRender', () => {
  it('returns a callable', () => {
    const { result } = renderHook(() => useReRender());

    expect(typeof result.current).toBe('function');
  });

  it('re-renders the host component on every call', () => {
    let renderCount = 0;
    const { result } = renderHook(() => {
      renderCount++;
      return useReRender();
    });

    expect(renderCount).toBe(1);

    act(() => {
      result.current();
    });
    expect(renderCount).toBe(2);

    // 内部 state が真偽値のトグルであることの検証: 同じ値を再設定すると
    // React が bailout して 2 回目以降が再描画されなくなる
    act(() => {
      result.current();
    });
    expect(renderCount).toBe(3);
  });
});
