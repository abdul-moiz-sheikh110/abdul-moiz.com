# Abdul Moiz Portfolio Expansion Design

## Purpose

Transform the existing single-page agency portfolio into a professional personal portfolio for Abdul Moiz. The site will present Abdul as the primary client contact while clearly communicating that he works with a capable delivery team.

## Success criteria

- The portfolio owner is Abdul Moiz on every route and in all metadata.
- The site has three routes: Home, About, and Projects.
- Shared navigation and footer components appear consistently across all routes.
- Services include web development, cybersecurity, SEO, custom systems, and team delivery.
- The Projects page showcases Crest View Academy, Teleco Solutions, 110 Solutions, and the school LMS.
- Crest View Academy, Teleco Solutions, and 110 Solutions include visible links to their live websites.
- The LMS showcase uses the supplied dashboard image and does not invent a public URL.
- No visible copy, metadata, accessible label, or title contains an em dash.
- All routes render successfully on desktop and mobile layouts.

## Information architecture

### Home, `/`

The Home page introduces Abdul Moiz as a digital solutions specialist supported by a multidisciplinary team. The first viewport will communicate web development, cybersecurity, SEO, and custom systems without presenting Abdul as a solo generalist who personally performs every specialist task.

Sections:

1. Shared navigation
2. Personal hero and positioning statement
3. Core capability overview
4. Selected project preview linking to the Projects page
5. Team delivery statement
6. Fiverr-focused contact call to action
7. Shared footer

### About, `/about`

The About page explains Abdul's professional role, practical working approach, and the team model. It will avoid unsupported claims about years of experience, certifications, client counts, revenue, or outcomes.

Sections:

1. Personal introduction
2. Professional focus
3. Skills and capabilities
4. Working approach
5. Team capability statement
6. Contact call to action

### Projects, `/projects`

The Projects page is the complete portfolio archive. Each project will have a dedicated visual card or case-study section with project type, concise scope, selected capabilities, and an external website link when one exists.

Projects:

1. Crest View Academy
   - Type: Education website
   - Live link: `https://crestviewacademy.pk/`
2. Teleco Solutions
   - Type: Corporate ICT website
   - Live link: `https://www.teleco-solutions.com/`
3. 110 Solutions
   - Type: Digital and technology services website
   - Live link: `https://www.110solutions.com.au/`
4. School LMS
   - Type: Custom school management system
   - Visual source: supplied LMS dashboard image
   - No live link will be invented

## Shared components

### Site header

The header will use the name Abdul Moiz as the brand identifier. Navigation links will point to Home, About, and Projects. The primary action will point to the contact section on the Home page.

### Site footer

The footer will repeat the Abdul Moiz identity, include links to all three routes, and describe the portfolio as team-supported digital delivery.

### Project data

Project information will live in one shared data module so the Home preview and Projects page cannot drift. The module will contain only verified titles, categories, links, descriptions, and the supplied LMS image path.

## Visual direction

The existing editorial portfolio direction will remain: warm neutral background, black typography, orange highlights, oversized headings, and clean project browser frames. The new pages will extend the same spacing, type scale, and responsive behavior.

The personal identity will be expressed with typography and an AM monogram. No stock portrait or invented personal photograph will be used.

## Copy rules

- Use Abdul Moiz as the portfolio owner.
- Mention the team naturally where delivery breadth matters.
- Use the spelling “cybersecurity.”
- Interpret “costume systems” as “custom systems.”
- Do not claim certifications, rankings, performance results, or technical features without evidence.
- Do not use em dashes in visible copy, metadata, titles, labels, or image alternative text.

## Metadata

Each route will have route-specific metadata:

- Home: Abdul Moiz portfolio and core services
- About: Abdul Moiz professional background and team
- Projects: selected website and custom system work

No route will use 110 Solutions as the portfolio owner. The company name will appear only as one project title on the Projects page and in its corresponding preview.

## Error handling and external links

- External links will open in a new tab and include safe relationship attributes.
- Navigation will use real route links rather than page-only anchors.
- The LMS project will use an internal contact action because no verified public URL was provided.
- Content will remain understandable if decorative project previews do not load.

## Testing and verification

Automated rendered HTML checks will verify:

- All three routes return successful HTML responses.
- Abdul Moiz is present as the owner on every route.
- Home includes cybersecurity, SEO, custom systems, and team delivery.
- Projects includes all four project names and all three verified external URLs.
- About includes professional focus, working approach, and team capabilities.
- Shared navigation links are present on every route.
- No route contains an em dash character.
- No route identifies 110 Solutions as the portfolio owner.

The production build must complete successfully after the tests pass.

## Out of scope

- A content management system
- Contact form submission or email delivery
- User accounts
- Analytics
- Invented testimonials, metrics, certifications, or project outcomes
- A live URL for the LMS
