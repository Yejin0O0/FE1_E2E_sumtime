import { useContext, useEffect, useState } from 'react';

import styled from './CurrentTimeLine.module.scss';
import { calculateCurrentTimeOffset, parseSize, generateClassNameWithType } from '../../utils';
import { TypeContext } from '../../contexts/TypeContext';

interface CurrentTimeLineProps {
  startTime: Date;
  endTime: Date;
  timeTableSize: string;
  currentTimeLineStyle?: string;
}

function CurrentTimeLine({ startTime, endTime, timeTableSize, currentTimeLineStyle }: CurrentTimeLineProps) {
  const type = useContext(TypeContext);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const { value, format } = parseSize(timeTableSize);

  useEffect(() => {
    setCurrentTime(new Date());

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const { offsetPercent } = calculateCurrentTimeOffset(currentTime, startTime, endTime);
  const currentTimeLinePosition = `${(offsetPercent * value) / 100}${format}`;
  const dynamicStyle: React.CSSProperties = type === 'ROW' ? { left: currentTimeLinePosition } : { top: currentTimeLinePosition };

  const mergedStyle: React.CSSProperties = { ...dynamicStyle, ...{ border: currentTimeLineStyle } };

  return <hr className={generateClassNameWithType(styled, 'line', type)} style={mergedStyle} />;
}

export default CurrentTimeLine;
