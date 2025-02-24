import { useCallback, useRef, useState } from 'react'
import ProjectInfoForm from './forms/ProjectInfoForm'
import ProjectRewardForm from './forms/ProjectRewardForm'
import ProjectBudgetForm from './forms/ProjectBudgetForm'
import { StepperTabs } from '../ui/Tabs'

function ProjectFormTab({ onSubmit, step, project }) {
   const [products, setProducts] = useState(project?.RewardProducts || [])
   const [rewards, setRewards] = useState(project?.Rewards || [])

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
      projectBudget: project?.ProjectBudgets || [],
      creatorBudget: project?.CreatorBudgets || [],
   }

   const saveInfoData = useCallback(
      (date) => {
         onSubmit(date)
         step.current = 0
         isSave.current = true
      },
      [onSubmit, step, isSave]
   )

   const saveRewardData = useCallback(
      (date) => {
         onSubmit(date)
         step.current = 1
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
         page: '',
      },
   ]

   return (
      <>
         <StepperTabs tabItems={tabItems} step={step} isSave={isSave} />
      </>
   )
}

export default ProjectFormTab
