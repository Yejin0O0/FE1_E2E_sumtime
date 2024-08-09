/* eslint-disable consistent-return */
import { useState, useRef } from 'react';
import { useFloating, offset, useDismiss, useInteractions } from '@floating-ui/react';

function useClickFloatingInReference() {
  const [isFloatingTargetVisible, setIsTooltipVisible] = useState(false);
  const refClickPosition = useRef({ x: 0, y: 0 });

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [
      offset(
        ({ rects }) => {
          const { x, y } = refClickPosition.current;
          const { height } = rects.reference;
          const referenceClientRect = refs.reference.current?.getBoundingClientRect();
          const refY: number = referenceClientRect?.y ?? 0;
          const refX: number = referenceClientRect?.x ?? 0;

          return {
            mainAxis: y - height - refY,
            crossAxis: x - refX,
          };
        },
        [refClickPosition.current.x, refClickPosition.current.y],
      ),
    ],
    open: isFloatingTargetVisible,
    onOpenChange: setIsTooltipVisible,
  });

  const dismiss = useDismiss(context, { outsidePress: true });
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const fixFloatingTargetPosition = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = event;
    refClickPosition.current = { x: clientX, y: clientY };
    setIsTooltipVisible(true);
  };

  return { refs, floatingStyles, getReferenceProps, getFloatingProps, fixFloatingTargetPosition, isFloatingTargetVisible };
}

export { useClickFloatingInReference };
