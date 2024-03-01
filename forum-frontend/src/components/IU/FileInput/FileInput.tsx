import React, { useRef, useState } from 'react';
import { Box, Grid, IconButton, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getFieldError: (name: string) => string | undefined;
}

const FileInput: React.FC<Props> = ({ onChange, getFieldError }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        name="image"
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs textAlign="center">
          <Box
            textAlign="center"
            sx={{ bgcolor: '#f1f1f1', borderRadius: 3, position: 'relative' }}
          >
            <IconButton
              onClick={activateInput}
              disableRipple
              sx={{ marginBottom: '-20px' }}
            >
              <CloudUploadIcon color="info" sx={{ fontSize: '52px' }} />
            </IconButton>
            <TextField
              fullWidth
              disabled
              margin="none"
              error={Boolean(getFieldError('image'))}
              helperText={getFieldError('image')}
              value={filename ? filename : 'Upload an image'}
              onClick={activateInput}
              FormHelperTextProps={{
                sx: {
                  color: 'green',
                  position: 'absolute',
                  bottom: '-25px',
                },
              }}
              sx={{
                '& fieldset': {
                  border: 'none',
                  textAlign: 'center',
                },
                '& input': {
                  textAlign: 'center',
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
