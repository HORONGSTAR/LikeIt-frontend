import { useCallback, useRef, useState } from 'react'
import ProjectInfoForm from './forms/ProjectInfoForm'
import ProjectRewardForm from './forms/ProjectRewardForm'
import ProjectBudgetForm from './forms/ProjectBudgetForm'
import ApprovaForm from './forms/ApprovaForm'
import { StepperTabs } from '../ui/Tabs'
import { isBlank } from '../../util/isBlank'
import { Snackbar } from '@mui/material'

function ProjectFormTab({ onSubmit, step, project }) {
   const [products, setProducts] = useState(project?.RewardProducts || [])
   const [rewards, setRewards] = useState(project?.Rewards || [])
   const [open, setOpen] = useState(false)

   const isSave = useRef(true)

   const infoVals = {
      imgFile: null,
      imgUrl: project?.imgUrl ? process.env.REACT_APP_API_URL + '/projectImg' + project.imgUrl : '',
      title: project?.title || '',
      intro: project?.intro || '',
      contents: project?.contents || '',
      start: project?.startDate || null,
      end: project?.endDate || null,
      schedule: project?.schedule || '',
   }

   const rewardVals = {
      products,
      rewards,
      setProducts,
      setRewards,
   }

   const budgetVals = {
      goal: project?.goal || 0,
      projBudg: project?.ProjectBudgets || [],
      creaBudg: project?.CreatorBudgets || [],
      studioId: project?.studioId,
   }

   const saveInfoData = useCallback(
      (date) => {
         onSubmit(date)
         step.current = 0
         isSave.current = true
      },
      [onSubmit, step, isSave]
   )

   const saveBudgetData = useCallback(
      (date) => {
         onSubmit(date)
         step.current = 2
         isSave.current = true
      },
      [onSubmit, step, isSave]
   )

   const sendApproval = useCallback(() => {
      const { imgUrl, title, intro, contents, start, end, schedule } = infoVals
      const { goal, projBudg, creaBudg } = budgetVals
      const step1 = isBlank([imgUrl, title, intro, contents, start, end, schedule])
      const step2 = rewards.length
      const step3 = isBlank([goal, projBudg, creaBudg])
      if (!step1 || !step2 || !step3) return setOpen(true)
      onSubmit({ proposalStatus: 'REVIEW_REQ' })
      step.current = 3
   }, [onSubmit, step, infoVals, budgetVals, rewards])

   const tabItems = [
      {
         label: '기본 정보',
         page: <ProjectInfoForm isSave={isSave} initVals={infoVals} onSubmit={saveInfoData} />,
      },
      {
         label: '선물 구성',
         page: <ProjectRewardForm initVals={rewardVals} />,
      },
      {
         label: '예산 계획',
         page: <ProjectBudgetForm isSave={isSave} initVals={budgetVals} onSubmit={saveBudgetData} />,
      },
      {
         label: '승인 요청',
         page: <ApprovaForm onSubmit={sendApproval} />,
      },
   ]

   return (
      <>
         <StepperTabs tabItems={tabItems} step={step} isSave={isSave} />
         <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message="모든 항목을 입력해주세요." />
      </>
   )
}

export default ProjectFormTab
