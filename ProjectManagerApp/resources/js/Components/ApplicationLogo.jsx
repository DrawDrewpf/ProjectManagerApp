export default function ApplicationLogo({ variant = 'horizontal', mode = 'dark', className = '', ...props }) {
    // variant options: 'horizontal', 'vertical', 'icon'
    // mode options: 'dark', 'light'
    
    const getLogoPath = () => {
        // Define the base path and color prefix based on mode and variant
        const basePath = '/images/Logos/';
        const colorPrefix = mode === 'dark' ? 'LogoDarkDrew' : 'LogoWhiteDrew';
        
        switch (variant) {
            case 'horizontal':
                return `${basePath}${colorPrefix}Hor.png`;
            case 'icon':
                return `${basePath}${colorPrefix}Mono.png`;
            case 'vertical':
                return `${basePath}${colorPrefix}Ver.png`;
            default:
                return `${basePath}${colorPrefix}Mono.png`;
        }
    };

    return (
        <img 
            src={getLogoPath()} 
            alt="DrewApp Logo" 
            className={className}
            {...props}
        />
    );
}