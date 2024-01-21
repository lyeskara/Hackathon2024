import { Box, Button, Divider } from "@mui/material"
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function HomePage() {
    return (
        <Box
            width="100%"
            minHeight="90vh"
            display="flex"
            justifyContent="center"
        >
            <Box
                width="75%"
                flexDirection="row"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-around">
                    <CarRepairOutlinedIcon sx={{ fontSize: 60 }} />
                    <Button variant="outlined">Add a walk-in</Button>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />

                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="space-around">
                    <FileOpenOutlinedIcon sx={{ fontSize: 60 }} />
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage
