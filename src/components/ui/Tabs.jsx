import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

function CustomTabPanel(props) {
   const { children, value, index, ...other } = props

   return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
   )
}

CustomTabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
}

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   }
}

export default function BasicTabs({ tabs }) {
   const [value, setValue] = React.useState(0)

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   return (
      <Box sx={{ maxWidth: '1200px', width: '100%', margin: 'auto' }}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-start' }}>
            <Tabs value={value} onChange={handleChange} aria-label="custom tabs" variant="scrollable" scrollButtons="auto" sx={{ minWidth: '400px' }}>
               {tabs.map((tab, index) => (
                  <Tab key={index} label={tab.label} {...a11yProps(index)} />
               ))}
            </Tabs>
         </Box>
         {tabs.map((tab, index) => (
            <CustomTabPanel key={index} value={value} index={index}>
               {tab.content}
            </CustomTabPanel>
         ))}
      </Box>
   )
}
