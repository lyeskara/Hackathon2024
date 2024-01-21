import { Box, Button, Divider } from "@mui/material"
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import axios from 'axios'
import { useState } from "react";

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

    const [file, setFile] = useState<File>();

    const handleFileChange = (event: any) => {
        const selectedFile: File = event.target.files?.[0];
        console.log('Selected File:', selectedFile);
        setFile(selectedFile);
    };
    const IP_ADDRESS = import.meta.env.VITE_API_URL
    const uploadFile = async () => {
        const formData = new FormData();
        if (file) {
            formData.append('csvFile', file);
            console.log(IP_ADDRESS);

            try {
                const response = await axios.post(`${IP_ADDRESS}/csv`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                    transformRequest: data => data,
                  });
            
                if (!response.data) {
                    // Handle non-OK responses
                    console.error('Error:', response.status, response.statusText);
                    return;
                }
            
                console.log('Server response:', response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        console.log('something happen');
    };

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
                        <VisuallyHiddenInput type="file" name="upload" onChange={handleFileChange} />
                    </Button>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        onClick={uploadFile}
                    >
                        Submit file
                    </Button>

                </Box>
            </Box>
        </Box>
    )
}

export default HomePage
