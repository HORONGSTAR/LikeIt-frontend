import { Button, Card, IconButton, Grid2 } from '@mui/material'
import { Stack2 } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import EditRewardBox from './EditRewardBox'
import { AddCircle, Create, Delete } from '@mui/icons-material'
import { useCallback, useState } from 'react'

function ProjectRewardForm({ onSubmit, initVals = {} }) {
   const [rewards, setRewards] = useState(initVals.rewards)
   const [reward, setReward] = useState(null)
   const [open, setOpen] = useState(false)

   const handleSaveData = useCallback(() => {
      const formData = new FormData()

      formData.append('rewards', JSON.stringify({ rewards }))

      onSubmit(formData)
   }, [onSubmit, rewards])

   const ResetData = useCallback(() => {
      setReward({ price: 0, name: '', contents: '', stock: 0, limit: 0 })
      setOpen(true)
   }, [])

   const ChangeData = useCallback((reward) => {
      setOpen(true)
      setReward(reward)
   }, [])

   const addData = useCallback(
      (newReward) => {
         setRewards(rewards.concat(newReward))
      },
      [rewards]
   )

   const formItems = [
      {
         name: '후원 선물',
         input: (
            <>
               <Button startIcon={<AddCircle fontSize="small" />} onClick={() => ResetData(true)} variant="outlined">
                  후원 선물 추가
               </Button>
               <EditRewardBox open={open} setOpen={setOpen} reward={reward} products={initVals.products} addData={addData} />
            </>
         ),
      },
      {
         name: '선물 목록',
         input: (
            <Grid2 container columnSpacing={1.5} rowSpacing={{ sm: 3, xs: 1.5 }}>
               {rewards.map((reward) => (
                  <Grid2 key={reward.name} size={{ sm: 5, xs: 5 }}>
                     <Card variant="outlined">
                        <IconButton aria-label="수정" size="small" onClick={() => ChangeData(reward)}>
                           <Create fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="삭제" size="small">
                           <Delete fontSize="small" />
                        </IconButton>
                     </Card>
                  </Grid2>
               ))}
            </Grid2>
         ),
      },
   ]

   return (
      <>
         <FormGrid formItems={formItems} />
         <Stack2 justifyContent="end">
            <Button variant="contained" size="large" onClick={handleSaveData}>
               내용 저장하기
            </Button>
         </Stack2>
      </>
   )
}

export default ProjectRewardForm
