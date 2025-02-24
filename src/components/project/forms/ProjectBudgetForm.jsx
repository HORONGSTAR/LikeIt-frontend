import { FormGrid } from '../../ui/FormGrid'
import { Stack2 } from '../../../styles/BaseStyles'
import { Button, InputBase, Divider, Card, Chip, Stack, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material'
import { AddCircle, RemoveCircleOutline } from '@mui/icons-material'
import { useCallback, useState } from 'react'

function ProjectBudgetForm({ onSubmit, initVals = {} }) {
   const [projBudg, setProjBudg] = useState([])
   const [removeProjBudg, setRemoveProjBudg] = useState([])
   const [creaBudg, setCreaBudg] = useState([])
   const [removeCreaBudg, setRemoveCreaBudg] = useState([])
   const [open, setOpen] = useState(false)

   const handleProjBudgChange = useCallback((index, field, value) => {
      setProjBudg((prevdBudget) => {
         const newBudget = [...prevdBudget]
         newBudget[index] = { ...newBudget[index], [field]: value }
         return newBudget
      })
   }, [])

   const handleAddProjBudg = useCallback(() => {
      setProjBudg((prevdBudget) => [...prevdBudget, { contents: '', money: 0 }])
   }, [])

   const handleDeleteProjBudg = useCallback(
      (idx) => {
         setProjBudg((prevdBudget) => {
            const newBudget = prevdBudget.filter((_, index) => index !== idx)
            return newBudget
         })

         setRemoveProjBudg((prevRemove) => {
            if (projBudg[idx]?.id) return [...prevRemove, projBudg[idx].id]
            return prevRemove
         })
      },
      [projBudg]
   )

   const handleCreaBudgChange = useCallback((index, field, value) => {
      setCreaBudg((prevdBudget) => {
         const newBudget = [...prevdBudget]
         newBudget[index] = { ...newBudget[index], [field]: value }
         return newBudget
      })
   }, [])

   const handleAddCreaBudg = useCallback(() => {
      setCreaBudg((prevdBudget) => [...prevdBudget, { contents: '', money: 0 }])
   }, [])

   const handleDeleteCreaBudg = useCallback(
      (idx) => {
         setCreaBudg((prevdBudget) => {
            const newBudget = prevdBudget.filter((_, index) => index !== idx)
            return newBudget
         })

         setRemoveCreaBudg((prevRemove) => {
            if (creaBudg[idx]?.id) return [...prevRemove, projBudg[idx].id]
            return prevRemove
         })
      },
      [creaBudg]
   )

   const handleSaveData = useCallback(async () => {
      const formData = new FormData()
      formData.append('projectBudget', JSON.stringify({ projBudg, removeProjBudg }))
      formData.append('creatorBudget', JSON.stringify({ creaBudg, removeCreaBudg }))
      onSubmit(formData)
   }, [onSubmit, projBudg, removeProjBudg, creaBudg, removeCreaBudg])

   const formItems = [
      {
         name: '프로젝트 예산',
         input: (
            <Stack spacing={1}>
               {projBudg.map((budget, index) => (
                  <Stack2 key={index} sx={{ width: '100%' }}>
                     <Card variant="outlined" sx={{ py: 1, px: 2, gap: 2, width: '100%' }}>
                        <InputBase fullWidth placeholder="예산 내용" value={budget.contents} onChange={(e) => handleProjBudgChange(index, 'contents', e.target.value)} />
                        <Divider orientation="vertical" flexItem />
                        <InputBase placeholder="비용" onChange={(e) => handleProjBudgChange(index, 'money', e.target.value)} />
                     </Card>
                     <IconButton onClick={() => handleDeleteProjBudg(index)}>
                        <RemoveCircleOutline color="action" />
                     </IconButton>
                  </Stack2>
               ))}
               <Chip sx={{ height: 40 }} icon={<AddCircle fontSize="small" />} variant="grey" label={'프로젝트 예산 항목 추가하기'} onClick={handleAddProjBudg} />
            </Stack>
         ),
      },
      {
         name: '창작자 인건비',
         input: (
            <Stack spacing={1}>
               {creaBudg.map((budget, index) => (
                  <Stack2 key={index} sx={{ width: '100%' }}>
                     <Card variant="outlined" sx={{ py: 1, px: 2, gap: 2, width: '100%' }}>
                        <InputBase placeholder="창작자" value={budget.contents} onClick={() => setOpen(true)} onChange={(e) => handleCreaBudgChange(index, 'contents', e.target.value)} />
                        <Divider orientation="vertical" flexItem />
                        <InputBase fullWidth placeholder="예산 내용" value={budget.contents} onChange={(e) => handleCreaBudgChange(index, 'contents', e.target.value)} />
                        <Divider orientation="vertical" flexItem />
                        <InputBase placeholder="비용" onChange={(e) => handleCreaBudgChange(index, 'money', e.target.value)} />
                     </Card>
                     <IconButton onClick={() => handleDeleteCreaBudg(index)}>
                        <RemoveCircleOutline color="action" />
                     </IconButton>
                  </Stack2>
               ))}
               <Chip sx={{ height: 40 }} icon={<AddCircle fontSize="small" />} variant="grey" label={'창작자 인건비 항목 추가하기'} onClick={handleAddCreaBudg} />
               <Dialog open={open}>
                  <DialogTitle>창작자 선택</DialogTitle>
                  <DialogContent> </DialogContent>
                  <DialogActions>
                     <Button onClick={() => setOpen(false)}>취소</Button>
                     <Button>확인</Button>
                  </DialogActions>
               </Dialog>
            </Stack>
         ),
      },
      {
         name: '펀딩 목표 금액',
         input: (
            <Stack spacing={1}>
               <List sx={{ border: '1px solid #ccc', borderRadius: 3 }}>
                  <ListItem>
                     <ListItemText>프로젝트 예산</ListItemText>
                     <ListItemText>프로젝트 예산</ListItemText>
                  </ListItem>
                  <ListItem>
                     <ListItemText>창작자 인건비</ListItemText>
                     <ListItemText>창작자 인건비</ListItemText>
                  </ListItem>
                  <ListItem>
                     <ListItemText>예비 비용</ListItemText>
                     <ListItemText>예비 비용</ListItemText>
                  </ListItem>
                  <Divider component="li" variant="middle" />
                  <ListItem>
                     <ListItemText>전체 예산</ListItemText>
                     <ListItemText>전체 예산</ListItemText>
                  </ListItem>
               </List>
               <List sx={{ border: '1px solid #ccc', borderRadius: 3 }}>
                  <ListItem>플랫폼 수수료</ListItem>
                  <ListItem>부가가치세</ListItem>
                  <Divider component="li" variant="middle" />
                  <ListItem>전체수수료</ListItem>
               </List>
            </Stack>
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

export default ProjectBudgetForm
