import { useCallback, useState } from 'react'
import ProjectInfoForm from './forms/ProjectInfoForm'
import ProjectDetailForm from './forms/ProjectDetailForm'
import ProjectRewardForm from './forms/ProjectRewardForm'
import ProjectBudgetForm from './forms/ProjectBudgetForm'
import { StepperTabs } from '../ui/Tabs'
import { useSelector } from 'react-redux'

function ProjectFormTab({ onSubmit, step }) {
   const { project } = useSelector((state) => state.project)

   const infoVals = {
      imgFile: null,
      imgUrl: project?.imgUrl ? process.env.REACT_APP_API_URL + '/projectImg/' + project.imgUrl : '',
      title: project?.title || '',
      intro: project?.intro || '',
      start: project?.startDate || null,
      end: project?.endDate || null,
   }

   const detailVals = {
      contents: project?.contents || '',
      products: project?.RewardProducts || [],
      schedule: project?.schedule || '',
   }

   const rewardVals = { rewards: project?.Rewards || [] }

   const budgetVals = {
      goal: project?.goal || 0,
      projectBudget: project?.ProjectBudgets || [],
      creatorBudget: project?.CreatorBudgets || [],
   }

   const saveInfoData = useCallback((date) => {
      onSubmit(date)
      step.current = 0
   }, [])

   const saveDetailData = useCallback((date) => {
      onSubmit(date)
      step.current = 1
   }, [])

   const saveRewardData = useCallback((date) => {
      onSubmit(date)
      step.current = 2
   }, [])

   const saveBudgetData = useCallback((date) => {
      onSubmit(date)
      step.current = 3
   }, [])

   const tabItems = [
      {
         label: '기본정보',
         page: <ProjectInfoForm initVals={infoVals} onSubmit={saveInfoData} />,
      },
      {
         label: '프로젝트 상세',
         page: <ProjectDetailForm initVals={detailVals} onSubmit={saveDetailData} />,
      },
      {
         label: '리워드 구성',
         page: <ProjectRewardForm initVals={rewardVals} onSubmit={saveRewardData} />,
      },
      {
         label: '예산계획',
         page: <ProjectBudgetForm initVals={budgetVals} onSubmit={saveBudgetData} />,
      },
      {
         label: '승인 요청',
         page: '',
      },
   ]

   return (
      <>
         <StepperTabs tabItems={tabItems} step={step} />
      </>
   )
}

export default ProjectFormTab
