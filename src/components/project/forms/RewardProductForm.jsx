import { TextField, Button, Box, Stack, Typography } from '@mui/material'
import { ImgUploadBox, ModalBox, Stack2, AddButton } from '../../../styles/BaseStyles'
import { useCallback, useState } from 'react'
import { createRewardProductThunk } from '../../../features/rewardSlice'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

function RewardProductForm() {
   const { id } = useParams()
   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState('')
   const [title, setTitle] = useState('')
   const [contents, setContents] = useState('')
   const dispatch = useDispatch()

   const handleAddProduct = useCallback(() => {})

   const handleCreateProduct = useCallback(() => {
      const formData = new FormData()
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
            type: imgFile.type,
         })
         formData.append('image', encodedFile)
      }
      formData.append('title', title)
      formData.append('contents', contents)
      dispatch(createRewardProductThunk({ projectId: id, productData: formData }))
   }, [dispatch, title, contents, imgFile, id])

   return (
      <>
         <ModalBox openBtn={<AddButton handleAddItem={handleAddProduct} label={'구성품 추가'} />} closeBtn>
            <Stack spacing={3}>
               <ImgUploadBox setImgFile={setImgFile} imgUrl={imgUrl} setImgUrl={setImgUrl} />
               <TextField value={title} onChange={(e) => setTitle(e.target.value)} fullWidth label="구성품 이름을 적어주세요." />
               <TextField
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                  fullWidth
                  label="구성품에 대한 설명을 적어주세요."
                  rows={3}
                  multiline
               />
               <Button onClick={handleCreateProduct}>등록</Button>
            </Stack>
         </ModalBox>
         <Box>test</Box>
      </>
   )
}

export default RewardProductForm
