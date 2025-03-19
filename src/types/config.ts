export interface Option {
  value: string;
  label: string;
}

export interface Dropdown {
  id: string;
  label: string;
  options: Option[];
}

export interface Slider {
  label: string;
  min: number;
  max: number;
  default: number;
  backgroundImages: Record<string, string>;
}

export interface Config {
  appTitle: string;
  leftPanel: {
    dropdowns: Dropdown[];
  };
  rightPanel: {
    dropdowns: Dropdown[];
    rotationSlider: Slider;
  };
} 