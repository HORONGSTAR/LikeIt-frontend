import { TextField, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material'
import { ImgUploadBox } from '../../../styles/BaseStyles'
import { useCallback, useState } from 'react'
import { isBlank } from '../../../util/isBlank'

function EditProductBox({ open, onSubmit, product, children }) {
   const [imgFile, setImgFile] = useState(null)
   const [imgUrl, setImgUrl] = useState(product?.imgUrl ? process.env.REACT_APP_IMG_URL + '/rewardProduct/' + product.imgUrl : '')
   const [title, setTitle] = useState(product?.title || '')
   const [contents, setContents] = useState(product?.contents || '')
   const [alert, setAlert] = useState(false)

   const handleSubmit = useCallback(() => {
      if (!isBlank([imgUrl, title, contents])) return setAlert(true)
      const formData = new FormData()
      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), {
            type: imgFile.type,
         })
         formData.append('image', encodedFile)
      }
      formData.append('title', title)
      formData.append('contents', contents)
      onSubmit(formData)
   }, [onSubmit, imgUrl, imgFile, title, contents])

   return (
      <Dialog open={open === 'product'}>
         <DialogTitle>선물 구성품 추가</DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
               <ImgUploadBox setImgFile={setImgFile} imgUrl={imgUrl} setImgUrl={setImgUrl} />
               <TextField value={title} onChange={(e) => setTitle(e.target.value)} fullWidth label="구성품 이름" placeholder="구성품 이름을 적어주세요." />
               <TextField value={contents} onChange={(e) => setContents(e.target.value)} fullWidth label="구성품 설명" placeholder="구성품에 대한 설명을 적어주세요." rows={3} multiline />
            </Stack>
         </DialogContent>
         <DialogActions>
            {children}
            <Button color="orenge" onClick={handleSubmit}>
               확인
            </Button>
         </DialogActions>
         <Snackbar open={alert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={6000} onClose={() => setAlert(false)}>
            <Alert onClose={() => setAlert(false)} severity="error" variant="filled" sx={{ width: '100%' }}>
               모든 항목을 채워주세요.
            </Alert>
         </Snackbar>
      </Dialog>
   )
}

export default EditProductBox
