export interface Theme {
  background: string;
  color: string;
  primary: string;
  secondary: string;
}

const themes: Record<string, Theme> = {
  vintage: {
    background: '#FEF3E2',
    color: '#606676',
    primary: '#708871',
    secondary: '#BEC6A0'
  },
  space: {
    background: '#3D3B40',
    color: '#F8EDFF',
    primary: '#525CEB',
    secondary: '#BFCFE7'
  },
  retro: {
    background: '#F1DEC6',
    color: '#4158A6',
    primary: '#FF8343',
    secondary: '#179BAE',
  },
  beige: {
    background: '#F8F0E5',
    color: '#0F2C59',
    primary: '#DAC0A3',
    secondary: '#EADBC8',
  },
  dark: {
    background: '#222831',
    color: '#EEEEEE',
    primary: '#31363F',
    secondary: '#76ABAE'
  },
  light: {
    background: '#ffffff',
    color: '#092635',
    primary: '#9EC8B9',
    secondary: '#5C8374'
  },
};

export default themes;