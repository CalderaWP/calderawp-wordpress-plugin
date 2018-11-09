import type {FormType} from "../../flow-types/formType";

export function findFormById(forms, formId) {
	return forms.find((__form: FormType) => formId === __form.ID);
}