# Awesome Documentations �

> A curated collection of developer documentation resources with an interactive Vue.js web interface

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Vue.js](https://img.shields.io/badge/Vue.js-2.6.10-4FC08D?style=flat&logo=vue.js)](https://vuejs.org/)
[![Bootstrap Vue](https://img.shields.io/badge/Bootstrap--Vue-2.0.0--rc.22-7952B3?style=flat&logo=bootstrap)](https://bootstrap-vue.org/)

## 🎯 Purpose

Awesome Documentations is an interactive web application that provides developers with quick access to high-quality documentation for popular web development technologies. Instead of bookmarking dozens of documentation sites, developers can use this single interface to discover and access documentation for frameworks, libraries, and tools across the entire web development stack.

## ✨ Features

- **Interactive Card Interface**: Browse documentation resources through an intuitive card-based layout
- **Categorized Content**: Resources organized by type (frameworks, libraries, etc.) and technology stack
- **Quick Access Links**: Direct links to both main documentation and API references
- **Visual Recognition**: Technology logos and icons for easy identification
- **Search & Filter**: Find specific technologies quickly (coming soon)
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Fast Performance**: Built with Vue.js for optimal user experience

## 🔧 Current Features

### Web Interface
- **Vue.js Frontend**: Modern, reactive user interface
- **Bootstrap Vue Components**: Responsive card layouts and styling
- **Dynamic Content Loading**: Documentation data loaded from JSON configuration
- **Technology Cards**: Each card displays:
  - Technology name and description
  - Official documentation link
  - API reference link
  - Technology logo/icon
  - Category tags

### Documentation Categories
- **Frontend Technologies**: JavaScript frameworks (Vue, React, Angular), CSS libraries, build tools
- **Backend Technologies**: Server frameworks, databases, APIs
- **Development Tools**: Testing frameworks, build tools, deployment platforms

## 🚀 Quick Start

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kranthilakum/awesome-documentations.git
   cd awesome-documentations
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Building for Production

```bash
npm run build
```

The built files will be generated in the `dist/` directory.

## 🛠️ Development

### Project Structure

```
awesome-documentations/
├── public/                 # Static assets
│   └── index.html         # HTML template
├── src/
│   ├── App.vue            # Main application component
│   ├── main.js            # Application entry point
│   ├── assets/
│   │   ├── data.json      # Documentation data
│   │   └── styles.css     # Global styles
│   └── components/
│       ├── Card.vue       # Documentation card component
│       └── Header.vue     # Application header
├── tests/
│   └── unit/              # Unit tests
├── package.json           # Project dependencies
└── vue.config.js          # Vue CLI configuration
```

### Available Scripts

- **`npm run serve`**: Start development server with hot reload
- **`npm run build`**: Build for production
- **`npm run lint`**: Run ESLint for code quality
- **`npm test:unit`**: Run unit tests with Jest

### Adding New Documentation

To add new documentation resources:

1. **Edit the data file**: Open `src/assets/data.json`
2. **Add your entry**:
   ```json
   {
     "title": "Technology Name",
     "content": "Brief description",
     "webURL": "https://documentation-url.com",
     "apiURL": "https://api-docs-url.com",
     "imageURL": "data:image/svg+xml;base64,...", // Base64 encoded SVG
     "category": "framework|library|tool",
     "tags": ["javascript", "frontend", "framework"]
   }
   ```

3. **Test your changes**: Run the development server to verify

### Technology Stack

- **Frontend Framework**: Vue.js 2.6.10
- **UI Components**: Bootstrap Vue
- **Build Tool**: Vue CLI
- **Testing**: Jest
- **Linting**: ESLint with Prettier
- **Styling**: CSS with Bootstrap

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Add New Documentation**: Submit new high-quality documentation resources
2. **Improve UI/UX**: Enhance the user interface and experience
3. **Fix Bugs**: Report and fix issues
4. **Enhance Features**: Add search, filtering, categories, etc.
5. **Update Dependencies**: Keep the project dependencies current
6. **Improve Documentation**: Enhance README, code comments, and guides

### Contribution Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   ```bash
   npm run test:unit
   npm run lint
   ```
5. **Commit with clear messages**
   ```bash
   git commit -m "Add documentation for [Technology Name]"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Submit a Pull Request**

### Guidelines for New Documentation

- **Quality**: Only include official or highly regarded documentation
- **Relevance**: Focus on widely-used, maintained technologies
- **Accuracy**: Verify all links work and descriptions are current
- **Completeness**: Include both main docs and API reference when available
- **Icon**: Provide appropriate technology logo/icon

## 📋 Roadmap

### Planned Features

- [ ] **Search Functionality**: Real-time search across all documentation
- [ ] **Advanced Filtering**: Filter by technology, category, tags
- [ ] **User Favorites**: Save frequently accessed documentation
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Offline Support**: Progressive Web App capabilities
- [ ] **Community Ratings**: User ratings for documentation quality
- [ ] **RSS Feed**: Stay updated with new additions
- [ ] **Multi-language Support**: Documentation in multiple languages

### Technical Improvements

- [ ] **Vue 3 Migration**: Upgrade to latest Vue.js version
- [ ] **TypeScript**: Add TypeScript support
- [ ] **Performance**: Implement lazy loading and virtualization
- [ ] **SEO**: Server-side rendering for better discoverability
- [ ] **Analytics**: Track popular documentation resources

## 📖 Resources

### Quick Links
- [Frontend Documentations](FRONTEND.md) - Comprehensive list of frontend resources
- [Backend Documentations](BACKEND.md) - Server-side technology documentation

### External Links
- [Vue.js Documentation](https://vuejs.org/v2/guide/)
- [Bootstrap Vue Documentation](https://bootstrap-vue.org/docs)
- [Vue CLI Documentation](https://cli.vuejs.org/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all the maintainers of the documentation sites linked in this project
- Vue.js community for the excellent framework and ecosystem
- Bootstrap team for the responsive CSS framework
- All contributors who help improve this resource

## 📞 Support

If you have questions, suggestions, or need help:

- **GitHub Issues**: [Report bugs or request features](https://github.com/kranthilakum/awesome-documentations/issues)
- **Discussions**: Join community discussions
- **Email**: Contact the maintainer for urgent matters

---

**Made with ❤️ by the developer community, for the developer community**
