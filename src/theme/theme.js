import { createTheme } from '@mui/material/styles';

// Modern color palette inspired by Material Design 3 and financial applications
const theme = createTheme({
  palette: {
    primary: {
      light: '#667eea',
      main: '#4f46e5', // Modern indigo
      dark: '#3730a3',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#34d399',
      main: '#10b981', // Emerald green
      dark: '#059669',
      contrastText: '#ffffff',
    },
    success: {
      light: '#34d399',
      main: '#10b981', // Emerald
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      light: '#fbbf24',
      main: '#f59e0b', // Amber
      dark: '#d97706',
      contrastText: '#000000',
    },
    error: {
      light: '#f87171',
      main: '#ef4444', // Red
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    info: {
      light: '#60a5fa',
      main: '#3b82f6', // Blue
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate-900
      secondary: '#475569', // Slate-600
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ...Array(18).fill('0px 25px 50px -12px rgba(0, 0, 0, 0.25)')
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(79, 70, 229, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          padding: '12px 24px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          boxShadow: '0px 4px 12px rgba(79, 70, 229, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
            boxShadow: '0px 6px 20px rgba(79, 70, 229, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            background: 'rgba(79, 70, 229, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.8)',
            transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.3)',
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderColor: 'rgba(79, 70, 229, 0.4)',
              borderWidth: 2,
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 1)',
              '& fieldset': {
                borderColor: '#4f46e5',
                borderWidth: 2,
                boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 32,
          '&.MuiChip-filled': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            color: '#ffffff',
          },
          '&.MuiChip-outlined': {
            borderWidth: 2,
            '&:hover': {
              background: 'rgba(79, 70, 229, 0.04)',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          border: '1px solid',
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
          },
        },
        standardInfo: {
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          color: '#1e40af',
        },
        standardSuccess: {
          background: 'linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
          color: '#065f46',
        },
        standardWarning: {
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          color: '#92400e',
        },
        standardError: {
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          color: '#991b1b',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-track': {
            borderRadius: 16,
          },
          '& .MuiSwitch-thumb': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#4f46e5',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&.Mui-checked': {
            color: '#4f46e5',
          },
        },
      },
    },
  },
});

export default theme;
