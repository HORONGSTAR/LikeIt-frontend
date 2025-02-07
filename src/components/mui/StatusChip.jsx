import React from 'react'
import { Chip } from '@mui/material'

const StatusChip = ({ label, bgColor = '#4caf50', textColor = 'white' }) => {
   return (
      <Chip
         label={label}
         sx={{
            bgcolor: bgColor,
            color: textColor,
            fontWeight: 'bold',
            fontSize: '14px',
            px: 1.5,
            py: 0.5,
            borderRadius: '50px',
         }}
      />
   )
}

export default StatusChip
