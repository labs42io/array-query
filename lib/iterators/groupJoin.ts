import { toGroups } from '../reducers/toGroups';
import { iterable } from '../utils/iterable';

export function groupJoin<TLeft, TRight, TKey, TResult>(
  source: Iterable<TLeft>,
  others: Iterable<TRight>,
  leftKeySelector: (element: TLeft, index: number) => TKey,
  rightKeySelector: (element: TRight, index: number) => TKey,
  joinSelector: (left: TLeft, right: TRight[]) => TResult,
): Iterable<TResult> {
  return iterable(function* () {
    let index = 0;
    const rightMap = toGroups(others, rightKeySelector, x => x);

    for (const element of source) {
      const leftKey = leftKeySelector(element, index++);
      const rightValues = rightMap.get(leftKey) || [];

      yield joinSelector(element, rightValues);
    }
  });
}
