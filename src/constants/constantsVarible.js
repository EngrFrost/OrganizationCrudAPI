export const DIALOG_CONSTANTS_VARIABLE = {
  isForAddNewDialog: 'isForAddNewDialog',
  isForDeleteDialog: 'isForDeleteDialog',
  isForUpdateDialog: 'isForUpdateDialog'
}

export const HANDLE_ACTION_VARIABLE = {
  edit: 'edit' || 'EDIT',
  delete: 'delete' || 'delete'
}

export const organizationRules = [
  { required: true, message: 'Please enter the name of the organization' }
]

export const descriptionRules = [
  { required: true, message: 'Please enter a description of the organization' }
]

export const passwordRules = [
  { required: true, message: 'Please enter a password of the organization', trigger: 'submit' },
  { min: 8, message: 'Password must be at least 8 characters long', trigger: 'submit' }
]
export const emailRules = [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Email must be a valid email address' }
]
