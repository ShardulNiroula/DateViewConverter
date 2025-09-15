# Date View Converter - GitHub Copilot Rules

## Core Rules

### Component Management
- **Always create components in `src/components/` folder**
- **Use existing components wherever necessary - avoid code duplication**
- Create reusable UI components for date/time operations
- Break complex UIs into smaller, focused components
- Use PascalCase for component names (e.g., `DateInput.jsx`)

### Custom Hooks & Effects
- **Create custom hooks in `src/hooks/` folder**
- Create multiple custom hooks for date operations, API calls, etc.
- Use useEffect for side effects and data fetching
- Keep hooks focused and reusable across components

### Services & Utils
- **Create services in `src/services/` folder**
- **Create utilities in `src/utils/` folder**
- Separate business logic from UI components
- Create dedicated files for date formatting, validation, API calls

### Page Organization
- **Create `src/pages/` folder for page components**
- **Create `PageComponent` folder inside `pages` for shared page components**
- Group related page components together
- Keep page-specific components organized by feature

### Styling System
- **Create `src/styles/root.css` for global CSS variables**
- **All CSS files must use root.css colors and variables**
- Define color palette, typography, spacing in root.css
- Use CSS modules or styled-components for component styles
- Maintain consistent design system across the app

### Industry Standards
- **Follow React best practices and modern patterns**
- Use functional components with hooks
- Implement proper error handling and loading states
- Write clean, readable, and maintainable code
- Use meaningful names for variables, functions, and files
- Keep functions small and focused on single responsibilities
- Add comments for complex logic
- Follow ESLint rules and fix warnings
- Use TypeScript types when possible
- Test critical functionality and edge cases