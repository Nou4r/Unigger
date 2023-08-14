# Changelog

## 2023-07-05

### Fixed
- Fixed mobile UI


## 2023-07-04

### Added
- Added replacement letter for `/`, `Z`, `!`, `.`, `,`, `;`, ` `, and `"` [(see updated list here)](javascripts/letters.js)
- Added option for selective character replacement

### Changed
- Renamed from "Letter Swap" to "Unicode Spoofer"
- Divided [character list](https://aldenizenmc.is-a.dev/unicode-spoofer/characters.html) into sections
- Renamed letters.html to characters.html
- Changed project description
- Changed the date formatting of changelog to follow [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
- Changed the formatting of changelog to include "Added", "Changed", and "Fixed"
  
### Fixed
- Fixed copy URL button label not returning to "Copy" after being clicked during "Copied" state


## 2023-06-30

### Added
- Added replacement letter for `D`, `K`, `N`, `l`, and `y` [(see updated list here)](javascripts/letters.js)
- Implemented a GitHub action to automatically increment the version query parameter upon commit, effectively bypassing caching and ensuring the latest version is served

### Changed
- Renamed from "Unicodeify" to "Letter Swap"
- Eliminated the dependency on [Bulma](https://bulma.io/)
- Replaced custom-made copy to clipboard functionality with [clipboard.js](https://clipboardjs.com/)
- Modified footer
- Adjusted the textarea placeholder's opacity to distinguish it from actual text content
- Updated the textarea behavior to enable horizontal scrolling when the text overflows, instead of wrapping the text
- Added noscript tag on pages that require JavaScript
  
### Fixed
- Modified the theme to eliminate the transitional phase from dark mode (default) to light mode upon website load
- Updated the navbar links by removing the leading "/" from the href values, allowing proper navigation within the GitHub Page
  
