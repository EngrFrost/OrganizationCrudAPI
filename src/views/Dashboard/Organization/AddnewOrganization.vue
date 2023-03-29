<template>
  <div style="margin-bottom: 1rem">
    <Modal
      v-model:visible="isOpenDialogAddUpdateOrganization"
      title="Add New Organization"
      @cancel="closeDialog"
      :ok-button-props="{ disabled: formDisabled }"
      @ok="onFinish"
      :okText="isForAddNewModal ? 'Add' : 'Update'"
    >
      <Form
        :model="formState"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        autocomplete="off"
        ref="formRef"
      >
        <Form.Item label="Name" name="organization" :rules="organizationRules">
          <Input v-model:value="formState.organization" />
        </Form.Item>

        <Form.Item label="Description" name="description" :rules="descriptionRules">
          <Textarea v-model:value="formState.description" />
        </Form.Item>
      </Form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue'
import { Form, Modal, Textarea, Input } from 'ant-design-vue'
import useOrganization from '../../../stores/Organization'
//constants
import {
  DIALOG_CONSTANTS_VARIABLE,
  organizationRules,
  descriptionRules
} from '../../../constants/constantsVarible'

const props = defineProps(['isOpenDialogAddUpdateOrganization', 'isForAddNewModal', 'modalID'])
const emit = defineEmits(['closeDialog'])
const { isOpenDialogAddUpdateOrganization, isForAddNewModal, modalID } = toRefs(props)

// access Pinia
const org = useOrganization()
//states

const formDisabled = ref(false)
const formRef = ref()

//initial state
const initialformState = () => ({
  organization: '',
  description: ''
})
const formState = reactive(initialformState())
const resetUserForm = () => Object.assign(formState, initialformState())

const closeDialog = () => {
  resetUserForm()
  formRef.value.resetFields()
  emit('closeDialog', DIALOG_CONSTANTS_VARIABLE.isForAddNewDialog)
}
const createHandler = () => {
  formRef.value.validate().then(() => {
    formDisabled.value = true
    setTimeout(() => {
      formDisabled.value = false
      emit('closeDialog', DIALOG_CONSTANTS_VARIABLE.isForAddNewDialog)
      console.log('Submitted form:', formState)
      org.addOrganization(formState)
      resetUserForm()
    }, 1000)
  })
}

const updateHandler = () => {
  formRef.value.validate().then(() => {
    formDisabled.value = true

    setTimeout(() => {
      formDisabled.value = false
      emit('closeDialog', DIALOG_CONSTANTS_VARIABLE.isForAddNewDialog)
      const newFormstate = { ...formState, modalID: modalID.value }
      console.log('Submitted form:', newFormstate)
      org.updateOrganization(newFormstate)
      resetUserForm()
    }, 1000)
  })
}

//submit handler
const onFinish = () => {
  const actionHandler = isForAddNewModal.value ? createHandler : updateHandler
  actionHandler()
}
</script>

<style>
.ant-modal-header {
  background: #1890ff !important;
}
.ant-modal-title {
  color: white !important;
}
</style>
