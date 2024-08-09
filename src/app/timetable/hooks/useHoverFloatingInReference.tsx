/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useFloating, offset, useDismiss, useInteractions, useHover } from '@floating-ui/react';
import { useRequestAnimationFrame } from './useRequestAnimationFrame';

function useHoverFloatingInReference() {
  const [isFloatingTargetVisible, setIsFloatingTargetVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [
      offset(
        ({ rects }) => {
          const { x, y } = mousePosition;
          const { height } = rects.reference;
          const referenceClientRect = refs.reference.current?.getBoundingClientRect();
          const refY: number = referenceClientRect?.y ?? 0;
          const refX: number = referenceClientRect?.x ?? 0;

          return {
            mainAxis: y - height - refY,
            crossAxis: x - refX,
          };
        },
        [mousePosition.x, mousePosition.y],
      ),
    ],
    open: isFloatingTargetVisible,
    onOpenChange: setIsFloatingTargetVisible,
  });

  const dismiss = useDismiss(context, { outsidePress: true });
  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss, hover]);

  const handleMouseMove = useRequestAnimationFrame((event: MouseEvent) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX + 5, y: clientY + 5 });
  });

  useEffect(() => {
    const refElement = refs.reference?.current as HTMLElement | null;

    if (!refElement) {
      return;
    }

    if (refElement) {
      refElement.addEventListener('mousemove', handleMouseMove)!;

      return () => {
        refElement.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return {
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    isFloatingTargetVisible,
  };
}

export { useHoverFloatingInReference };
