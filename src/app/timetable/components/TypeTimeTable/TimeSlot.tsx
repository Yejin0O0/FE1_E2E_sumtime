import { useContext } from 'react';
import { getHourAndMinutesFormat, generateClassNameWithType } from '../../utils';
import { TypeContext } from '../../TypeContext';
import styles from './TypeTimeTable.module.scss';

interface TimeSlotProps {
  headerDate: Date;
  timeSlotStyle: React.CSSProperties;
}

function TimeSlot({ headerDate, timeSlotStyle }: TimeSlotProps) {
  const type = useContext(TypeContext);
  const currentTime = getHourAndMinutesFormat(headerDate);
  const timeSlotLayout = generateClassNameWithType(styles, 'timeSlotLayout', type);
  const title = generateClassNameWithType(styles, 'title', type);

  return (
    <div className={`${timeSlotLayout} ${title}`} style={timeSlotStyle}>
      <p className={generateClassNameWithType(styles, 'headerDate', type)}>{currentTime}</p>
    </div>
  );
}

export default TimeSlot;
