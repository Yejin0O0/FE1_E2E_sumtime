import { useState } from 'react';
import { offset, useClick, useDismiss, useFloating, useInteractions, shift, flip } from '@floating-ui/react';

function useColorPickerFloating(closeFunction: () => void = () => {}) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange(open, event) {
      event?.stopPropagation();
      event?.preventDefault();
      setIsOpen(open);

      if (open === false) {
        closeFunction();
      }
    },
    placement: 'right-start',
    strategy: 'fixed',
    middleware: [
      offset(() => {
        return {
          crossAxis: -56,
          mainAxis: 8,
        };
      }),
      shift(),
      flip(),
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
