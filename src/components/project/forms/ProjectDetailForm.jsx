import { TextField, Button, IconButton, Chip, Stack } from '@mui/material'
import { Stack2 } from '../../../styles/BaseStyles'
import { FormGrid } from '../../ui/FormGrid'
import { ListCard } from '../../ui/Cards'
import { useCallback, useState } from 'react'
import ProductEditForm from './ProductEditForm'
import { AddCircle, Create, Delete } from '@mui/icons-material'
import { deleteProductThunk } from '../../../features/rewardSlice'
import { useDispatch } from 'react-redux'

function ProjectDetailForm({ onSubmit, initVals = {} }) {
   const [contents, setContents] = useState(initVals.contents)
   const [schedule, setSchedule] = useState(initVals.schedule)
   const [products, setProducts] = useState(initVals.products)
   const [product, setProduct] = useState(null)
   const [open, setOpen] = useState(false)
   const dispatch = useDispatch()

   const handleSaveData = useCallback(() => {
      const formData = new FormData()
      formData.append('contents', contents)
      formData.append('schedule', schedule)

      onSubmit(formData)
   }, [onSubmit, contents, schedule])

   const handleDeleteProduct = useCallback(
      (productId) => {
         dispatch(deleteProductThunk(productId))
            .unwrap()
            .then((result) => setProducts(result.products))
            .catch()
      },
      [dispatch]
   )

   const ResetData = useCallback(() => {
      setProduct({ imgFile: null, imgUrl: '', title: '', contents: '' })
      setOpen(true)
   }, [])

   const addData = useCallback((product) => {
      setOpen(true)
      setProduct(product)
   }, [])

   const formItems = [
      {
         name: '프로젝트 소개',
         input: (
            <TextField
               value={contents}
               onChange={(e) => setContents(e.target.value)}
               fullWidth
               rows={3}
               multiline
               label="프로젝트의 기획 의도나 배경 등 전체적인 소개를 적어주세요."
            />
         ),
      },
      {
         name: '선물 구성품',
         input: (
            <>
               <Button startIcon={<AddCircle fontSize="small" />} onClick={() => ResetData(true)} variant="outlined">
                  선물 구성품 추가
               </Button>
               <Stack spacing={1} mt={1}>
                  <ProductEditForm open={open} setOpen={setOpen} product={product} setProducts={setProducts} />
                  {products.map((product) => (
                     <ListCard product={product} key={'product' + product.id}>
                        <IconButton aria-label="수정" size="small" onClick={() => addData(product)}>
                           <Create fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="삭제" size="small" onClick={() => handleDeleteProduct(product.id)}>
                           <Delete fontSize="small" />
                        </IconButton>
                     </ListCard>
                  ))}
               </Stack>
            </>
         ),
      },
      {
         name: '일정 안내',
         input: (
            <TextField
               fullWidth
               value={schedule}
               onChange={(e) => setSchedule(e.target.value)}
               rows={3}
               multiline
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
}

export default ProjectDetailForm
