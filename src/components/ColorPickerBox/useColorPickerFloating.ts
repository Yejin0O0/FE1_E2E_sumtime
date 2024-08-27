import { useState } from 'react';
import { offset, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react';

function useColorPickerFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'left-start',
    middleware: [
      offset(() => {
        return {
          crossAxis: -56,
          mainAxis: 8,
        };
      }),
    ],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  };
}

export default useColorPickerFloating;
