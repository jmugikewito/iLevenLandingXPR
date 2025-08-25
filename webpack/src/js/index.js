/*!
 * Title:   Laapp - HTML App Landing Page
 * Main Javascript file
 * 
 * This files serves as the main entry for all components (scripts and styling)
 * You should edit according to your own needs, remove the components you won't need (use) is recommended in order to get a smaller final bundle file
 * Author:  http://themeforest.net/user/5studiosnet
 * Copyright © 2019 5Studios.net
 * https://5studios.net
 **/
import "bootstrap";

// GENERAL JS AND STYLES
// FontAwesome used icons
import "./font-awesome.js";

// Core components
import "./navbar.js";
import "./scrolling.js";

// Initializing of the scritps used across the site
// Feel free to edit this section, you can add additiona scripts you might need or remove what you won't use
import "./aos.js";
import "./swiper.js";
import "./pricing.js";
import "./forms.js";
import "./tilts.js";

// For demo purposes
import "./demo.js";

// Import styles at the end, so default plugins styles can be averriden when needed
import "../scss/index.scss";

// Demo styling, this file will bring Demo Landing Page styles, you can safely remove if you're not using any style the index.html
import "../scss/demo.scss";
