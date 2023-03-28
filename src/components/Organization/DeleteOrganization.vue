<template>
  <Modal
    v-model:visible="isOpenDialogEditOrganization"
    title="Add New Organization"
    @cancel="cancelHandleClick"
    @ok="submitHandler"
    :cancel-button-props="{ disabled: formDisabled }"
    :ok-button-props="{ disabled: formDisabled }"
  >
    <Form ref="formRef" :model="formState">
      <Space direction="vertical">
        <Typography.Title type="danger" :level="4"
          >Are you sure you want to delete this record?</Typography.Title
        >
        <Typography.Text strong>ID:</Typography.Text>
        <Typography.Text strong
          >Description:This is for those who do not have any assiociation</Typography.Text
        >
        <Form.Item name="inputField" :rules="inputValidation">
          <Input placeholder="Username" v-model:value="formState.inputField"> </Input>
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
import useOrganization from '../../stores/Organization'
import { storeToRefs } from 'pinia'

const org = useOrganization()
const props = defineProps(['isOpenDialogEditOrganization', 'modalID'])
const emits = defineEmits(['closeDialogEditOrganization'])

const { isOpenDialogEditOrganization, modalID } = toRefs(props)
const { fetching: isLoadingTable } = storeToRefs(org)

const formRef = ref()
const formDisabled = ref(false)

//initial state
const initialformState = () => ({
  inputField: ''
})
const formState = reactive(initialformState())
const resetUserForm = () => Object.assign(formState, initialformState())

const inputValidation = [
  { required: true, message: 'Please Input the confirmation message to delete', trigger: 'submit' }
]
const cancelHandleClick = () => {
  console.log('check')
  emits('closeDialogEditOrganization', false)
}

const submitHandler = () => {
  formRef.value.validate().then(() => {
    formDisabled.value = true
    if (formState.inputField === 'YES DELETE') {
      setTimeout(() => {
        console.log('Submitted form:', modalID.value, isOpenDialogEditOrganization.value)
        org.deleteOrganization(modalID.value)
        resetUserForm()
        formDisabled.value = isLoadingTable
        emits('closeDialogEditOrganization')
      }, 1000)
    } else {
      message.error('The confirmation message doesnt match the input field you provide')
    }
  })
}
</script>
