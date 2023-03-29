import { ref } from 'vue'
import { DIALOG_CONSTANTS_VARIABLE } from '../../constants/constantsVarible'

export const useDialog = () => {
  const isOpenDialogDeleteOrganization = ref(false)
  const isOpenDialogAddUpdateOrganization = ref(false)
  const isForAddNewModal = ref()
  const modalID = ref()
  //open dialog Handlers
  const openDialog = (type) => {
    const action = {
      isForDeleteDialog: () => {
        isOpenDialogDeleteOrganization.value = true
      },
      isForAddNewDialog: () => {
        isOpenDialogAddUpdateOrganization.value = true
        isForAddNewModal.value = true
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
      edit: () => {
        console.log('edit Clicked record:', record.id)
        modalID.value = record.id
        openDialog(DIALOG_CONSTANTS_VARIABLE.isForUpdateDialog)
      },
      delete: () => {
        console.log('delete Clicked record:', record.id)
        modalID.value = record.id
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
    modalID,
    isOpenDialogAddUpdateOrganization,
    isOpenDialogDeleteOrganization
  }
}
