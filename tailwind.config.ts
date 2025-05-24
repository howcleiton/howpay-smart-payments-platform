
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FF6B35',
					foreground: '#ffffff',
					50: '#FFF4F1',
					100: '#FFE8E1',
					200: '#FFD1C2',
					300: '#FFB19A',
					400: '#FF8A65',
					500: '#FF6B35',
					600: '#E55722',
					700: '#CC4A1E',
					800: '#B8411C',
					900: '#A63A1A'
				},
				secondary: {
					DEFAULT: '#FFA726',
					foreground: '#ffffff',
					50: '#FFF8E1',
					100: '#FFECB3',
					200: '#FFE082',
					300: '#FFD54F',
					400: '#FFCA28',
					500: '#FFA726',
					600: '#FF9800',
					700: '#F57C00',
					800: '#EF6C00',
					900: '#E65100'
				},
				accent: {
					DEFAULT: '#FFD700',
					foreground: '#1F2937',
					50: '#FFFDE7',
					100: '#FFF9C4',
					200: '#FFF59D',
					300: '#FFF176',
					400: '#FFEE58',
					500: '#FFD700',
					600: '#FFC107',
					700: '#FFB300',
					800: '#FFA000',
					900: '#FF8F00'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				success: '#4CAF50',
				'success-light': '#E8F5E8',
				'success-dark': '#388E3C',
				warning: '#FFA726',
				'warning-light': '#FFF8E1',
				error: '#F44336',
				'error-light': '#FFEBEE'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out'
			},
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui']
			},
			backgroundImage: {
				'howpay-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FFA726 50%, #FFD700 100%)',
				'howpay-gradient-reverse': 'linear-gradient(135deg, #FFD700 0%, #FFA726 50%, #FF6B35 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
