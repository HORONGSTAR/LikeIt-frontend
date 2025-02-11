import React from 'react'
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material'

const CommunityList = ({ posts, onPostClick }) => {
   return (
      <Box>
         {posts.map((post) => (
            <Card key={post.id} sx={{ mb: 2, cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }} onClick={() => onPostClick(post)}>
               <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                     <Avatar src={post.profile} sx={{ width: 32, height: 32, mr: 1 }} />
                     <Typography variant="subtitle2" color="text.secondary">
                        {post.author} · {post.date}
                     </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold">
                     {post.title}
                  </Typography>
               </CardContent>
            </Card>
         ))}
      </Box>
   )
}

export default CommunityList
