import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Paper,
  styled,
  SelectChangeEvent,
  useMediaQuery,
  useTheme
} from '@mui/material';

// Styled components
const BackgroundImage = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundImage: 'url("https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=2560&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
});

// Responsive panel styling
const OverlayPanel = styled(Paper)(({ theme }: any) => ({
  padding: 0,
  backgroundColor: 'rgba(240, 240, 240, 0.9)',
  borderRadius: 0,
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  
  // Default styling for desktop
  width: '270px',
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  '&.left-panel': {
    left: theme.spacing(2),
    width: '270px',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 0
  },
  '&.right-panel': {
    right: theme.spacing(2),
    padding: theme.spacing(2),
    width: '270px',
  },
  
  // Media query for mobile devices
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    position: 'relative',
    top: 'auto',
    transform: 'none',
    margin: '10px auto',
    maxHeight: 'none',
    '&.left-panel': {
      left: 'auto',
      order: 1,
      padding: 0
    },
    '&.right-panel': {
      right: 'auto',
      order: 0,
      marginBottom: '20px'
    }
  }
}));

const SliderContainer = styled(Box)(({ theme }: any) => ({
  background: 'rgba(0, 0, 0, 0.7)',
  borderRadius: 0,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: '#ffffff',
}));

// Left panel specific styling components
const InfoSectionContainer = styled(Box)(({ theme }: any) => ({
  padding: theme.spacing(1.5, 2),
  borderBottom: '1px solid #ddd',
}));

const LogoContainer = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 2),
  backgroundColor: '#f5f5f5',
  marginBottom: 0,
}));

const TitleBar = styled(Box)(({ theme }: any) => ({
  backgroundColor: '#000000',
  color: 'white',
  padding: theme.spacing(1, 2),
  marginBottom: 0,
  "& .MuiTypography-root": {
    fontWeight: 'bold',
    letterSpacing: '1px'
  }
}));

const CopyrightBar = styled(Box)(({ theme }: any) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  textAlign: 'center',
  padding: theme.spacing(1),
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  
  // Media query for mobile
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    marginTop: '20px'
  }
}));

// Mobile container for responsive layout
const MobileContainer = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  padding: '20px 0',
  overflow: 'auto'
}));

// Updated logo to match the image exactly
const Logo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& .logo-icon': {
    height: '35px',
    marginRight: '10px',
  },
  '& .logo-text': {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000'
  }
});

// Slider section with light background - new component
const SliderSection = styled(Box)(({ theme }: any) => ({
  backgroundColor: 'rgba(230, 230, 230, 0.7)',
  padding: theme.spacing(2),
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}));

function App() {
  // State for form controls
  const [info1, setInfo1] = useState<string>('');
  const [info2, setInfo2] = useState<string>('');
  const [info3, setInfo3] = useState<string>('');
  const [info4, setInfo4] = useState<string>('');
  const [info5, setInfo5] = useState<string>('');
  const [info6, setInfo6] = useState<string>('');
  const [info7, setInfo7] = useState<string>('');
  const [info8, setInfo8] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(5); // Default to middle value of 1-10 range
  const [options, setOptions] = useState<string>('');
  
  // Get theme and check if screen is mobile size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle form changes
  const handleInfoChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: SelectChangeEvent) => {
    setter(event.target.value as string);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const handleOptionsChange = (event: SelectChangeEvent) => {
    setOptions(event.target.value as string);
  };

  // Mobile layout
  if (isMobile) {
    return (
      <>
        <BackgroundImage />
        <MobileContainer>
          {/* Top Logo Bar (Mobile) */}
          <LogoContainer sx={{ width: '100%', justifyContent: 'center' }}>
            <Logo>
              <svg className="logo-icon" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#e30613"/>
                <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="#e30613" stroke="white" strokeWidth="2"/>
                <circle cx="20" cy="20" r="5" fill="white"/>
                <path d="M30 10 L35 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="logo-text">Logoipsum</span>
            </Logo>
          </LogoContainer>

          <TitleBar sx={{ textAlign: 'center', width: '100%' }}>
            <Typography variant="h6">TITLE BAR</Typography>
          </TitleBar>

          {/* Right Panel (Mobile) - Updated to match the reference image */}
          <OverlayPanel className="right-panel" elevation={3}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '24px', mt: 0.5 }}>Options</Typography>
            
            <Typography variant="subtitle1">Info</Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <Select value={options} onChange={handleOptionsChange} displayEmpty>
                <MenuItem value=""><em>Choose an option</em></MenuItem>
                <MenuItem value="1">Option 1</MenuItem>
                <MenuItem value="2">Option 2</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={{ mt: 1.5 }}>Info</Typography>
            
            {/* Slider section with background matching the image */}
            <SliderSection>
              <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px' }}>
                {sliderValue}
              </Typography>
              <Slider
                value={sliderValue}
                onChange={handleSliderChange}
                min={1}
                max={10}
                step={1}
                sx={{
                  color: '#ff0000',
                  height: 8,
                  padding: '10px 0',
                  '& .MuiSlider-thumb': {
                    width: 20,
                    height: 20,
                    backgroundColor: '#fff',
                    border: '2px solid #000',
                    '&:focus, &:hover, &.Mui-active': {
                      boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.1)',
                    }
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#ff0000',
                    height: 8,
                    border: 'none',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#000',
                    height: 8,
                    opacity: 1,
                  }
                }}
              />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 1,
              }}>
                <Typography variant="body2" sx={{ fontSize: '14px' }}>value1 info</Typography>
                <Typography variant="body2" sx={{ fontSize: '14px' }}>value 2 info</Typography>
              </Box>
            </SliderSection>

            <Typography variant="subtitle1">Info</Typography>
            <FormControl fullWidth variant="outlined" size="small">
              <Select value={options} onChange={handleOptionsChange} displayEmpty>
                <MenuItem value=""><em>Choose an option</em></MenuItem>
                <MenuItem value="1">Option 1</MenuItem>
                <MenuItem value="2">Option 2</MenuItem>
              </Select>
            </FormControl>
          </OverlayPanel>

          {/* Left Panel (Mobile) - Updated to match the image styling */}
          <OverlayPanel className="left-panel" elevation={3}>
            <InfoSectionContainer>
              <Typography variant="subtitle1">Info</Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <Select value={info1} onChange={handleInfoChange(setInfo1)} displayEmpty>
                  <MenuItem value=""><em>Choose an option</em></MenuItem>
                  <MenuItem value="1">Option 1</MenuItem>
                  <MenuItem value="2">Option 2</MenuItem>
                </Select>
              </FormControl>
            </InfoSectionContainer>

            <InfoSectionContainer>
              <Typography variant="subtitle1">Info</Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <Select value={info2} onChange={handleInfoChange(setInfo2)} displayEmpty>
                  <MenuItem value=""><em>Choose an option</em></MenuItem>
                  <MenuItem value="1">Option 1</MenuItem>
                  <MenuItem value="2">Option 2</MenuItem>
                </Select>
              </FormControl>
            </InfoSectionContainer>

            <InfoSectionContainer>
              <Typography variant="subtitle1">Info</Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <Select value={info3} onChange={handleInfoChange(setInfo3)} displayEmpty>
                  <MenuItem value=""><em>Choose an option</em></MenuItem>
                  <MenuItem value="1">Option 1</MenuItem>
                  <MenuItem value="2">Option 2</MenuItem>
                </Select>
              </FormControl>
            </InfoSectionContainer>

            <InfoSectionContainer>
              <Typography variant="subtitle1">Info</Typography>
              <FormControl fullWidth variant="outlined" size="small">
                <Select value={info4} onChange={handleInfoChange(setInfo4)} displayEmpty>
                  <MenuItem value=""><em>Choose an option</em></MenuItem>
                  <MenuItem value="1">Option 1</MenuItem>
                  <MenuItem value="2">Option 2</MenuItem>
                </Select>
              </FormControl>
            </InfoSectionContainer>
          </OverlayPanel>

          <CopyrightBar>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit rem ipsum</Typography>
          </CopyrightBar>
        </MobileContainer>
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <BackgroundImage />
      {/* Left Panel - Updated to match exactly the image */}
      <OverlayPanel className="left-panel" elevation={3}>
        <LogoContainer>
          <Logo>
            <svg className="logo-icon" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#e30613"/>
              <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="#e30613" stroke="white" strokeWidth="2"/>
              <circle cx="20" cy="20" r="5" fill="white"/>
              <path d="M30 10 L35 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="logo-text">Logoipsum</span>
          </Logo>
        </LogoContainer>

        <TitleBar>
          <Typography variant="h6">TITLE BAR</Typography>
        </TitleBar>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info1} onChange={handleInfoChange(setInfo1)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info2} onChange={handleInfoChange(setInfo2)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info3} onChange={handleInfoChange(setInfo3)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info4} onChange={handleInfoChange(setInfo4)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info5} onChange={handleInfoChange(setInfo5)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info6} onChange={handleInfoChange(setInfo6)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info7} onChange={handleInfoChange(setInfo7)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>

        <InfoSectionContainer>
          <Typography variant="subtitle1">Info</Typography>
          <FormControl fullWidth variant="outlined" size="small">
            <Select value={info8} onChange={handleInfoChange(setInfo8)} displayEmpty>
              <MenuItem value=""><em>Choose an option</em></MenuItem>
              <MenuItem value="1">Option 1</MenuItem>
              <MenuItem value="2">Option 2</MenuItem>
            </Select>
          </FormControl>
        </InfoSectionContainer>
      </OverlayPanel>

      {/* Right Panel - Updated to match the reference image exactly */}
      <OverlayPanel className="right-panel" elevation={3}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '24px', mt: 0.5 }}>Options</Typography>
        
        <Typography variant="subtitle1">Info</Typography>
        <FormControl fullWidth variant="outlined" size="small">
          <Select value={options} onChange={handleOptionsChange} displayEmpty>
            <MenuItem value=""><em>Choose an option</em></MenuItem>
            <MenuItem value="1">Option 1</MenuItem>
            <MenuItem value="2">Option 2</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="subtitle1" sx={{ mt: 1.5 }}>Info</Typography>
        
        {/* Slider section with background matching the image */}
        <SliderSection>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '36px' }}>
            {sliderValue}
          </Typography>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            min={1}
            max={10}
            step={1}
            sx={{
              color: '#ff0000',
              height: 8,
              padding: '10px 0',
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
                backgroundColor: '#fff',
                border: '2px solid #000',
                '&:focus, &:hover, &.Mui-active': {
                  boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.1)',
                }
              },
              '& .MuiSlider-track': {
                backgroundColor: '#ff0000',
                height: 8,
                border: 'none',
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#000',
                height: 8,
                opacity: 1,
              }
            }}
          />
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 1,
          }}>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>value1 info</Typography>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>value 2 info</Typography>
          </Box>
        </SliderSection>

        <Typography variant="subtitle1">Info</Typography>
        <FormControl fullWidth variant="outlined" size="small">
          <Select value={options} onChange={handleOptionsChange} displayEmpty>
            <MenuItem value=""><em>Choose an option</em></MenuItem>
            <MenuItem value="1">Option 1</MenuItem>
            <MenuItem value="2">Option 2</MenuItem>
          </Select>
        </FormControl>
      </OverlayPanel>

      <CopyrightBar>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit rem ipsum</Typography>
      </CopyrightBar>
    </>
  );
}

export default App;