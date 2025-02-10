import React from 'react'
import { Box, Typography, Avatar, Button, CardMedia, Stack } from '@mui/material'

const FundingOverview = ({ project }) => {
   if (!project) {
      return <Typography>프로젝트 정보를 불러오는 중...</Typography>
   }

   return <p>후원</p>
}

export default FundingOverview
