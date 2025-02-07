import React from 'react'
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material'

const ProjectCard = ({ title, description, image, buttonText, buttonLink }) => {
   return (
      <Card sx={{ display: 'flex', maxWidth: 900, boxShadow: 'none', border: '1px solid #ddd', mt: 2 }}>
         {/* 왼쪽 텍스트 */}
         <CardContent sx={{ flex: 1, p: 5 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
               {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ my: 4 }}>
               {description}
            </Typography>
            <Button
               variant="contained"
               href={buttonLink}
               sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  fontSize: '14px',
                  px: 2,
                  py: 1,
                  '&:hover': { backgroundColor: '#333' },
                  borderRadius: 2,
                  textTransform: 'none',
                  width: '100%',
                  boxShadow: 'none',
               }}
            >
               {buttonText}
            </Button>
         </CardContent>

         {/* 오른쪽 이미지 */}
         <CardMedia component="img" sx={{ width: 350, height: 280 }} image={image} alt={title} />
      </Card>
   )
}

export default ProjectCard
