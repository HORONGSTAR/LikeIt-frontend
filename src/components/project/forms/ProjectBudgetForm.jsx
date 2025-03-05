import { FormGrid } from '../../ui/FormGrid'
import { Stack2 } from '../../../styles/BaseStyles'
import { Button, InputBase, Divider, Card, Chip, Stack, IconButton, List, ListItem, ListItemText, Typography, Box } from '@mui/material'
import { AddCircle, RemoveCircleOutline } from '@mui/icons-material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCreatorsThunk } from '../../../features/creatorSlice'
import { formatWithComma, stripComma } from '../../../util/priceSet'
import CreatorPicker from './CreatorPicker'

function ProjectBudgetForm({ onSubmit, initVals = {} }) {
   const [projBudg, setProjBudg] = useState(initVals.projBudg)
   const [removeProjBudg, setRemoveProjBudg] = useState([])
   const [creaBudg, setCreaBudg] = useState(initVals.creaBudg)
   const [removeCreaBudg, setRemoveCreaBudg] = useState([])
   const [open, setOpen] = useState(-1)
   const [creators, setCreators] = useState([])
   const [names, setNames] = useState({})
   const [goal, setGoal] = useState(initVals.goal)

   const handleSaveData = useCallback(async () => {
      const formData = new FormData()
      formData.append('projBudg', JSON.stringify({ projBudg, removeProjBudg }))
      formData.append('creaBudg', JSON.stringify({ creaBudg, removeCreaBudg }))
      formData.append('goal', goal)
      onSubmit(formData)
   }, [onSubmit, goal, projBudg, removeProjBudg, creaBudg, removeCreaBudg])

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(fetchCreatorsThunk(initVals.studioId))
         .unwrap()
         .then((result) => {
            setCreators(result.creators)
            const nameList = {}
            result.creators.forEach((creator) => (nameList[creator.id] = creator.Creator.User.name))
            setNames(nameList)
         })
         .catch()
   }, [initVals.studioId])

   const handleProjBudgChange = useCallback((index, field, value) => {
      let newValue = value
      if (field === 'money') {
         newValue = stripComma(newValue)
         const isNumric = /^\d*$/
         if (!isNumric.test(newValue)) return
      }

      setProjBudg((prevdBudget) => {
         const newBudget = [...prevdBudget]
         newBudget[index] = { ...newBudget[index], [field]: newValue }
         return newBudget
      })
   }, [])

   const handleAddProjBudg = useCallback(() => {
      setProjBudg((prevdBudget) => [...prevdBudget, { contents: '', money: '', id: null }])
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
      setCreaBudg((prevdBudget) => [...prevdBudget, { contents: '', money: '', id: null }])
   }, [])

   const handleDeleteCreaBudg = useCallback(
      (idx) => {
         setCreaBudg((prevdBudget) => {
            const newBudget = prevdBudget.filter((_, index) => index !== idx)
            return newBudget
         })

         setRemoveCreaBudg((prevRemove) => {
            if (creaBudg[idx]?.id) return [...prevRemove, creaBudg[idx].id]
            return prevRemove
         })
      },
      [creaBudg]
   )

   const projBudgSum = useMemo(() => {
      let result = 0
      projBudg.forEach((budget) => (result += Number(budget.money)))
      return result
   }, [projBudg])

   const creaBudgSum = useMemo(() => {
      let result = 0
      creaBudg.forEach((budget) => (result += Math.floor(projBudgSum * (Number(budget.money) / 100))))
      return result
   }, [creaBudg])

   const result = useMemo(() => {
      let bufferCost = Math.floor((projBudgSum + creaBudgSum) * 0.1)
      let allBudget = projBudgSum + creaBudgSum + bufferCost
      let charge = Math.floor(allBudget * 0.08)
      let duty = Math.floor(allBudget * 0.1)
      let allCharge = charge + duty
      let goal = allBudget - allCharge
      setGoal(goal)

      return { bufferCost, allBudget, charge, duty, allCharge }
   }, [projBudgSum, creaBudgSum])

   const formItems = [
      {
         name: '프로젝트 예산',
         input: (
            <Stack spacing={1}>
               {projBudg.map((budget, index) => (
                  <Stack2 key={'projBudg' + index} sx={{ width: '100%' }}>
                     <Card variant="outlined" sx={{ py: 1, px: 2, gap: 2, width: '100%' }}>
                        <InputBase fullWidth placeholder="예산 내용" value={budget.contents} onChange={(e) => handleProjBudgChange(index, 'contents', e.target.value)} />
                        <Divider orientation="vertical" flexItem />
                        <InputBase placeholder="비용" value={formatWithComma(String(budget.money))} onChange={(e) => handleProjBudgChange(index, 'money', e.target.value)} />
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
                  <Stack2 key={'creaBudg' + index} sx={{ width: '100%' }}>
                     <Card variant="outlined" sx={{ py: 1, px: 2, gap: 2, width: '100%' }}>
                        <InputBase readOnly placeholder="창작자" value={names[budget.studioCreatorId] || ''} onClick={() => setOpen(index)} onChange={(e) => handleCreaBudgChange(index, 'contents', e.target.value)} />
                        <Divider orientation="vertical" flexItem />
                        <InputBase fullWidth placeholder="예산 내용" value={budget.contents} onChange={(e) => handleCreaBudgChange(index, 'contents', e.target.value)} />
                        <Divider orientation="vertical" flexItem />
                        <InputBase placeholder="비율" value={budget.money} onChange={(e) => handleCreaBudgChange(index, 'money', e.target.value)} />
                     </Card>
                     <IconButton onClick={() => handleDeleteCreaBudg(index)}>
                        <RemoveCircleOutline color="action" />
                     </IconButton>
                  </Stack2>
               ))}
               <Chip sx={{ height: 40 }} icon={<AddCircle fontSize="small" />} variant="grey" label={'창작자 인건비 항목 추가하기'} onClick={handleAddCreaBudg} />
               <CreatorPicker setOpen={setOpen} open={open} members={creators} handleClick={handleCreaBudgChange} />
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
                     {formatWithComma(String(projBudgSum))} 원
                  </ListItem>
                  <ListItem>
                     <ListItemText>창작자 인건비</ListItemText>
                     {formatWithComma(String(creaBudgSum))}원
                  </ListItem>
                  <ListItem>
                     <ListItemText>예비 비용</ListItemText>
                     {formatWithComma(String(result.bufferCost))}
                     {} 원
                  </ListItem>
                  <Divider component="li" variant="middle" />
                  <ListItem>
                     <ListItemText>전체 예산</ListItemText>
                     {formatWithComma(String(result.allBudget))}원
                  </ListItem>
               </List>
               <List sx={{ border: '1px solid #ccc', borderRadius: 3 }}>
                  <ListItem>
                     <ListItemText>플랫폼 수수료</ListItemText>
                     {formatWithComma(String(result.charge))}원
                  </ListItem>
                  <ListItem>
                     <ListItemText>부가가치세</ListItemText>
                     {formatWithComma(String(result.duty))}원
                  </ListItem>
                  <Divider component="li" variant="middle" />
                  <ListItem>
                     <ListItemText>전체수수료</ListItemText>
                     {formatWithComma(String(result.allCharge))}원
                  </ListItem>
               </List>
               <Typography align="end">목표 금액 달성시 예상 수령 금액</Typography>
               <Typography align="end" fontSize={24}>
                  {formatWithComma(String(goal))}원
               </Typography>
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
