import { ReferenceType } from '@floating-ui/react';
import { HTMLProps } from 'react';
import { PopoverType } from '../components/Timetable.type';

interface HoverFloatingType {
  refs: {
    reference: React.MutableRefObject<ReferenceType | null>;
    floating: React.MutableRefObject<HTMLElement | null>;
    setReference: (node: ReferenceType | null) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles: React.CSSProperties;
  getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  isFloatingTargetVisible: boolean;
}

interface ClickFloatingType {
  refs: {
    reference: React.MutableRefObject<ReferenceType | null>;
    floating: React.MutableRefObject<HTMLElement | null>;
    setReference: (node: ReferenceType | null) => void;
    setFloating: (node: HTMLElement | null) => void;
  };
  floatingStyles: React.CSSProperties;
  getReferenceProps: (userProps?: HTMLProps<Element>) => Record<string, unknown>;
  getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
  fixFloatingTargetPosition: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isFloatingTargetVisible: boolean;
}

const getPopoverEvent = (
  hoverTypeObject: HoverFloatingType,
  clickTypeObject: ClickFloatingType,
  curPopoverType: PopoverType,
): ClickFloatingType => {
  if (curPopoverType === 'HOVER') {
    return {
      ...hoverTypeObject,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fixFloatingTargetPosition: (event: React.MouseEvent) => {},
    };
  }

  return {
    ...clickTypeObject,
  };
};

export { getPopoverEvent };
