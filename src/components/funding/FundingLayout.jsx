import React from 'react'
import { Box } from '@mui/material'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import BasicTabs from '../mui/Tabs'

const FundingLayout = () => {
   const navigate = useNavigate()
   const location = useLocation()

   // 공통 탭 목록
   const tabs = [
      { label: '프로젝트 소개', path: '/funding/detail' },
      { label: '진행 소식', path: '/funding/timeline' },
      { label: '후기', path: '/funding/review' },
   ]

   return (
      <Box sx={{ maxWidth: '1000px', margin: 'auto', mt: 5 }}>
         {/* 공통 탭 UI */}
         <BasicTabs tabs={tabs} currentPath={location.pathname} onChange={(path) => navigate(path)} />

         {/* 선택한 탭의 내용이 여기에서 렌더링됨 */}
         <Outlet />
      </Box>
   )
}

export default FundingLayout
