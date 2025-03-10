import { useCallback, useState } from 'react'
import { Box, Tab, Chip, Stack, Stepper, Step, StepButton, StepConnector } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Link, Element } from 'react-scroll'
import { Stack2 } from '../../styles/BaseStyles'

export const Tabs = ({ tabItems = [], sx = {} }) => {
   const [value, setValue] = useState(tabItems[0]?.label)

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }

   return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
         <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <TabList onChange={handleChange} aria-label="tabs" sx={sx}>
                  {tabItems.map((item) => (
                     <Tab key={'label' + item.label} label={item.label} value={item.label} sx={sx} />
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

export const StepperTabs = ({ tabItems = [], step, completed }) => {
   const [activeStep, setActiveStep] = useState(step.current)

   const handleStep = useCallback((step) => {
      setActiveStep(step)
   }, [])

   return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
         <TabContext value={activeStep}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', py: 3 }}>
               <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={<StepConnector sx={{ top: 0 }} />}>
                  {tabItems.map((item, index) => (
                     <Step key={'label' + item.label} completed={completed[index]}>
                        <StepButton sx={{ display: 'inline-block', py: 1.2, wordBreak: 'keep-all' }} color="inherit" onClick={() => handleStep(index)}>
                           {item.label}
                        </StepButton>
                     </Step>
                  ))}
               </Stepper>
            </Box>
            {tabItems.map((item, index) => (
               <TabPanel sx={{ px: 1.5, py: 6 }} key={'page' + item.label} value={index}>
                  {item.page}
               </TabPanel>
            ))}
         </TabContext>
      </Box>
   )
}
