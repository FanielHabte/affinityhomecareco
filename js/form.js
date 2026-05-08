(function () {
  'use strict';

  /**
   * Validates a single field. Returns an error message string or empty string.
   */
  function validateField(field) {
    var value = field.value.trim();
    var type  = field.type;
    var name  = field.name;

    if (field.required && value === '') {
      return 'This field is required.';
    }

    if (type === 'email' && value !== '') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address.';
      }
    }

    if (type === 'tel' && value !== '') {
      if (!/^[\d\s\-\+\(\)]{7,}$/.test(value)) {
        return 'Please enter a valid phone number.';
      }
    }

    return '';
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    var errorEl = field.parentElement.querySelector('.form__error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.toggle('visible', message !== '');
    }
  }

  function clearFieldError(field) {
    field.classList.remove('error');
    var errorEl = field.parentElement.querySelector('.form__error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }
  }

  function showNotice(form, type, message) {
    form.querySelectorAll('.form__notice').forEach(function (el) {
      el.classList.remove('visible');
    });
    var notice = form.querySelector('.form__notice--' + type);
    if (notice) {
      notice.textContent = message;
      notice.classList.add('visible');
      notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function initForm(form) {
    var fields = Array.from(form.querySelectorAll('.form__input, .form__select, .form__textarea'));
    var submitBtn = form.querySelector('[type="submit"]');

    // Inline validation on blur
    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        var error = validateField(field);
        if (error) {
          showFieldError(field, error);
        } else {
          clearFieldError(field);
        }
      });

      field.addEventListener('input', function () {
        if (field.classList.contains('error')) {
          var error = validateField(field);
          if (!error) clearFieldError(field);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Validate all fields
      var valid = true;
      fields.forEach(function (field) {
        var error = validateField(field);
        if (error) {
          showFieldError(field, error);
          valid = false;
        } else {
          clearFieldError(field);
        }
      });

      if (!valid) {
        var firstError = form.querySelector('.form__input.error, .form__select.error, .form__textarea.error');
        if (firstError) firstError.focus();
        return;
      }

      // Submit via Formspree (or swap endpoint as needed)
      var endpoint = form.getAttribute('action');
      if (!endpoint) {
        showNotice(form, 'error', 'Form endpoint not configured. Please contact us directly.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) {
          if (res.ok) {
            showNotice(form, 'success', 'Thank you! We received your message and will be in touch within one business day.');
            form.reset();
            fields.forEach(clearFieldError);
          } else {
            return res.json().then(function (data) {
              throw new Error(data.error || 'Submission failed.');
            });
          }
        })
        .catch(function (err) {
          showNotice(form, 'error', 'Something went wrong. Please try again or email us directly at hello@affinityhomecareco.com.');
          console.error(err);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }

  // Init all forms on the page
  document.querySelectorAll('[data-contact-form]').forEach(initForm);
}());
