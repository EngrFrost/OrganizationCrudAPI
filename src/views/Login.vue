<template>
  <div class="login">
    <div class="header">My App</div>

    <Row class="form" align="middle" justify="center">
      <Col :span="24">
        <Form
          :model="formState"
          name="basic"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <Form.Item label="Email" name="email" :rules="emailRules">
            <Input v-model:value="formState.email" />
          </Form.Item>

          <Form.Item label="Password" name="password" :rules="passwordRules">
            <Input.Password v-model:value="formState.password" />
          </Form.Item>

          <Form.Item name="remember" :wrapper-col="{ offset: 4, span: 16 }">
            <Checkbox v-model:checked="formState.remember">Remember me</Checkbox>
          </Form.Item>

          <Form.Item :wrapper-col="{ offset: 4, span: 16 }">
            <Button type="primary" html-type="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Col, Row, Form, Button, Checkbox, Input } from 'ant-design-vue'
//hooks
import useOrganization from '../stores/Organization'

const org = useOrganization()
const router = useRouter()

const { login } = storeToRefs(org)

const formState = reactive({
  email: '',
  password: '',
  remember: true
})

const passwordRules = [
  { required: true, message: 'Please enter a password of the organization', trigger: 'submit' },
  { min: 8, message: 'Password must be at least 8 characters long', trigger: 'submit' }
]
const emailRules = [
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Email must be a valid email address' }
]

//functions
const onFinish = (values) => {
  console.log('Success:', values)

  org.loginHandler(values)
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

//useEffects
watch(login, () => {
  router.push({ path: '/organization' })
})
</script>

<style>
body {
  background-color: rgb(182, 182, 182);
}
.login {
  max-width: 50rem;
  position: relative;
  margin: 5rem auto;
  background-color: rgb(255, 255, 255);
}
.form {
  margin-top: 1rem;
}
.header {
  text-align: center;
  padding: 2rem;
  background-color: #5922f2;
  color: white;
  font-size: 1rem;
}
</style>
