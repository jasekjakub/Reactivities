import { AccessTime, Place, Delete } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material"
import { Link} from "react-router";
import { formatDate } from "../../../lib/util/util";
import { useActivities } from "../../../lib/hooks/useActivities";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Props = {
    activity: Activity
}


export default function ActivityCard({activity}: Props) {
    const { deleteActivity } = useActivities();

    const label = activity.isHost ? "You are hosting" : "You are going";
    const color = activity.isHost ? "secondary" : activity.isGoing ? "warning" : "default";

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            deleteActivity.mutate(activity.id);
        }
    };



  return (
    <Card elevation={3} sx={{borderRadius: 3}}>
        <Box display="flex" alignItems = "center" justifyContent ="space-between">
            <CardHeader
                avatar={<Avatar sx={{height: 80, width: 80}}
                        src={activity.hostImageUrl}
                        alt='Image of host'
                    />}
                title ={activity.title}
                titleTypographyProps={{
                    fontWeight:"bold",
                    fontSize: 20
                }}
                subheader={
                    <>
                    Hosted by{" "} <Link to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
                    </>
                }
            />
            <Box display="flex" flexDirection="column" gap={2} mr={2}>
                {(activity.isHost || activity.isGoing) && <Chip label={label} variant="outlined" color={color} sx={{ borderRadius:2 }} />}
                {activity.isCancelled && <Chip label="Cancelled" color="error" sx={{borderRadius:2}}/>}
            </Box>
        </Box>


        <Divider sx={{mb: 3}}/>

        <CardContent sx={{p: 0}}>
            <Box display="flex" alignItems="center" mb={2} px={2}>
                <Box display = "flex" flexGrow={0} alignItems="center">
                    <AccessTime sx={{mr:1}}/>
                <Typography variant="body2" noWrap>
                    {formatDate(activity.date)}
                </Typography>

                </Box>
                
                <Place sx={{ml: 3, mr: 1}} />
                <Typography variant="body2">{activity.venue}</Typography>
            </Box>
            <Divider/>
            <Box display="flex" gap={2} sx={{backgroundColor: "grey.200", py:3, pl: 3}}>
                {activity.attendees.map(a => (
                    <AvatarPopover profile={a} key={a.id} />
                ))}
            </Box>
            
        </CardContent>
        <CardContent sx={{ pb: 2}}>
            <Typography variant="body2" >
                {activity.description}
            </Typography>
            <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                    component={Link}
                    to={`/activities/${activity.id}`}
                    size="medium"
                    variant="contained"
                    sx={{display: "flex", justifySelf: "self-end", borderRadius: 3}}
                >
                    View
                </Button>
                <Button
                    onClick={handleDelete}
                    size="medium"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    disabled={deleteActivity.isPending}
                    sx={{borderRadius: 3}}
                >
                    {deleteActivity.isPending ? 'Deleting...' : 'Delete'}
                </Button>
            </Box>
        </CardContent>
    </Card>
  )
}
