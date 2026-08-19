// ============================================================================
// Pindo Design System — JS token mirror
//
// Small subset of tokens.scss for use in JavaScript — specifically for inline
// `style="..."` strings that uni-app APIs like `placeholder-style` require as
// plain strings (not bound objects). SCSS variables can't reach those, so we
// mirror the tokens here.
//
// ⚠️ This file must stay in sync with tokens.scss. When you change a token in
// tokens.scss, change it here too. Only mirror tokens that are actually
// consumed from JS — don't copy the whole file.
// ============================================================================

// Text — full ladder, mirrors $pd-text-* in tokens.scss
export const PD_TEXT_PRIMARY     = '#1A1A1A' // = $pd-grey-900
export const PD_TEXT_SECONDARY   = '#3D3D3D' // = $pd-grey-800
export const PD_TEXT_TERTIARY    = '#616161' // = $pd-grey-700
export const PD_TEXT_PLACEHOLDER = '#8B8B8B' // = $pd-grey-600
export const PD_TEXT_DISABLED    = '#ABABAB' // = $pd-grey-500

// Surface — only the JS-consumed ones (others stay SCSS-only)
export const PD_SURFACE_HOVER    = '#DFDFDF' // = $pd-grey-200

// Border — JS-consumed (pd-rate empty star)
export const PD_BORDER_LIGHT     = '#EDEDED' // = $pd-grey-100 / $pd-border-light

// Rating — iOS systemYellow, star fill only. Mirrors $pd-rating in tokens.scss.
export const PD_RATING           = '#FFCC00'

// Typography — body-lg size (used by inputs)
export const PD_BODY_FONT_SIZE = '32rpx'

// Prebuilt style string for the native placeholder-style attribute on
// <input>/<textarea>. Covers both the placeholder color and font-size so the
// placeholder and filled text render at identical sizes.
export const PD_PLACEHOLDER_STYLE =
  `color: ${PD_TEXT_PLACEHOLDER}; font-size: ${PD_BODY_FONT_SIZE};`
