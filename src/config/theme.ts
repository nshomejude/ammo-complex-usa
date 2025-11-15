/**
 * Theme Configuration
 * 
 * This file provides centralized access to theme values defined in index.css
 * Edit the CSS custom properties in index.css to update these values site-wide
 */

// Get CSS custom property value
const getCSSVariable = (property: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim()
    .replace(/^["']|["']$/g, ''); // Remove quotes
};

// Contact Information
export const contactConfig = {
  get phone() {
    return getCSSVariable('--contact-phone') || '+1 (555) FIREARMS';
  },
  get phoneLink() {
    return getCSSVariable('--contact-phone-link') || 'tel:+1-555-FIREARMS';
  },
  get email() {
    return getCSSVariable('--contact-email') || 'info@armscomplex.com';
  },
  get emailLink() {
    return `mailto:${this.email}`;
  },
  get telegram() {
    return getCSSVariable('--contact-telegram') || '@armscomplex';
  },
  get telegramLink() {
    return getCSSVariable('--contact-telegram-link') || 'https://t.me/armscomplex';
  },
};

// Notice Styling
export const noticeConfig = {
  // Returns Tailwind classes for notice components
  get borderClass() {
    return 'border-[hsl(var(--notice-border))]';
  },
  get bgClass() {
    return 'bg-[hsl(var(--notice-bg))]/10';
  },
  get textClass() {
    return 'text-[hsl(var(--notice-text))]';
  },
  get iconClass() {
    return 'text-[hsl(var(--notice-icon))]';
  },
  // Convenience method to get all classes at once
  get allClasses() {
    return `${this.borderClass} ${this.bgClass}`;
  },
};

/**
 * Usage Examples:
 * 
 * In a component:
 * import { contactConfig, noticeConfig } from '@/config/theme';
 * 
 * <a href={contactConfig.phoneLink}>{contactConfig.phone}</a>
 * <a href={contactConfig.emailLink}>{contactConfig.email}</a>
 * <a href={contactConfig.telegramLink}>{contactConfig.telegram}</a>
 * 
 * <Alert className={noticeConfig.allClasses}>
 *   <AlertCircle className={noticeConfig.iconClass} />
 * </Alert>
 */
