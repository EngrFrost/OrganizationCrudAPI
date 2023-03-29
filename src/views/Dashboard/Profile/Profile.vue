<template>
  <div style="text-align: center; font-size: 28px">
    <Typography.Text strong>Profile Basic Information</Typography.Text>
  </div>
  <div class="profile">
    <Row :justify="center" :align="middle">
      <Col :span="12">
        <Space direction="vertical"
          ><Typography.Title :level="4" strong
            >FullName: {{ userState?.first_name + ' ' + userState?.last_name }}</Typography.Title
          >
          <Typography.Title :level="4" strong
            >Phone Number: {{ userState?.phone }}</Typography.Title
          >
          <Typography.Title :level="4" strong>Email: {{ userState?.email }}</Typography.Title>
        </Space>
      </Col>
      <Col :span="12">
        <Space direction="vertical">
          <Typography.Title :level="4" strong>Address: {{ userState?.address1 }}</Typography.Title>
          <Typography.Title :level="4" strong>Address 2:{{ userState?.address2 }}</Typography.Title>
          <Typography.Title :level="4" strong>state: {{ userState?.state }}</Typography.Title>
          <Typography.Title :level="4" strong
            >zip code: {{ userState?.zip }}</Typography.Title
          ></Space
        >
      </Col>
    </Row>
  </div>
</template>

<script setup>
import { Row, Col, Space, Typography } from 'ant-design-vue'

const userState = JSON.parse(localStorage.getItem('user'))
</script>

<style>
.profile {
  background-color: #ffffff;
  padding: 1rem;
  color: white;
  margin: 1rem auto;
  max-width: 50rem;
}
</style>
