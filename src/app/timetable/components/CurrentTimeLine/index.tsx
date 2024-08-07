import { useContext, useEffect, useState } from 'react';

import styled from './CurrentTimeLine.module.scss';
import { calculateCurrentTimeOffset, parseSize, generateClassNameWithType } from '../../utils';
import TypeContext from '../../TypeContext';

interface CurrentTimeLineProps {
  startTime: Date;
  endTime: Date;
  size: string;
}

function CurrentTimeLine({ startTime, endTime, size }: CurrentTimeLineProps) {
  const type = useContext(TypeContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { value, format } = parseSize(size);

  // 여기서 전체 offset을 정리해서 두자.
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 매 1분마다 현재 시간 업데이트

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const { offsetPercent } = calculateCurrentTimeOffset(currentTime, startTime, endTime);
  const currentTimeLinePosition = `${(offsetPercent * value) / 100}${format}`;
  const dynamicStyle: React.CSSProperties = type === 'ROW' ? { left: currentTimeLinePosition } : { top: currentTimeLinePosition };

  return (
    <div className={generateClassNameWithType(styled, 'currentTimeLine', type)} style={dynamicStyle}>
      <div className={generateClassNameWithType(styled, 'line', type)} />
    </div>
  );
}

export default CurrentTimeLine;
