import { ref, reactive } from 'vue'
import { DIALOG_CONSTANTS_VARIABLE } from '../../constants/constantsVarible'

export const useDialog = () => {
  const isOpenDialogDeleteOrganization = ref(false)
  const isOpenDialogAddUpdateOrganization = ref(false)
  const isForAddNewModal = ref()
  const modalUpdateContent = reactive({ id: '', organization: '', description: '' })
  //open dialog Handlers
  const openDialog = (type) => {
    const action = {
      isForDeleteDialog: () => {
        isOpenDialogDeleteOrganization.value = true
      },
      isForAddNewDialog: () => {
        isOpenDialogAddUpdateOrganization.value = true
        isForAddNewModal.value = true
        modalUpdateContent.id = ''
        modalUpdateContent.description = ''
        modalUpdateContent.organization = ''
      },
      isForUpdateDialog: () => {
        isOpenDialogAddUpdateOrganization.value = true
        isForAddNewModal.value = false
      }
    }
    action[type]()
  }

  //close dialog Handlers
  const closeDialog = (type) => {
    const action = {
      isForDeleteDialog: () => {
        isOpenDialogDeleteOrganization.value = false
      },
      isForAddNewDialog: () => {
        isOpenDialogAddUpdateOrganization.value = false
      }
    }
    action[type]()
  }

  const actionHandleClick = (record, type) => {
    // do something with the clicked row data
    const action = {
      add: () => {},
      edit: () => {
        console.log('edit Clicked record:', record)
        modalUpdateContent.id = record?.id
        modalUpdateContent.description = record?.description
        modalUpdateContent.organization = record?.organization
        openDialog(DIALOG_CONSTANTS_VARIABLE.isForUpdateDialog)
      },
      delete: () => {
        console.log('delete Clicked record:', record.id)
        modalUpdateContent.id = record?.id
        modalUpdateContent.description = record?.description
        modalUpdateContent.organization = record?.organization
        openDialog(DIALOG_CONSTANTS_VARIABLE.isForDeleteDialog)
      }
    }
    action[type]()
  }

  return {
    closeDialog,
    actionHandleClick,
    openDialog,
    isForAddNewModal,
    modalUpdateContent,
    isOpenDialogAddUpdateOrganization,
    isOpenDialogDeleteOrganization
  }
}
