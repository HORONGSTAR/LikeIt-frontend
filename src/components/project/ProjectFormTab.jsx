import { useCallback, useMemo, useState } from 'react'
import ProjectInfoForm from './forms/ProjectInfoForm'
import ProjectRewardForm from './forms/ProjectRewardForm'
import ProjectBudgetForm from './forms/ProjectBudgetForm'
import ApprovaForm from './forms/ApprovaForm'
import { StepperTabs } from '../ui/Tabs'
import { isBlank } from '../../util/isBlank'
import { Snackbar, Alert } from '@mui/material'

function ProjectFormTab({ onSubmit, step, project }) {
   const [products, setProducts] = useState(project?.RewardProducts || [])
   const [rewards, setRewards] = useState(project?.Rewards || [])
   const [alert, setAlert] = useState(false)

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
      },
      [onSubmit, step]
   )

   const saveBudgetData = useCallback(
      (date) => {
         onSubmit(date)
         step.current = 2
      },
      [onSubmit, step]
   )

   const completed = useMemo(() => {
      const { imgUrl, title, intro, contents, start, end, schedule } = infoVals
      const { projBudg, creaBudg } = budgetVals
      const step1 = isBlank([imgUrl, title, intro, contents, start, end, schedule])
      const step2 = rewards.length
      const step3 = projBudg.length && creaBudg.length

      return { 0: step1, 1: step2, 2: step3 }
   }, [infoVals, budgetVals, rewards])

   const sendApproval = useCallback(() => {
      if (!completed[0] || !completed[1] || !completed[2]) return setAlert(true)
      onSubmit({ proposalStatus: 'REVIEW_REQ' })
      step.current = 3
   }, [onSubmit, step, completed])

   const tabItems = [
      {
         label: '기본 정보',
         page: <ProjectInfoForm initVals={infoVals} onSubmit={saveInfoData} />,
      },
      {
         label: '선물 구성',
         page: <ProjectRewardForm initVals={rewardVals} />,
      },
      {
         label: '예산 계획',
         page: <ProjectBudgetForm initVals={budgetVals} onSubmit={saveBudgetData} />,
      },
      {
         label: '승인 요청',
         page: <ApprovaForm proposalStatus={project?.proposalStatus} onSubmit={sendApproval} />,
      },
   ]

   return (
      <>
         <StepperTabs tabItems={tabItems} step={step} completed={completed} />
         <Snackbar open={alert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={() => setAlert(false)}>
            <Alert onClose={() => setAlert(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
               모든 항목을 채워주세요.
            </Alert>
         </Snackbar>
      </>
   )
}

export default ProjectFormTab
