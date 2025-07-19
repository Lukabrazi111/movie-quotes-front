import { defineRule, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';

import { all } from '@vee-validate/rules';

// Define rules

// Need to change e.g signup_email to just email
/**
 * TODO: need to check if field name can be exploded with '_' symbol
 */
Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
});

defineRule('lowercase', (value, _, ctx) => {
    if (value === value.toLowerCase()) {
        return true;
    }

    return `${ctx.field} must be in lowercase`;
});

// Configure rules
configure({
    generateMessage: localize('en', {
        messages: {
            required: 'This field is required',
            lowercase: 'The {field} must be lowercase',
            min: 'The {field} must be at least 0:{min}',
            max: 'The {field} must be at least 0:{max}',
            email: 'This field must be a valid email address',
            confirmed: 'The {field} does not match',
        },
    }),
});
