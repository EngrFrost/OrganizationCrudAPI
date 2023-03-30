<template>
  <Modal
    v-model:visible="isOpenDialogDeleteOrganization"
    title="Delete confirmation Organization"
    @cancel="cancelHandleClick"
    @ok="submitHandler"
    :cancel-button-props="{ disabled: formDisabled }"
    :ok-button-props="{ disabled: formDisabled }"
    :okText="'YES'"
  >
    <Form ref="formRef" :model="formState">
      <Space direction="vertical">
        <Typography.Title type="danger" :level="4"
          >Are you sure you want to delete this record?</Typography.Title
        >
        <Typography.Text strong>ID:{{ modalUpdateContent.id }}</Typography.Text>
        <Typography.Text strong>Description: {{ modalUpdateContent.description }}</Typography.Text>
        <Form.Item name="inputField" :rules="inputValidation">
          <Input
            placeholder="YES DELETE"
            v-model:value="formState.inputField"
            @input="onInputFieldChange"
          >
          </Input>
        </Form.Item>
        <Space
          ><Typography.Text>Type</Typography.Text
          ><Typography.Text strong>"YES DELETE"</Typography.Text></Space
        >
      </Space>
    </Form>
  </Modal>
</template>

<script setup>
import { defineProps, toRefs, ref, reactive } from 'vue'
import { Modal, Typography, Space, Input, Form, message } from 'ant-design-vue'
import useOrganization from '../../../stores/Organization'
import { debounce } from 'lodash'
import { DIALOG_CONSTANTS_VARIABLE } from '../../../constants/constantsVarible'

const org = useOrganization()
const props = defineProps(['isOpenDialogDeleteOrganization', 'modalUpdateContent'])
const emits = defineEmits(['closeDialog'])

const { isOpenDialogDeleteOrganization, modalUpdateContent } = toRefs(props)

const formRef = ref()
const formDisabled = ref(true)

const inputValidation = [
  { required: true, message: 'Please Input the confirmation message to delete', trigger: 'submit' }
]

//initial state
const initialformState = () => ({
  inputField: ''
})
const formState = reactive(initialformState())
const resetUserForm = () => Object.assign(formState, initialformState())

const cancelHandleClick = () => {
  resetUserForm()
  formDisabled.value = true
  emits('closeDialog', DIALOG_CONSTANTS_VARIABLE.isForDeleteDialog)
}

// this function validate the input fields after 500 milisecond
const updateFormValidity = debounce(() => {
  console.log('checking form validity')
  formDisabled.value = !formState.inputField
}, 500)

const onInputFieldChange = () => {
  //separate function since it is not working if inside
  updateFormValidity()
}

const submitHandler = () => {
  formRef.value.validate().then(() => {
    formDisabled.value = true
    if (formState.inputField === 'YES DELETE') {
      setTimeout(() => {
        org.deleteOrganization(modalUpdateContent.value.id)
        resetUserForm()
        formDisabled.value = false
        emits('closeDialog', 'isForDeleteDialog')
      }, 1000)
    } else {
      message.error('The confirmation message doesnt match the input field you provide')
    }
  })
}
</script>
