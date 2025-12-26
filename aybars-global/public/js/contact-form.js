/**
 * AYBARS GLOBAL - Contact Form Validation & Submission
 * Modern, professional form validation with multi-language support
 */

class ContactFormValidator {
    constructor(formSelector, options = {}) {
        this.form = document.querySelector(formSelector);
        if (!this.form) return;

        this.options = {
            phpEndpoint: options.phpEndpoint || '/api/contact.php',
            lang: options.lang || document.documentElement.lang || 'en',
            ...options
        };

        this.translations = this.getTranslations();
        this.fields = {};
        this.isSubmitting = false;

        this.init();
    }

    getTranslations () {
        const translations = {
            en: {
                firstNameRequired: 'First name is required',
                firstNameMinLength: 'First name must be at least 2 characters',
                firstNameMaxLength: 'First name cannot exceed 50 characters',
                lastNameRequired: 'Last name is required',
                lastNameMinLength: 'Last name must be at least 2 characters',
                lastNameMaxLength: 'Last name cannot exceed 50 characters',
                emailRequired: 'Email address is required',
                emailInvalid: 'Please enter a valid email address',
                phoneInvalid: 'Please enter a valid phone number',
                phoneMinLength: 'Phone number must be at least 7 digits',
                companyMaxLength: 'Company name cannot exceed 100 characters',
                messageRequired: 'Message is required',
                messageMinLength: 'Message must be at least 10 characters',
                messageMaxLength: 'Message cannot exceed 2000 characters',
                privacyRequired: 'You must agree to the privacy policy',
                successTitle: 'Message Sent Successfully!',
                successMessage: 'Thank you for contacting us. We will get back to you within 24-48 hours.',
                errorTitle: 'Error Sending Message',
                errorMessage: 'An error occurred while sending your message. Please try again later.',
                networkError: 'Network error. Please check your connection and try again.',
                serverError: 'Server error. Please try again later.',
                sending: 'Sending...'
            },
            fa: {
                firstNameRequired: 'وارد کردن نام الزامی است',
                firstNameMinLength: 'نام باید حداقل ۲ کاراکتر باشد',
                firstNameMaxLength: 'نام نباید بیش از ۵۰ کاراکتر باشد',
                lastNameRequired: 'وارد کردن نام خانوادگی الزامی است',
                lastNameMinLength: 'نام خانوادگی باید حداقل ۲ کاراکتر باشد',
                lastNameMaxLength: 'نام خانوادگی نباید بیش از ۵۰ کاراکتر باشد',
                emailRequired: 'وارد کردن ایمیل الزامی است',
                emailInvalid: 'لطفاً یک آدرس ایمیل معتبر وارد کنید',
                phoneInvalid: 'لطفاً یک شماره تلفن معتبر وارد کنید',
                phoneMinLength: 'شماره تلفن باید حداقل ۷ رقم باشد',
                companyMaxLength: 'نام شرکت نباید بیش از ۱۰۰ کاراکتر باشد',
                messageRequired: 'وارد کردن پیام الزامی است',
                messageMinLength: 'پیام باید حداقل ۱۰ کاراکتر باشد',
                messageMaxLength: 'پیام نباید بیش از ۲۰۰۰ کاراکتر باشد',
                privacyRequired: 'باید با سیاست حریم خصوصی موافقت کنید',
                successTitle: 'پیام با موفقیت ارسال شد!',
                successMessage: 'با تشکر از تماس شما. ظرف ۲۴ تا ۴۸ ساعت با شما تماس خواهیم گرفت.',
                errorTitle: 'خطا در ارسال پیام',
                errorMessage: 'هنگام ارسال پیام خطایی رخ داد. لطفاً بعداً دوباره امتحان کنید.',
                networkError: 'خطای شبکه. لطفاً اتصال خود را بررسی کرده و دوباره امتحان کنید.',
                serverError: 'خطای سرور. لطفاً بعداً دوباره امتحان کنید.',
                sending: 'در حال ارسال...'
            },
            ar: {
                firstNameRequired: 'الاسم الأول مطلوب',
                firstNameMinLength: 'يجب أن يتكون الاسم الأول من حرفين على الأقل',
                firstNameMaxLength: 'لا يمكن أن يتجاوز الاسم الأول 50 حرفاً',
                lastNameRequired: 'اسم العائلة مطلوب',
                lastNameMinLength: 'يجب أن يتكون اسم العائلة من حرفين على الأقل',
                lastNameMaxLength: 'لا يمكن أن يتجاوز اسم العائلة 50 حرفاً',
                emailRequired: 'البريد الإلكتروني مطلوب',
                emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
                phoneInvalid: 'يرجى إدخال رقم هاتف صحيح',
                phoneMinLength: 'يجب أن يتكون رقم الهاتف من 7 أرقام على الأقل',
                companyMaxLength: 'لا يمكن أن يتجاوز اسم الشركة 100 حرف',
                messageRequired: 'الرسالة مطلوبة',
                messageMinLength: 'يجب أن تتكون الرسالة من 10 أحرف على الأقل',
                messageMaxLength: 'لا يمكن أن تتجاوز الرسالة 2000 حرف',
                privacyRequired: 'يجب الموافقة على سياسة الخصوصية',
                successTitle: 'تم إرسال الرسالة بنجاح!',
                successMessage: 'شكراً لتواصلك معنا. سنعود إليك خلال 24-48 ساعة.',
                errorTitle: 'خطأ في إرسال الرسالة',
                errorMessage: 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقاً.',
                networkError: 'خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
                serverError: 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.',
                sending: 'جارٍ الإرسال...'
            },
            tr: {
                firstNameRequired: 'Ad alanı zorunludur',
                firstNameMinLength: 'Ad en az 2 karakter olmalıdır',
                firstNameMaxLength: 'Ad 50 karakteri aşamaz',
                lastNameRequired: 'Soyad alanı zorunludur',
                lastNameMinLength: 'Soyad en az 2 karakter olmalıdır',
                lastNameMaxLength: 'Soyad 50 karakteri aşamaz',
                emailRequired: 'E-posta adresi zorunludur',
                emailInvalid: 'Lütfen geçerli bir e-posta adresi girin',
                phoneInvalid: 'Lütfen geçerli bir telefon numarası girin',
                phoneMinLength: 'Telefon numarası en az 7 rakam olmalıdır',
                companyMaxLength: 'Şirket adı 100 karakteri aşamaz',
                messageRequired: 'Mesaj alanı zorunludur',
                messageMinLength: 'Mesaj en az 10 karakter olmalıdır',
                messageMaxLength: 'Mesaj 2000 karakteri aşamaz',
                privacyRequired: 'Gizlilik politikasını kabul etmelisiniz',
                successTitle: 'Mesaj Başarıyla Gönderildi!',
                successMessage: 'Bizimle iletişime geçtiğiniz için teşekkür ederiz. 24-48 saat içinde size geri döneceğiz.',
                errorTitle: 'Mesaj Gönderme Hatası',
                errorMessage: 'Mesajınız gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
                networkError: 'Ağ hatası. Lütfen bağlantınızı kontrol edip tekrar deneyin.',
                serverError: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
                sending: 'Gönderiliyor...'
            },
            ru: {
                firstNameRequired: 'Имя обязательно для заполнения',
                firstNameMinLength: 'Имя должно содержать не менее 2 символов',
                firstNameMaxLength: 'Имя не может превышать 50 символов',
                lastNameRequired: 'Фамилия обязательна для заполнения',
                lastNameMinLength: 'Фамилия должна содержать не менее 2 символов',
                lastNameMaxLength: 'Фамилия не может превышать 50 символов',
                emailRequired: 'Email обязателен для заполнения',
                emailInvalid: 'Пожалуйста, введите корректный email',
                phoneInvalid: 'Пожалуйста, введите корректный номер телефона',
                phoneMinLength: 'Номер телефона должен содержать не менее 7 цифр',
                companyMaxLength: 'Название компании не может превышать 100 символов',
                messageRequired: 'Сообщение обязательно для заполнения',
                messageMinLength: 'Сообщение должно содержать не менее 10 символов',
                messageMaxLength: 'Сообщение не может превышать 2000 символов',
                privacyRequired: 'Необходимо согласиться с политикой конфиденциальности',
                successTitle: 'Сообщение успешно отправлено!',
                successMessage: 'Спасибо за обращение. Мы свяжемся с вами в течение 24-48 часов.',
                errorTitle: 'Ошибка отправки сообщения',
                errorMessage: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.',
                networkError: 'Ошибка сети. Проверьте подключение и попробуйте снова.',
                serverError: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
                sending: 'Отправка...'
            }
        };

        return translations[this.options.lang] || translations.en;
    }

    t (key) {
        return this.translations[key] || key;
    }

    init () {
        // Cache form fields
        this.fields = {
            firstName: this.form.querySelector('#firstName'),
            lastName: this.form.querySelector('#lastName'),
            email: this.form.querySelector('#email'),
            phone: this.form.querySelector('#phone'),
            company: this.form.querySelector('#company'),
            service: this.form.querySelector('#service'),
            message: this.form.querySelector('#message'),
            privacy: this.form.querySelector('#privacy')
        };

        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton ? this.submitButton.innerHTML : '';

        // Create toast container
        this.createToastContainer();

        // Bind events
        this.bindEvents();
    }

    createToastContainer () {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md';
            container.setAttribute('dir', 'ltr');
            document.body.appendChild(container);
        }
    }

    bindEvents () {
        // Form submit
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation on blur
        Object.entries(this.fields).forEach(([name, field]) => {
            if (field) {
                field.addEventListener('blur', () => this.validateField(name));
                field.addEventListener('input', () => this.clearFieldError(name));
            }
        });

        // Special handling for checkbox
        if (this.fields.privacy) {
            this.fields.privacy.addEventListener('change', () => this.validateField('privacy'));
        }
    }

    validateField (fieldName) {
        const field = this.fields[fieldName];
        if (!field) return true;

        const value = field.type === 'checkbox' ? field.checked : field.value.trim();
        let error = null;

        switch (fieldName) {
            case 'firstName':
                if (!value) error = this.t('firstNameRequired');
                else if (value.length < 2) error = this.t('firstNameMinLength');
                else if (value.length > 50) error = this.t('firstNameMaxLength');
                break;

            case 'lastName':
                if (!value) error = this.t('lastNameRequired');
                else if (value.length < 2) error = this.t('lastNameMinLength');
                else if (value.length > 50) error = this.t('lastNameMaxLength');
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) error = this.t('emailRequired');
                else if (!emailRegex.test(value)) error = this.t('emailInvalid');
                break;

            case 'phone':
                if (value) {
                    const phoneDigits = value.replace(/\D/g, '');
                    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
                    if (!phoneRegex.test(value)) error = this.t('phoneInvalid');
                    else if (phoneDigits.length < 7) error = this.t('phoneMinLength');
                }
                break;

            case 'company':
                if (value && value.length > 100) error = this.t('companyMaxLength');
                break;

            case 'message':
                if (!value) error = this.t('messageRequired');
                else if (value.length < 10) error = this.t('messageMinLength');
                else if (value.length > 2000) error = this.t('messageMaxLength');
                break;

            case 'privacy':
                if (!value) error = this.t('privacyRequired');
                break;
        }

        if (error) {
            this.showFieldError(fieldName, error);
            return false;
        } else {
            this.clearFieldError(fieldName);
            this.showFieldSuccess(fieldName);
            return true;
        }
    }

    showFieldError (fieldName, message) {
        const field = this.fields[fieldName];
        if (!field) return;

        // Remove existing error
        this.clearFieldError(fieldName);

        // Add error styling
        field.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');
        field.classList.remove('border-gray-200', 'border-gray-300', 'dark:border-primary-700', 'border-green-500');

        // Create error message
        const errorEl = document.createElement('p');
        errorEl.className = 'text-red-500 text-sm mt-1 flex items-center gap-1 field-error';
        errorEl.setAttribute('data-field', fieldName);
        errorEl.innerHTML = `
      <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      <span>${message}</span>
    `;

        // Insert after field or its container
        const container = field.closest('div');
        if (container) {
            container.appendChild(errorEl);
        }

        // Add shake animation
        field.classList.add('animate-shake');
        setTimeout(() => field.classList.remove('animate-shake'), 500);
    }

    clearFieldError (fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;

        // Remove error styling
        field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500/20');

        // Remove error message
        const container = field.closest('div');
        if (container) {
            const errorEl = container.querySelector(`.field-error[data-field="${fieldName}"]`);
            if (errorEl) errorEl.remove();
        }
    }

    showFieldSuccess (fieldName) {
        const field = this.fields[fieldName];
        if (!field || field.type === 'checkbox') return;

        field.classList.add('border-green-500', 'focus:border-green-500', 'focus:ring-green-500/20');
        field.classList.remove('border-gray-200', 'border-gray-300', 'dark:border-primary-700');
    }

    validateAllFields () {
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'message', 'privacy'];

        requiredFields.forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });

        // Validate optional fields if they have values
        ['phone', 'company'].forEach(fieldName => {
            if (this.fields[fieldName] && this.fields[fieldName].value.trim()) {
                if (!this.validateField(fieldName)) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    async handleSubmit (e) {
        e.preventDefault();

        if (this.isSubmitting) return;

        // Validate all fields
        if (!this.validateAllFields()) {
            // Scroll to first error
            const firstError = this.form.querySelector('.border-red-500');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        this.isSubmitting = true;
        this.setLoadingState(true);

        try {
            const formData = new FormData(this.form);
            formData.append('lang', this.options.lang);

            const response = await fetch(this.options.phpEndpoint, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success) {
                this.showToast('success', this.t('successTitle'), this.t('successMessage'));
                this.form.reset();
                this.resetFieldStyles();
            } else {
                throw new Error(result.message || this.t('errorMessage'));
            }
        } catch (error) {
            console.error('Form submission error:', error);

            if (error.message === 'Failed to fetch') {
                this.showToast('error', this.t('errorTitle'), this.t('networkError'));
            } else {
                this.showToast('error', this.t('errorTitle'), error.message || this.t('errorMessage'));
            }
        } finally {
            this.isSubmitting = false;
            this.setLoadingState(false);
        }
    }

    setLoadingState (loading) {
        if (!this.submitButton) return;

        if (loading) {
            this.submitButton.disabled = true;
            this.submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        ${this.t('sending')}
      `;
            this.submitButton.classList.add('opacity-75', 'cursor-not-allowed');
        } else {
            this.submitButton.disabled = false;
            this.submitButton.innerHTML = this.originalButtonText;
            this.submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    }

    resetFieldStyles () {
        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field) {
                field.classList.remove(
                    'border-red-500', 'border-green-500',
                    'focus:border-red-500', 'focus:border-green-500',
                    'focus:ring-red-500/20', 'focus:ring-green-500/20'
                );
                field.classList.add('border-gray-200', 'dark:border-primary-700');
                this.clearFieldError(fieldName);
            }
        });
    }

    showToast (type, title, message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `
      transform transition-all duration-300 ease-out
      bg-white dark:bg-primary-800 rounded-xl shadow-lg border
      p-4 flex items-start gap-3 max-w-md
      ${type === 'success' ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}
      translate-x-full opacity-0
    `;

        const icon = type === 'success'
            ? `<svg class="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>`
            : `<svg class="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
         </svg>`;

        toast.innerHTML = `
      ${icon}
      <div class="flex-1">
        <h4 class="font-semibold text-primary-900 dark:text-white">${title}</h4>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${message}</p>
      </div>
      <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    `;

        container.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full', 'opacity-0');
            toast.classList.add('translate-x-0', 'opacity-100');
        });

        // Close button
        const closeBtn = toast.querySelector('button');
        closeBtn.addEventListener('click', () => this.removeToast(toast));

        // Auto remove after 5 seconds
        setTimeout(() => this.removeToast(toast), 5000);
    }

    removeToast (toast) {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Get language from HTML lang attribute or URL
    const lang = document.documentElement.lang ||
        window.location.pathname.split('/')[1] ||
        'en';

    // Initialize the form validator
    new ContactFormValidator('#contact-form', {
        lang: lang,
        phpEndpoint: '/api/contact.php'
    });
});

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactFormValidator;
}
