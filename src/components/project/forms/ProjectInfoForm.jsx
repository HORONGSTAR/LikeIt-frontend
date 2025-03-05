import { TextField, Button, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { ImgUploadBox, Stack2 } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import { useCallback, useEffect, useRef, useState } from 'react'
import DateRangePickers from './DateRangePickers'
import dayjs from 'dayjs'

function ProjectInfoForm({ onSubmit, initVals = {} }) {
   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState(initVals.imgUrl)
   const [title, setTitle] = useState(initVals.title)
   const [intro, setIntro] = useState(initVals.intro)
   const [contents, setContents] = useState(initVals.contents)
   const [term, setTerm] = useState({ start: dayjs(initVals.start), end: dayjs(initVals.end) })
   const [schedule, setSchedule] = useState(initVals.schedule)
   const [categoryId, setCategoryId] = useState(initVals.categoryId)

   const handleSaveData = useCallback(() => {
      const formData = new FormData()
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
            type: imgFile.type,
         })
         formData.append('image', encodedFile)
      }
      formData.append('title', title)
      formData.append('intro', intro)
      formData.append('contents', contents)
      formData.append('startDate', term.start)
      formData.append('endDate', term.end)
      formData.append('schedule', schedule)
      formData.append('categoryId', categoryId)

      onSubmit(formData)
   }, [onSubmit, imgUrl, imgFile, title, intro, contents, term, schedule, categoryId])

   const formItems = [
      {
         name: '대표 이미지',
         input: <ImgUploadBox setImgFile={setImgFile} setImgUrl={setImgUrl} imgUrl={imgUrl} />,
      },
      {
         name: '기본 정보',
         input: (
            <Stack spacing={4}>
               <TextField value={title} onChange={(e) => setTitle(e.target.value)} fullWidth label="프로젝트 제목" />
               <TextField fullWidth value={intro} onChange={(e) => setIntro(e.target.value)} label="한줄 소개" />
               <TextField value={contents} onChange={(e) => setContents(e.target.value)} fullWidth rows={3} multiline label="기획 의도" helperText="기획 의도나 배경 등 전체적인 개요를 적어주세요." />
               <FormControl sx={{ width: '20%', minWidth: '120px' }}>
                  <InputLabel id="category">카테고리</InputLabel>
                  <Select labelId="category" value={categoryId} label="categoryId" onChange={(e) => setCategoryId(e.target.value)}>
                     <MenuItem value={1}>푸드</MenuItem>
                     <MenuItem value={2}>반려동물</MenuItem>
                     <MenuItem value={3}>그림</MenuItem>
                     <MenuItem value={4}>도서</MenuItem>
                     <MenuItem value={5}>뷰티</MenuItem>
                     <MenuItem value={6}>의류</MenuItem>
                     <MenuItem value={7}>리빙</MenuItem>
                     <MenuItem value={8}>사진</MenuItem>
                     <MenuItem value={9}>공연</MenuItem>
                  </Select>
               </FormControl>
            </Stack>
         ),
      },
      {
         name: '펀딩 일정',
         input: (
            <Stack spacing={4}>
               <DateRangePickers setTerm={setTerm} term={term} />
               <TextField fullWidth value={schedule} onChange={(e) => setSchedule(e.target.value)} rows={3} multiline label="일정 안내" helperText="결제 예정일이나 발송 예정일등 프로젝트 진행 일정을 적어주세요." />
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

export default ProjectInfoForm
