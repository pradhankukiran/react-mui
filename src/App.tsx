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
const BackgroundIframe = styled('iframe')(({ theme }: any) => ({
  border: 'none',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  
  // Media query for mobile devices
  [theme.breakpoints.down('sm')]: {
    position: 'static',
    width: '100vw',
    maxWidth: '100%',
    objectFit: 'cover',
    objectPosition: 'center'
  }
}));

// Responsive panel styling
const OverlayPanel = styled(Paper)(({ theme }: any) => ({
  padding: 0,
  backgroundColor: 'rgba(240, 240, 240, 0.9)',
  borderRadius: 0,
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease',
  zIndex: 1,
  
  // Default styling for desktop
  width: '270px',
  height: 'auto',
  
  '&.left-panel': {
    width: '270px',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  '&.right-panel': {
    padding: theme.spacing(2),
    width: '270px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  
  // Media query for mobile devices
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    position: 'relative',
    margin: '0',
    borderRadius: 0,
    '&.left-panel': {
      order: 0,
      padding: 0,
      maxHeight: '300px',  // Set a fixed height for scrollability
      overflowY: 'auto',   // Enable vertical scrolling
      overflowX: 'hidden'  // Prevent horizontal scrolling
    },
    '&.right-panel': {
      order: 2,
      marginBottom: 0,
      maxHeight: 'none',
      overflowY: 'visible'
    }
  }
}));

// Slider container to properly position track background and slider together
const SliderContainer = styled(Box)({
  position: 'relative',
  padding: '15px 0',
  marginBottom: '5px'
});

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
  zIndex: 2,
  
  // Media query for mobile
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    marginTop: '20px',
    order: 2
  }
}));

// Mobile container for responsive layout
const MobileContainer = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  maxWidth: '100%',
  minHeight: '100vh',
  padding: '0',
  margin: '0',
  overflow: 'visible', // Changed from 'hidden' to 'visible' to allow scrolling
  position: 'relative'
}));

// Updated logo to match the image exactly
const Logo = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& .logo-img': {
    height: '45px',
    width: 'auto',
    maxWidth: '100%'
  }
});

// Slider section with light background - new component
const SliderSection = styled(Box)(({ theme }: any) => ({
  backgroundColor: 'rgba(230, 230, 230, 0.7)',
  padding: theme.spacing(2),
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  position: 'relative'
}));

// Custom styled slider that changes color based on value
const ColorTrackSlider = styled(Slider)(({ theme }: any) => {
  return {
    height: 6,
    padding: '12px 0',
    position: 'relative',
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
      backgroundColor: '#000', // Keep the track black
      height: 6,
      border: 'none',
    },
    '& .MuiSlider-rail': {
      backgroundColor: '#000', // Keep the rail black
      height: 6,
      opacity: 0.7,
    }
  };
});

// Define interface for the custom slider track background props
interface SliderTrackBackgroundProps {
  width: number;
  color: string;
}

// Custom slider track background component - colored rectangle BEHIND the slider up to the thumb
const SliderTrackBackground = styled('div')<SliderTrackBackgroundProps>(({ width, color }: SliderTrackBackgroundProps) => ({
  position: 'absolute',
  height: '35px',
  width: `${width}%`,
  backgroundColor: color,
  top: '45%',
  transform: 'translateY(-50%)',
  left: 0,
  zIndex: 1,
  borderRadius: '0px'
}));

// Full width white background behind the entire slider
const SliderWhiteBackground = styled('div')({
  position: 'absolute',
  height: '35px',
  width: '100%',
  backgroundColor: 'white',
  top: '45%',
  transform: 'translateY(-50%)',
  left: 0,
  zIndex: 0,
  borderRadius: '0px'
});

// New container for the main layout
const ContentContainer = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  width: '100vw',
  maxWidth: '100%',
  height: 'calc(100vh - 40px)', // Account for copyright bar
  position: 'relative',
  justifyContent: 'space-between',
  padding: 0,
  margin: 0,
  alignItems: 'center',
  overflow: 'hidden',
  
  // Media query for mobile devices
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
    padding: 0,
    width: '100vw',
    maxWidth: '100%'
  }
}));

// New iframe container
const IframeContainer = styled(Box)(({ theme }: any) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100%',
  zIndex: 0,
  maxWidth: '100%',
  margin: 0,
  padding: 0,
  
  // Media query for mobile devices
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    height: '40vh',
    margin: '0',
    order: 1,
    width: '100vw',
    maxWidth: '100%',
    left: 0,
    right: 0,
    overflow: 'hidden'
  }
}));

// New container for background image in mobile view
const BackgroundImageMobile = styled('div')({
  width: '100%',
  height: '40vh',
  backgroundImage: 'url("https://images.unsplash.com/photo-1675365723633-c11f9789df34?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  margin: 0,
  padding: 0,
  order: 1
});

// New iframe container for mobile with aspect ratio preservation
const ResponsiveIframeContainer = styled(Box)({
  position: 'relative',
  width: '100vw',
  maxWidth: '100%',
  height: '40vh',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
  left: 0,
  right: 0,
  order: 1
});

// Responsive iframe
const ResponsiveIframe = styled('iframe')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
  overflow: 'hidden'
});

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

  // Handle scrolling in mobile view
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const height = target.clientHeight;
    const delta = e.touches[0].clientY;
    
    // Store touch position for future reference
    target.dataset.touchStartY = delta.toString();
    target.dataset.scrollTop = scrollTop.toString();
    
    // Determine if we should prevent propagation
    if ((scrollTop <= 0 && delta > 0) || (scrollTop + height >= scrollHeight && delta < 0)) {
      // At the boundary, allow parent scroll
      e.stopPropagation();
    }
  };

  // Calculate the width percentage for the colored background
  const calculateWidthPercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // Get the background color based on slider value
  const getSliderBackgroundColor = (value: number) => {
    if (value >= 1 && value <= 3) return '#ff0000'; // Red for 1-3
    if (value >= 4 && value <= 7) return '#00aa00'; // Green for 4-7
    if (value >= 8 && value <= 10) return '#ff0000'; // Red again for 8-10
    return '#000000'; // Default fallback
  };

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
        <MobileContainer className="MobileContainer">
          {/* Top Logo Bar (Mobile) */}
          <LogoContainer sx={{ width: '100vw', maxWidth: '100%', justifyContent: 'center', marginBottom: 0 }}>
            <Logo>
              <img src="/images/schott-logo.png" alt="Schott Performance Wheels" className="logo-img" />
            </Logo>
          </LogoContainer>

          <TitleBar sx={{ textAlign: 'center', width: '100vw', maxWidth: '100%' }}>
            <Typography variant="h6">TITLE BAR</Typography>
          </TitleBar>

          {/* Left Panel (Mobile) */}
          <OverlayPanel 
            className="left-panel" 
            elevation={3} 
            onTouchStart={handleTouchStart}
          >
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
            
            {/* Adding the additional 4 dropdowns that were missing in mobile view */}
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

          {/* Responsive Iframe Container for Mobile */}
          <ResponsiveIframeContainer>
            <ResponsiveIframe 
              src="https://wheel-rim-3d-viewer.netlify.app/" 
              title="Background Content"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
            />
          </ResponsiveIframeContainer>

          {/* Right Panel (Mobile) */}
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
              <SliderContainer>
                <SliderWhiteBackground />
                <SliderTrackBackground
                  width={calculateWidthPercentage(sliderValue, 1, 10)}
                  color={getSliderBackgroundColor(sliderValue)}
                />
                <ColorTrackSlider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  min={1}
                  max={10}
                  step={1}
                />
              </SliderContainer>
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
        </MobileContainer>
      </>
    );
  }

  // Desktop layout
  return (
    <>
      <ContentContainer>
        {/* Background Iframe (Desktop) */}
        <IframeContainer>
          <BackgroundIframe 
            src="https://wheel-rim-3d-viewer.netlify.app/" 
            title="Background Content"
            frameBorder="0"
            scrolling="no"
            allowTransparency={true}
          />
        </IframeContainer>

        {/* Left Panel - Desktop */}
        <OverlayPanel className="left-panel" elevation={3}>
          <LogoContainer>
            <Logo>
              <img src="/images/schott-logo.png" alt="Schott Performance Wheels" className="logo-img" />
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

        {/* Right Panel - Desktop */}
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
            <SliderContainer>
              <SliderWhiteBackground />
              <SliderTrackBackground
                width={calculateWidthPercentage(sliderValue, 1, 10)}
                color={getSliderBackgroundColor(sliderValue)}
              />
              <ColorTrackSlider
                value={sliderValue}
                onChange={handleSliderChange}
                min={1}
                max={10}
                step={1}
              />
            </SliderContainer>
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
      </ContentContainer>

      <CopyrightBar>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit rem ipsum</Typography>
      </CopyrightBar>
    </>
  );
}

export default App;