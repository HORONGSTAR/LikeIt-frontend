import { useCallback, useState } from 'react'
import { Button, TextField, Typography, FormControl, MenuItem, Stack, Select, IconButton, InputAdornment, Chip } from '@mui/material'

import { Button, TextField, Typography, FormControl, MenuItem, Stack, Select, IconButton, InputAdornment } from '@mui/material'
import { Link as LinkIcon, RemoveCircleOutline } from '@mui/icons-material'
import { Stack2, ImgUploadBox } from '../../styles/BaseStyles'
import { FormGrid } from '../ui/FormGrid'
import { isBlank } from '../../util/isBlank'
import { useNavigate } from 'react-router-dom'
import { AddCircle } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStudioByIdThunk } from '../../features/studioSlice'

function StudioForm({ onSubmit, initVals = {} }) {
   const dispatch = useDispatch()
   const { studio } = useSelector((state) => state.studio)
   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState(initVals?.imgUrl ? process.env.REACT_APP_API_URL + '/studioImg/' + initVals.imgUrl : '')
   const [studioName, setStudioName] = useState(initVals?.name || '')
   const [intro, setIntro] = useState(initVals?.intro || '')
   const [snsLinks, setSnsLinks] = useState(initVals?.StudioAccounts || [])
   const [removeSns, setRemoveSns] = useState([])
   const navigate = useNavigate()

   const snsItems = [
      { value: 'INSTAGRAM', name: 'instagram' },
      { value: 'YOUTUBE', name: 'youtube' },
      { value: 'X', name: 'twitter' },
   ]

   const handleSnsChange = useCallback((index, field, value) => {
      setSnsLinks((prevLinks) => {
         const newLinks = [...prevLinks]
         newLinks[index] = { ...newLinks[index], [field]: value }
         return newLinks
      })
   }, [])

   const handleAddSns = useCallback(() => {
      setSnsLinks((prevLinks) => {
         if (prevLinks.length < 3) {
            return [...prevLinks, { type: 'INSTAGRAM', contents: '' }]
         }
         return prevLinks
      })
   }, [])

   const handleDeleteSns = useCallback(
      (idx) => {
         setSnsLinks((prevLinks) => {
            const newLinks = prevLinks.filter((_, index) => index !== idx)
            return newLinks
         })

         setRemoveSns((prevRemove) => {
            if (snsLinks[idx]?.id) return [...prevRemove, snsLinks[idx].id]
            return prevRemove
         })
      },
      [snsLinks]
   )

   const handleSubmit = useCallback(async () => {
      if (isBlank([studioName, intro, imgUrl])) return alert('양식을 모두 채워주세요.')
      if (isBlank(snsLinks.map((sns) => sns.contents))) return alert('SNS 링크를 입력해주세요.')

      const formData = new FormData()
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
            type: imgFile.type,
         })
         formData.append('image', encodedFile)
      }

      formData.append('name', studioName)
      formData.append('intro', intro)
      formData.append('account', JSON.stringify({ snsLinks, removeSns }))

      try {
         await onSubmit(formData)
         dispatch(fetchStudioByIdThunk(studio.id))
         navigate(`/studio/${studio.id}`)
      } catch (error) {
         console.error('업데이트 실패:', error)
      }
   }, [onSubmit, studioName, intro, imgUrl, snsLinks, imgFile, dispatch, studio?.id])

   const inputImg = (
      <ImgUploadBox setImgFile={setImgFile} setImgUrl={setImgUrl} imgUrl={imgUrl}>
         최대 10MB의 이미지 파일을 업로드해주세요. <br />
         1:1 비율을 추천드립니다.
      </ImgUploadBox>
   )

   const inputName = (
      <Stack2 justifyContent="end">
         <TextField
            type="text"
            fullWidth
            inputProps={{ maxLength: 30 }}
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            label="스튜디오의 이름을 지어주세요."
         />
         <Typography color="grey" variant="caption">
            최대 30자 ( {studioName.length} / 30 )
         </Typography>
      </Stack2>
   )

   const inputIntro = (
      <Stack2 justifyContent="end">
         <TextField
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 225 }}
            value={intro}
            rows={4}
            multiline
            onChange={(e) => setIntro(e.target.value)}
            label="스튜디오를 소개해주세요."
         />
         <Typography color="grey" variant="caption">
            최대 255자 ( {intro.length} / 255 )
         </Typography>
      </Stack2>
   )

   const snsSelectItems = snsItems.map((item) => (
      <MenuItem key={item.value} value={item.value}>
         <Stack2 spacing={0.5}>
            <img src={`/images/icon/${item.name}.svg`} height={16} />
            <Typography variant="body2">{item.name}</Typography>
         </Stack2>
      </MenuItem>
   ))

   const inputSns = (
      <Stack spacing={1}>
         {snsLinks.map((sns, index) => (
            <Stack2 spacing={1} key={index}>
               <FormControl sx={{ width: 130 }}>
                  <Select disabled={sns.id} value={sns.type} onChange={(e) => handleSnsChange(index, 'type', e.target.value)}>
                     {snsSelectItems}
                  </Select>
               </FormControl>
               <Stack2 sx={{ flexGrow: 1, width: 150 }}>
                  <TextField
                     fullWidth
                     disabled={sns.id}
                     placeholder="SNS 링크 입력"
                     value={sns.contents}
                     onChange={(e) => handleSnsChange(index, 'contents', e.target.value)}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <LinkIcon sx={{ opacity: sns.id && 0.5 }} />
                           </InputAdornment>
                        ),
                     }}
                  />
                  <IconButton onClick={() => handleDeleteSns(index)}>
                     <RemoveCircleOutline color="action" />
                  </IconButton>
               </Stack2>
            </Stack2>
         ))}
         {snsLinks.length < 3 && (
            <Chip
               sx={{ height: 40 }}
               icon={<AddCircle fontSize="small" />}
               variant="grey"
               onClick={handleAddSns}
               label={`SNS 계정 추가하기 (${snsLinks.length}/3)`}
            />
         )}
      </Stack>
   )

   return (
      <>
         <FormGrid
            formItems={[
               { name: '대표 이미지', input: inputImg },
               { name: '스튜디오 이름', input: inputName },
               { name: '스튜디오 소개', input: inputIntro },
               { name: 'SNS 계정', input: inputSns },
            ]}
         />
         <Stack2 justifyContent="end">
            <Button variant="contained" color="orenge" size="large" onClick={handleSubmit}>
               등록하기
            </Button>
            <Button variant="outlined" color="orenge" size="large" onClick={() => navigate(`/studio/${initVals?.id || ''}`)}>
               취소
            </Button>
         </Stack2>
      </>
   )
}

export default StudioForm
