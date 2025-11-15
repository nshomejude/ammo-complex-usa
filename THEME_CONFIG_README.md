# Theme Configuration Guide

This guide explains how to customize contact information and notice styles throughout the entire website by editing theme configuration files.

## Quick Start

All theme customization is done in **one place**: `src/index.css`

Edit the CSS custom properties to update site-wide settings instantly.

---

## Contact Information

### Where to Edit
Open `src/index.css` and find the **Contact Information** section (around line 47):

```css
/* Contact Information - Edit these values to update site-wide contact details */
--contact-phone: "+1 (555) FIREARMS";
--contact-phone-link: "+1-555-FIREARMS";
--contact-email: "info@armscomplex.com";
--contact-telegram: "@armscomplex";
--contact-telegram-link: "https://t.me/armscomplex";
```

### How to Update

1. **Phone Number Display**: Change `--contact-phone` to your display format
   ```css
   --contact-phone: "+1 (800) 123-4567";
   ```

2. **Phone Number Link**: Change `--contact-phone-link` to the callable format
   ```css
   --contact-phone-link: "+1-800-123-4567";
   ```

3. **Email Address**: Change `--contact-email`
   ```css
   --contact-email: "sales@yourcompany.com";
   ```

4. **Telegram Username**: Change `--contact-telegram`
   ```css
   --contact-telegram: "@yourcompany";
   ```

5. **Telegram Link**: Change `--contact-telegram-link`
   ```css
   --contact-telegram-link: "https://t.me/yourcompany";
   ```

### What Updates Automatically

When you change these values, **all contact widgets** across the entire site update automatically:
- Main ContactWidget
- ContactWidget1
- ContactWidget2
- ContactWidget3
- Footer contact sections
- Any other component using `contactConfig`

---

## Notice Colors & Styles

### Where to Edit
In the same `src/index.css` file, find the **Notice Colors** section:

```css
/* Notice Colors - Edit these to change notice appearance */
--notice-border: 0 84% 60%;
--notice-bg: 0 84% 60%;
--notice-text: 0 0% 98%;
--notice-icon: 0 84% 60%;
```

### Color Format

All colors use **HSL format** (Hue Saturation Lightness):
- `0 84% 60%` = Red with 84% saturation and 60% lightness
- Format: `HUE SATURATION% LIGHTNESS%`

### Common HSL Colors

| Color | HSL Value |
|-------|-----------|
| Red | `0 84% 60%` |
| Orange | `25 95% 53%` |
| Yellow | `45 93% 47%` |
| Green | `142 71% 45%` |
| Blue | `217 91% 60%` |
| Purple | `262 83% 58%` |

### How to Change Notice Colors

1. **Border Color**: Change `--notice-border`
   ```css
   --notice-border: 25 95% 53%; /* Orange border */
   ```

2. **Background Color**: Change `--notice-bg`
   ```css
   --notice-bg: 25 95% 53%; /* Orange background (will be shown at 10% opacity) */
   ```

3. **Text Color**: Change `--notice-text`
   ```css
   --notice-text: 0 0% 10%; /* Nearly black text */
   ```

4. **Icon Color**: Change `--notice-icon`
   ```css
   --notice-icon: 25 95% 53%; /* Orange icon */
   ```

### What Updates Automatically

All notices throughout the site update:
- Shipping notices
- Legal notices
- FFL transfer notices
- Warning messages
- Information alerts
- Any component using Alert with notice styling

---

## Other Theme Colors

### Primary Colors

Located in the `:root` section of `src/index.css`:

```css
--background: 0 0% 7%;           /* Main background - dark gray */
--foreground: 0 0% 95%;          /* Main text color - light gray */
--primary: 84 28% 35%;           /* Primary brand color - olive green */
--accent: 45 93% 47%;            /* Accent color - yellow/gold */
--destructive: 0 84% 60%;        /* Destructive/danger color - red */
--tactical: 84 28% 35%;          /* Tactical theme color - olive green */
```

### How to Change Primary Colors

Follow the same HSL format. For example, to change the primary brand color to blue:

```css
--primary: 217 91% 60%;          /* Blue instead of olive green */
--tactical: 217 91% 60%;         /* Keep tactical matching primary */
```

---

## Advanced Usage

### Using Theme Config in Code

The `src/config/theme.ts` file provides JavaScript access to these values:

```typescript
import { contactConfig, noticeConfig } from '@/config/theme';

// Use in components
<a href={contactConfig.phoneLink}>{contactConfig.phone}</a>
<a href={contactConfig.emailLink}>{contactConfig.email}</a>
<a href={contactConfig.telegramLink}>{contactConfig.telegram}</a>

// Apply notice styling
<Alert className={noticeConfig.allClasses}>
  <AlertCircle className={noticeConfig.iconClass} />
</Alert>
```

---

## Testing Your Changes

1. Edit `src/index.css` with your new values
2. Save the file
3. The preview will update automatically
4. Check multiple pages to see changes applied site-wide

---

## Tips

- **Always use HSL format** for colors (never RGB or hex)
- **Keep quotes** around text values like phone and email
- **Test on multiple pages** to ensure consistency
- **Use semantic color names** to maintain clarity
- **Document custom colors** if you add more variables

---

## Need Help?

If colors look wrong:
1. Double-check HSL format (three numbers: hue saturation% lightness%)
2. Ensure no extra characters or quotes around color values
3. Verify colors work in both light and dark modes (if applicable)

For contact information issues:
1. Make sure quotes surround text values
2. Check link formats (tel:, mailto:, https://)
3. Test links in the browser to ensure they work
