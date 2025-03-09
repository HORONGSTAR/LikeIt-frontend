import { Avatar, Button, List, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Chip } from '@mui/material'

function CreatorPicker({ setOpen, open, members, handleClick }) {
   return (
      <Dialog open={open !== -1}>
         <DialogTitle>창작자 추가</DialogTitle>
         <DialogContent>
            <List sx={{ width: 240, maxHeight: 300 }}>
               {members.map((member) => (
                  <ListItemButton
                     key={'member' + member}
                     onClick={() => {
                        handleClick(open, 'studioCreatorId', member.id)
                        setOpen(-1)
                     }}
                  >
                     <ListItemIcon sx={{ minWidth: '38px' }}>
                        <Avatar
                           sx={{ width: 24, height: 24 }}
                           src={
                              member?.Creator?.User?.imgUrl ? `${process.env.REACT_APP_IMG_URL}/userImg/${member.Creator.User.imgUrl}` : `${process.env.REACT_APP_IMG_URL}/userImg/default_profile.png`
                           }
                        />
                     </ListItemIcon>
                     <ListItemText slotProps={{ primary: { noWrap: true } }}>{member.Creator.User.name}</ListItemText>
                     <Chip variant="grey" label={member.role === 'LEADER' ? '대표' : '멤버'} />
                  </ListItemButton>
               ))}
            </List>
         </DialogContent>
         <DialogActions>
            <Button onClick={() => setOpen(-1)}>취소</Button>
         </DialogActions>
      </Dialog>
   )
}

export default CreatorPicker
