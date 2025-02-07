import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useNavigate, useLocation } from 'react-router-dom'

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
   const navigate = useNavigate()
   const location = useLocation()

   // 현재 URL이 tabs의 path와 일치하는 인덱스를 찾음
   const currentTab = tabs.findIndex((tab) => location.pathname.startsWith(tab.path))
   const [value, setValue] = React.useState(currentTab !== -1 ? currentTab : 0)

   const handleChange = (event, newValue) => {
      setValue(newValue)
      navigate(tabs[newValue].path) // ✅ 클릭 시 해당 path로 이동
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
