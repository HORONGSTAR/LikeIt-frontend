import { useState } from 'react'
import { Box, Tab, Chip, Stack } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Link, Element } from 'react-scroll'
import { Stack2 } from '../../styles/BaseStyles'

export const Tabs = ({ tabItems = [] }) => {
   const [value, setValue] = useState(tabItems[0]?.label)

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
         <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {tabItems.map((item) => (
                     <Tab key={'label' + item.label} label={item.label} value={item.label} />
                  ))}
               </TabList>
            </Box>
            {tabItems.map((item) => (
               <TabPanel sx={{ p: 1.5 }} key={'page' + item.label} value={item.label}>
                  {item.page}
               </TabPanel>
            ))}
         </TabContext>
      </Box>
   )
}

export const TabLink = ({ links = [] }) => {
   const [value, setValue] = useState(links[0]?.name)

   return (
      <Stack>
         <Stack2 spacing={1}>
            {links.map((link) => (
               <Link key={'link' + link.name} to={link.name}>
                  <Chip variant={value === link.name ? 'filled' : 'outlined'} label={link.name} onClick={() => setValue(link.name)} />
               </Link>
            ))}
         </Stack2>
         {links.map((link) => (
            <Element key={'element' + link.name} name={link.name}>
               {link.section}
            </Element>
         ))}
      </Stack>
   )
}
