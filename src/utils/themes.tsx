export interface Theme {
  background: string;
  color: string;
  primary: string;
  secondary: string;
}

const themes: Record<string, Theme> = {
  light: {
    background: '#ffffff',
    color: '#092635',
    primary: '#9EC8B9',
    secondary: '#5C8374'
  },
  dark: {
    background: '#222831',
    color: '#EEEEEE',
    primary: '#31363F',
    secondary: '#76ABAE'
  },
  vintage: {
    background: '#FEF3E2',
    color: '#0F2C59',
    primary: '#708871',
    secondary: '#BEC6A0'
  },
  retro: {
    background: '#FBF6E2',
    color: '#131842',
    primary: '#E68369',
    secondary: '#ECCEAE',
  },
  space: {
    background: '#3D3B40',
    color: '#F8EDFF',
    primary: '#525CEB',
    secondary: '#BFCFE7'
  },
  beige: {
    background: '#F8F0E5',
    color: '#0F2C59',
    primary: '#DAC0A3',
    secondary: '#EADBC8',
  }
};

export default themes;