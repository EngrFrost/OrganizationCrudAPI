<template>
  <div style="margin-bottom: 1rem">
    <Button type="primary" @click="visibleModalTrigger">Add Organization</Button>
    <Modal
      v-model:visible="visibleModal"
      title="Add New Organization"
      @cancel="visibleModal = false"
      :ok-button-props="{ disabled: formDisabled }"
      @ok="onFinish"
    >
      <Form
        :model="formState"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        autocomplete="off"
        ref="formRef"
      >
        <Form.Item label="Name" name="organization" :rules="nameRules">
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
import { ref, reactive } from 'vue'
import { Button, Form, Modal, Textarea, Input } from 'ant-design-vue'
import useOrganization from '../../stores/Organization'

// access Pinia
const org = useOrganization()
//states
const visibleModal = ref(false)
const formDisabled = ref(false)
const formRef = ref()

const nameRules = [
  { required: true, message: 'Please enter the name of the organization', trigger: 'submit' }
]

const descriptionRules = [
  { required: true, message: 'Please enter a description of the organization', trigger: 'submit' }
]

//initial state
const initialformState = () => ({
  organization: '',
  description: ''
})
const formState = reactive(initialformState())
const resetUserForm = () => Object.assign(formState, initialformState())

//trigger modal handler
const visibleModalTrigger = () => {
  visibleModal.value = !visibleModal.value
}
//submit handler
const onFinish = () => {
  formRef.value.validate().then(() => {
    formDisabled.value = true
    setTimeout(() => {
      formDisabled.value = false
      visibleModal.value = false
      console.log('Submitted form:', formState)
      org.addOrganization(formState)
      resetUserForm()
    }, 1000)
  })
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
