import React from 'react'
import { Timeline } from '@mui/lab'
import TimelineEvent from './TimelineEvent'

const TimelineList = ({ events }) => {
   return (
      <Timeline>
         {events.map((event, index) => (
            <TimelineEvent key={index} {...event} isLast={index === events.length - 1} />
         ))}
      </Timeline>
   )
}

export default TimelineList
