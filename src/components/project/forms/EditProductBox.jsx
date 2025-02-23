import { TextField, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ImgUploadBox } from '../../../styles/BaseStyles'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createProductThunk, updateProductThunk } from '../../../features/rewardSlice'
import { useParams } from 'react-router-dom'
import { isBlank } from '../../../util/isBlank'

function EditProductBox({ open, setOpen, product, setProducts }) {
   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState('')
   const [title, setTitle] = useState('')
   const [contents, setContents] = useState('')
   const { id } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
      setImgFile(null)
      setImgUrl(product?.imgUrl && process.env.REACT_APP_API_URL + '/rewardProduct/' + product.imgUrl)
      setTitle(product?.title)
      setContents(product?.contents)
   }, [product])

   const handleSubmit = useCallback(() => {
      if (isBlank([imgUrl, title, contents])) return
      const formData = new FormData()
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
            type: imgFile.type,
         })
         formData.append('image', encodedFile)
      }
      formData.append('title', title)
      formData.append('contents', contents)

      if (product?.id) {
         dispatch(updateProductThunk({ productId: product.id, productData: formData }))
            .unwrap()
            .then((result) => {
               setProducts(result.products)
            })
            .catch()
      } else {
         dispatch(createProductThunk({ projectId: id, productData: formData }))
            .unwrap()
            .then((result) => {
               setProducts(result.products)
            })
            .catch()
      }
      setOpen(false)
   }, [dispatch, setOpen, setProducts, product?.id, id, imgUrl, imgFile, title, contents])

   return (
      <Dialog open={open}>
         <DialogTitle>선물 구성품 추가</DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
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
            </Stack>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => setOpen(false)}>취소</Button>
            <Button color="orenge" onClick={handleSubmit}>
               확인
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export default EditProductBox
