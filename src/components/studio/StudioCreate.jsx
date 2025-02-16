import React, { useCallback, useRef, useState } from 'react'
import { Button, TextField, Typography, FormControl, MenuItem, Stack, Select, IconButton, Chip } from '@mui/material'
import { Link as LinkIcon, Image as ImageIcon, AddCircle, RemoveCircleOutline } from '@mui/icons-material'
import { Stack2, Main, ImgUploadBox } from '../../styles/BaseStyles'
import { FormGrid } from '../ui/FormGrid'

function StudioCreate({ onSubmit, initVals = {} }) {
   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState(initVals.imgUrl || '')
   const [studioName, setStudioName] = useState(initVals.name || '')
   const [intro, setIntro] = useState(initVals.intro || '')
   const [snsLinks, setSnsLinks] = useState(initVals.sns || [])
   const snsItemId = useRef(1)

   const snsItems = [
      { value: 'INSTAGRAM', name: 'instagram' },
      { value: 'YOUTUBE', name: 'youtube' },
      { value: 'X', name: 'twitter' },
   ]

   const handleSnsChange = (index, field, value) => {
      const newSnsLinks = [...snsLinks]
      newSnsLinks[index][field] = value
      setSnsLinks(newSnsLinks)
   }

   const handleAddSns = useCallback(() => {
      if (snsLinks.length < 3) setSnsLinks(snsLinks.concat({ id: snsItemId.current, platform: null, link: null }))
      snsItemId.current += 1
   }, [snsLinks])

   const handleDeleteSns = useCallback(
      (id) => {
         setSnsLinks(snsLinks.filter((sns) => sns.id !== id))
      },
      [snsLinks]
   )

   const handleCreateStudio = () => {
      if (!studioName.trim()) {
         alert('스튜디오 이름을 입력해주세요.')
         return
      }
      const studioData = {
         name: studioName,
         intro,
         imgUrl,
         snsLinks: snsLinks.filter((sns) => sns.link.trim() !== ''),
      }
      onSubmit(studioData)
   }

   const sns = (
      <Stack spacing={1}>
         {snsLinks.map((sns, index) => (
            <Stack2 spacing={1} key={sns.id}>
               <FormControl sx={{ width: 130 }}>
                  <Select value={sns.platform} onChange={(e) => handleSnsChange(index, 'platform', e.target.value)}>
                     {snsItems.map((item) => (
                        <MenuItem icon value={item.value}>
                           <Stack2 spacing={0.5}>
                              <img src={`/images/icon/${item.name}.svg`} height={16} />
                              <Typography variant="body2">{item.name}</Typography>
                           </Stack2>
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
               <Stack2 sx={{ flexGrow: 1 }}>
                  <TextField
                     fullWidth
                     placeholder="SNS 링크 입력"
                     value={sns.link}
                     onChange={(e) => handleSnsChange(index, 'link', e.target.value)}
                     InputProps={{
                        startAdornment: <LinkIcon color="action" />,
                     }}
                  />
                  <IconButton onClick={() => handleDeleteSns(sns.id)}>
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

   const formItems = [
      {
         name: '대표 이미지',
         input: (
            <ImgUploadBox setImgFile={setImgFile}>
               최대 10MB의 이미지 파일을 업로드해주세요. <br />
               1:1 비율을 추천드립니다.
            </ImgUploadBox>
         ),
      },
      {
         name: '스튜디오 이름',
         input: (
            <TextField
               type="text"
               fullWidth
               inputProps={{ maxLength: 30 }}
               value={studioName}
               onChange={(e) => setStudioName(e.target.value)}
               placeholder="스튜디오의 이름을 지어주세요. (최대 30자)"
               helperText={<Stack2 justifyContent="end">{studioName.length} / 30</Stack2>}
            />
         ),
      },
      {
         name: '스튜디오 소개',
         input: (
            <TextField
               variant="outlined"
               fullWidth
               inputProps={{ maxLength: 225 }}
               value={intro}
               rows={4}
               multiline
               onChange={(e) => setIntro(e.target.value)}
               placeholder="스튜디오를 소개해주세요. (최대 255자)"
               helperText={<Stack2 justifyContent="end">{intro.length} / 255</Stack2>}
            />
         ),
      },
      { name: 'SNS 연동', input: sns },
   ]

   return (
      <Main>
         <Typography variant="h5" mb={2}>
            스튜디오 만들기
         </Typography>
         <FormGrid formItems={formItems} />

         <Stack2 justifyContent="end">
            <Button variant="contained" color="orenge" size="large">
               등록하기
            </Button>
            <Button variant="outlined" color="orenge" size="large">
               취소
            </Button>
         </Stack2>
      </Main>
   )
}

export default StudioCreate
