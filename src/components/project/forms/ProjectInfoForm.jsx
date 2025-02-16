import { TextField, Grid2, Typography, Button, Divider } from '@mui/material'
import { Dot, ImgUploadBox, Stack2 } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import { isBlank } from '../../../util/isBlank'

import { useCallback, useState } from 'react'
import DateRangePickers from './DateRangePickers'

function ProjectInfoForm() {
   const [imgFile, setImgFile] = useState(null)
   const [title, setTitle] = useState(null)
   const [intro, setIntro] = useState(null)
   const [term, setTerm] = useState({ start: null, end: null })
   const { start, end } = term

   const handleSubmit = useCallback(() => {
      if (isBlank([imgFile, title, intro, start, end])) {
      }
   }, [imgFile, title, intro, start, end])

   const formItems = [
      {
         name: '대표 이미지',
         input: <ImgUploadBox setImgFile={setImgFile} />,
      },
      {
         name: '프로젝트 제목',
         input: (
            <TextField
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               fullWidth
               label="프로젝트 제목을 입력하세요."
            />
         ),
      },
      {
         name: '한줄 소개',
         input: (
            <TextField
               fullWidth
               value={intro}
               onChange={(e) => setIntro(e.target.value)}
               label="프로젝트 한줄 소개를 작성하세요."
            />
         ),
      },
      {
         name: '펀딩 일정',
         input: <DateRangePickers setTerm={setTerm} />,
      },
   ]

   return (
      <>
         <FormGrid formItems={formItems} />
         <Stack2 justifyContent="end">
            <Button variant="contained" size="large" onClick={handleSubmit}>
               내용 저장하기
            </Button>
         </Stack2>
      </>
   )
}

export default ProjectInfoForm
