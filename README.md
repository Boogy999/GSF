# GSF Website

A modern, animated, and engaging website for Giza Systems Foundation (GSF) built with HTML, CSS, JavaScript, and Tailwind CSS.

## Features

- Modern, responsive design with mobile-first approach
- Smooth animations and micro-interactions
- Dynamic content sections with AOS animations
- Interactive program cards and forms
- Particle.js background effects
- Custom counter animations
- Mobile-friendly navigation
- Form validation and submission handling
- Newsletter subscription
- Social media integration

## Tech Stack

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- AOS (Animate On Scroll) Library
- Particle.js
- Font Awesome Icons

## Project Structure

```
/
├── index.html              # Home page
├── about.html             # About page
├── programs/             # Program pages
│   ├── imentor.html
│   ├── bridgez.html
│   ├── nitrous.html
│   ├── eden.html
│   └── graphene.html
├── css/
│   └── custom.css        # Custom styles
├── js/
│   ├── main.js          # Core functionality
│   └── animations.js    # Animation effects
├── images/              # Image assets
└── assets/             # Other assets (logos, icons)
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd gsf-website
   ```

3. Open the project in your preferred code editor.

4. For local development, you can use any static file server. For example, with Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

5. Open your browser and visit `http://localhost:8000`

## Development Guidelines

### CSS Guidelines

- Use Tailwind CSS utility classes for styling
- Custom styles should be added to `css/custom.css`
- Follow mobile-first approach
- Use CSS Grid and Flexbox for layouts
- Implement responsive design breakpoints:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+
  - Large: 1280px+

### JavaScript Guidelines

- Vanilla JavaScript for core functionality
- Modular code organization
- Use ES6+ features
- Implement proper error handling
- Add comments for complex logic

### Animation Guidelines

- Use AOS for scroll animations
- Implement smooth transitions
- Optimize animation performance
- Use transform and opacity for animations
- Add fallbacks for older browsers

### Performance Optimization

- Optimize images (WebP format)
- Minify CSS and JavaScript
- Implement lazy loading
- Use critical CSS
- Optimize animation performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Giza Systems Foundation
- Website: [www.gizafoundation.com](https://www.gizafoundation.com)
- Email: info@gizafoundation.com
- Phone: +201066586075
- Address: Plot 176, Second Sector, City Center, New Cairo, Egypt 11835 

## Accessibility Features

The GSF website is designed with accessibility as a core principle, ensuring that all users can access and interact with the content effectively. Here are the key accessibility features:

### Keyboard Navigation
- Skip links for quick navigation to main content and navigation
- Keyboard shortcuts for common actions:
  - `Alt + 1`: Go to main content
  - `Alt + 2`: Go to navigation
  - `Alt + M`: Toggle accessibility menu
  - `Alt + H`: Toggle high contrast
  - `Alt + D`: Toggle dark mode
  - `Alt + R`: Toggle reading guide
  - `Alt + S`: Toggle screen reader mode
  - `Alt + ?`: Show keyboard shortcuts help

### Visual Adjustments
- Text size controls (increase/decrease/reset)
- High contrast mode for better readability
- Dark mode for reduced eye strain
- Reading guide for easier text tracking
- Customizable focus indicators

### Screen Reader Support
- ARIA labels and roles for better screen reader compatibility
- Enhanced semantic structure
- Live regions for dynamic content updates
- Descriptive alt text for images
- Screen reader mode for optimized reading experience

### Form Accessibility
- Clear error messages with ARIA attributes
- Required field indicators
- Form validation with screen reader announcements
- Keyboard-friendly form controls

### User Preferences
- Saves accessibility preferences in localStorage
- Automatically applies saved preferences on page load
- Smooth transitions between different modes

### Responsive Design
- Mobile-friendly accessibility features
- Touch-friendly controls
- Responsive text sizing
- Adaptive layouts for different screen sizes

### Best Practices
- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy
- Sufficient color contrast
- Clear focus indicators
- Meaningful link text
- Alternative text for images

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

### Known Limitations
- Some third-party content may not be fully accessible
- Custom fonts may affect readability in certain modes
- Video content requires manual captioning

### Contributing to Accessibility
We welcome contributions to improve the website's accessibility. Please follow these guidelines:
1. Test with screen readers (NVDA, VoiceOver, JAWS)
2. Verify keyboard navigation
3. Check color contrast ratios
4. Validate ARIA implementation
5. Test with different zoom levels
6. Ensure responsive behavior 