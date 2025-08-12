import { configure, defineRule } from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

// TODO: Need to check if field inlcude('_') and change it.
// Define rules
Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule);
});


defineRule('lowercase', (value, _, ctx) => {
    if (value && value === value.toLowerCase()) {
        return true;
    }
    return `${ctx.field} must be in lowercase`;
});

// Configure
configure({
    generateMessage: localize('en', {
        messages: {
            required: 'This field is required.',
            lowercase: 'The {field} must be lowercase.',
            min: 'The {field} must be at least 0:{min}.',
            max: 'The {field} must be at least 0:{max}.',
            email: 'This field must be a valid email address.',
            confirmed: 'The {field} does not match.',
        },
    }),
});
