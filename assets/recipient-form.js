if (!customElements.get('recipient-form')) {
  let subscribers = {};

  function subscribe(eventName, callback) {
    if (subscribers[eventName] === undefined) {
      subscribers[eventName] = [];
    }

    subscribers[eventName] = [...subscribers[eventName], callback];

    return function unsubscribe() {
      subscribers[eventName] = subscribers[eventName].filter((cb) => {
        return cb !== callback;
      });
    };
  }
    customElements.define(
    'recipient-form',
    class RecipientForm extends HTMLElement {
      constructor() {
        super();
        this.recipientFieldsLiveRegion = this.querySelector(`#Recipient-fields-live-region-${this.dataset.sectionId}`);
        this.checkboxInput = this.querySelector(`#Recipient-checkbox-${this.dataset.sectionId}`);
        this.checkboxInput.disabled = false;
        this.hiddenControlField = this.querySelector(`#Recipient-control-${this.dataset.sectionId}`);
        this.hiddenControlField.disabled = true;
        this.emailInput = this.querySelector(`#Recipient-email-${this.dataset.sectionId}`);
        this.nameInput = this.querySelector(`#Recipient-name-${this.dataset.sectionId}`);
        this.messageInput = this.querySelector(`#Recipient-message-${this.dataset.sectionId}`);
        this.sendonInput = this.querySelector(`#Recipient-send-on-${this.dataset.sectionId}`);
        this.offsetProperty = this.querySelector(`#Recipient-timezone-offset-${this.dataset.sectionId}`);
        if (this.offsetProperty) this.offsetProperty.value = new Date().getTimezoneOffset().toString();

        this.errorMessageList = this.errorMessageWrapper?.querySelector('ul');
        this.defaultErrorHeader = this.errorMessage?.innerText;
        this.currentProductVariantId = this.dataset.productVariantId;
        this.addEventListener('change', this.onChange.bind(this));
        this.onChange();
      }

      cartUpdateUnsubscriber = undefined;
      variantChangeUnsubscriber = undefined;
      cartErrorUnsubscriber = undefined;

      connectedCallback() {
      }

      disconnectedCallback() {
      }

      onChange() {
        if (this.checkboxInput.checked) {
          this.enableInputFields();
          this.recipientFieldsLiveRegion.innerText = window.T4Sstrings.recipientFormExpanded;
        } else {
          this.clearInputFields();
          this.disableInputFields();
          this.recipientFieldsLiveRegion.innerText = window.T4Sstrings.recipientFormCollapsed;
        }
      }

      inputFields() {
        return [this.emailInput, this.nameInput, this.messageInput, this.sendonInput];
      }

      disableableFields() {
        return [...this.inputFields(), this.offsetProperty];
      }

      clearInputFields() {
        this.inputFields().forEach((field) => (field.value = ''));
      }

      enableInputFields() {
        this.disableableFields().forEach((field) => (field.disabled = false));
      }

      disableInputFields() {
        this.disableableFields().forEach((field) => (field.disabled = true));
      }

      displayErrorMessage(title, body) {
      }

      createErrorListItem(target, message) {
      }

      resetRecipientForm() {
        if (this.checkboxInput.checked) {
          this.checkboxInput.checked = false;
          this.clearInputFields();
        }
      }
    }
  );
}