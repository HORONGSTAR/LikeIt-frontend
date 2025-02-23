import { TextField, Button, Box, Stack, Typography } from '@mui/material'
import { ImgUploadBox, ModalBox, Stack2, AddButton } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import { useCallback, useState } from 'react'
import RewardProductForm from './RewardProductForm'

function ProjectDetailForm({ onSubmit, initVals = {} }) {
   const [contents, setContents] = useState(initVals.contents)
   const [products, setProducts] = useState(initVals.products)
   const [schedule, setSchedule] = useState(initVals.schedule)
   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState(initVals.imgUrl)

   const handleSaveData = useCallback(() => {
      const formData = new FormData()
      formData.append('contents', contents)
      formData.append('schedule', schedule)

      onSubmit(formData)
   }, [onSubmit, contents, schedule])

   const formItems = [
      {
         name: '프로젝트 소개',
         input: (
            <TextField
               value={contents}
               onChange={(e) => setContents(e.target.value)}
               fullWidth
               label="프로젝트의 기획 의도나 배경 등 전체적인 소개를 적어주세요."
            />
         ),
      },
      {
         name: '선물 구성품',
         input: <RewardProductForm />,
      },
      {
         name: '일정 안내',
         input: (
            <TextField
               fullWidth
               value={schedule}
               onChange={(e) => setSchedule(e.target.value)}
               label="결제 예정일이나 발송 예정일등 프로젝트 진행 일정을 적어주세요."
            />
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

   return <></>
}

export default ProjectDetailForm
